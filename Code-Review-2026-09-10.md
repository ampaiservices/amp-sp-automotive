# Code review - sp - September 10, 2026

Reviewed locally by Codex: input and provider failure handling, lead-versus-intent semantics, initialization timing, analytics failure isolation, personal data exposure, caller compatibility, and exact diff scope as applicable. This is not an independent external review.

Found and fixed: direct GA events could be dropped before the Google initialization script ran. Direct events now use the standard dataLayer Arguments queue, with a delayed-initialization regression test. GTM retains precedence.

Validation: 5 Bun tests, lint, TypeScript, and 43-page webpack production build passed using NEXT_PUBLIC_SITE_URL=https://spmotorworks.com.

All 20 targeted tests across the six test-bearing projects passed in this review batch. Other builds were verified during implementation; SP was rebuilt after its review correction. No live inquiries were sent.

Deployment/account follow-up: Identify and configure the actual GA4 measurement ID or GTM container. With GTM, verify success events map to generate_lead in the container. Verify deployment canonical URL is spmotorworks.com; isolated build used the existing placeholder environment value, so build passage does not validate canonical configuration. Verify delivery and event receipt after deployment.

The earlier build-host limitation is superseded by this review build with the correct canonical hostname. Live environment settings still require verification.

Commit scope is the reviewed source/test files plus this report. Existing unrelated files and backup copies remain unstaged. No push or deployment performed.
