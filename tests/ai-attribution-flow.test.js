import { test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createContext, runInContext } from 'node:vm';
import ts from 'typescript';

// Execute the actual components in an isolated browser context. Captured
// mount effects let the test exercise either component mounting first.
function session({ search = '', referrer = '', stored = null, blocked = false } = {}) {
  const effects = [];
  const events = [];
  let saved = stored;
  const context = createContext({
    URL, URLSearchParams,
    window: { location: { search, pathname: '/estimate' } },
    document: { referrer },
    sessionStorage: {
      getItem() { if (blocked) throw new Error('blocked'); return saved; },
      setItem(_key, value) { if (blocked) throw new Error('blocked'); saved = value; },
    },
  });
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const source = ts.transpileModule(readFileSync(resolve(import.meta.dir, '..', file), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const require = (id) => {
      if (id === 'react') return { useEffect: (fn) => effects.push(fn) };
      if (id === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null };
      if (id === '@/lib/analytics') return { track: (...args) => events.push(args) };
      if (id === '@/lib/lead-source') return load('lib/lead-source.ts');
      if (id === '@/components/analytics/AiReferral') return load('components/analytics/AiReferral.tsx');
      throw new Error(`Unexpected import: ${id}`);
    };
    runInContext(`(function(exports, require) {${source}\n})`, context)(exports, require);
    return exports;
  }
  const referral = load('components/analytics/AiReferral.tsx');
  const field = load('components/forms/LeadSourceField.tsx').default;
  const AI_SOURCE = load('lib/lead-source.ts').AI_SOURCE;
  return {
    events, AI_SOURCE,
    get saved() { return saved; },
    arrival() { referral.default(); effects.shift()(); },
    select(value = '') {
      const changes = [];
      field({ value, onChange: (...args) => changes.push(args), labelClassName: '', inputClassName: '' });
      effects.shift()();
      return changes;
    },
  };
}

test('ordinary Bing visits neither preselect an AI source nor record an AI arrival', () => {
  const s = session({ referrer: 'https://www.bing.com/search?q=collision' });
  expect(s.select()).toEqual([]);
  s.arrival();
  expect(s.events).toEqual([]);
  expect(s.saved).toBeNull();
});

test('direct AI landing preselects the form before the referral component writes storage', () => {
  const s = session({ search: '?utm_source=chatgpt.com' });
  expect(s.select()).toEqual([[s.AI_SOURCE, 'ChatGPT']]);
  expect(s.saved).toBeNull();
  s.arrival();
  expect(s.saved).toBe('ChatGPT');
  expect(s.events).toEqual([['ai_referral', { source: 'ChatGPT', landing: '/estimate' }]]);
});

test('blocked storage still allows form attribution and the arrival event', () => {
  const s = session({ referrer: 'https://claude.ai/chat/123', blocked: true });
  expect(s.select()).toEqual([[s.AI_SOURCE, 'Claude']]);
  expect(() => s.arrival()).not.toThrow();
  expect(s.events).toEqual([['ai_referral', { source: 'Claude', landing: '/estimate' }]]);
});

test('first stored source remains the form attribution while later arrivals are tracked', () => {
  const s = session({ search: '?utm_source=chatgpt.com', stored: 'Perplexity' });
  s.arrival();
  expect(s.saved).toBe('Perplexity');
  expect(s.select()).toEqual([[s.AI_SOURCE, 'Perplexity']]);
  expect(s.events).toEqual([['ai_referral', { source: 'ChatGPT', landing: '/estimate' }]]);
});

test('a selected user answer is preserved even on an AI landing with stored attribution', () => {
  const s = session({ search: '?utm_source=chatgpt.com', stored: 'Perplexity' });
  expect(s.select('Friend or family')).toEqual([]);
});
