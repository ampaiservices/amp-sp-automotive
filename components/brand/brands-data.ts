// Brand-specific landing page data. One entry per brand. Pages compose
// BrandHero -> BrandServices -> BrandModels -> Testimonials -> FinalCTA.
//
// To add a brand: add a Brand entry below, create app/{slug}/page.tsx, add the
// route to app/sitemap.ts.

export type Brand = {
  /** URL slug — also the route folder name. */
  slug: string;
  /** Display name (used in headlines + structured data). */
  name: string;
  /** Lowercase key matching Testimonial.brand for filtering. */
  brandKey: string;
  /** SEO title (under 60 chars). */
  metaTitle: string;
  /** SEO description (under 160 chars). */
  metaDescription: string;
  /** Cinematic display-font line that headlines the brand hero. */
  headline: string;
  /** 80-120 word lead paragraph below the headline. */
  intro: string;
  /** Short eyebrow line above the H1. */
  eyebrow: string;
  /** Models we work on for this brand. */
  models: string[];
  /** 4-6 brand-specific specialty cards. */
  specialties: { title: string; copy: string }[];
  /**
   * 5-8 owner questions phrased the way people ask an AI assistant. Plain
   * text only in `answer`: it renders on the page and is emitted verbatim
   * as FAQPage JSON-LD. No invented figures.
   */
  faqs: { question: string; answer: string }[];
};

export const BRANDS: Brand[] = [
  {
    slug: "lamborghini-collision-repair-sarasota",
    name: "Lamborghini",
    brandKey: "lamborghini",
    metaTitle: "Lamborghini Collision Repair — Sarasota, FL",
    metaDescription:
      "Factory-correct collision repair for Aventador, Huracán, Urus, Revuelto, and SVJ. Tri-coat paint match, carbon-fiber repair, ADAS recalibration. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "Lamborghini collision repair, factory-correct.",
    intro:
      "An Aventador isn't a body-shop car. The tri-coat paint takes three booth runs to match under Sarasota sun. The carbon panels need primer thickness controlled to the micron. The frame won't tolerate eyeballed alignment. I've spent the last 4 years making cars like yours come home looking like the day they left Sant'Agata. If your car's been hit, this is the shop the dealer should have sent you to.",
    models: [
      "Aventador",
      "Aventador SVJ",
      "Huracán",
      "Huracán Performante",
      "Huracán STO",
      "Urus",
      "Urus Performante",
      "Revuelto",
      "Gallardo",
      "Murciélago",
    ],
    specialties: [
      {
        title: "Tri-coat paint match",
        copy: "Lamborghini's signature paints — Arancio Atlas, Verde Mantis, Blu Eleos — take three booth runs and a paint-thickness gauge to get right. We mix to the factory code, layer to factory depth, and verify under booth daylight before sign-off.",
      },
      {
        title: "Carbon-fiber repair",
        copy: "The Aventador is mostly carbon. Huracán Performante adds forged composite panels. Damaged carbon doesn't get filled — it gets relayered, weave-matched, and clear-coated to factory gloss. We see the weave; you don't see the repair.",
      },
      {
        title: "Frame & spaceframe alignment",
        copy: "Aventador uses a CFRP monocoque. Huracán is aluminum spaceframe. Both are unforgiving of bent body mounts and out-of-spec subframes. We measure to factory tolerances on a Spanesi machine and document it.",
      },
      {
        title: "ADAS recalibration",
        copy: "Huracán EVO and Revuelto carry forward-facing radar, parking cameras, and lane-keep sensors. Every collision throws calibration. We recalibrate to OEM procedure with the original target boards — nothing aftermarket.",
      },
      {
        title: "V12 cooling system integrity",
        copy: "A wrecked clamshell often hides cracked radiators, bent intercoolers, and stressed coolant lines on the naturally-aspirated V12. We pressure-test every line, replace anything outside spec, and re-fill with the right glycol blend.",
      },
      {
        title: "Owner-direct communication",
        copy: "You'll talk to Serge — not a service writer. Photos at every milestone. Estimate revisions in writing. Final walkthrough before delivery. No subcontractors, no surprises.",
      },
    ],
    faqs: [
      {
        question: "Who repairs Lamborghini collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. The owner, Serge, does the work himself on Aventador, Huracan, Urus, and Revuelto, following Lamborghini OEM repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can a Lamborghini's carbon-fiber body be repaired, or does the panel have to be replaced?",
        answer:
          "It depends on the damage. Surface and clear-coat damage on CFRP can be re-layered, weave-matched, and refinished. Structural carbon, such as the Aventador monocoque, is not repaired in a body shop; damaged structure means a factory-supplied section. We tell you which case you are in after disassembly, with photos.",
      },
      {
        question: "Can you match Lamborghini tri-coat colors like Arancio Atlas or Verde Mantis?",
        answer:
          "Yes. We mix to the factory paint code, spray the base and mid-coat in separate booth runs, control film thickness with a gauge, and check the blend under daylight-matched lighting before clear. Tri-coat is the reason many shops decline Lamborghini paint work.",
      },
      {
        question: "Do you use OEM Lamborghini parts?",
        answer:
          "Yes. Body panels, fasteners, clips, and sensors are ordered from Lamborghini. Aftermarket panels do not hold factory gap tolerances on these cars. If a part is back-ordered from Italy we tell you the lead time before we order it.",
      },
      {
        question: "Will my Lamborghini's insurance pay for repair at an independent shop?",
        answer:
          "In Florida you choose the repair shop. We write the estimate to OEM procedure, document every step with photos, and deal with the adjuster directly. If the insurer pushes for non-OEM parts or shortcuts, you will hear it from us first.",
      },
      {
        question: "Does a Urus need ADAS recalibration after a front-end collision?",
        answer:
          "Almost always. The Urus carries forward radar, cameras, and parking sensors that lose calibration when a bumper or windshield is disturbed. We recalibrate with the Lamborghini diagnostic platform and original target boards before the car leaves.",
      },
    ],
  },
  {
    slug: "mclaren-collision-repair-sarasota",
    name: "McLaren",
    brandKey: "mclaren",
    metaTitle: "McLaren Collision Repair — Sarasota, FL",
    metaDescription:
      "MonoCage carbon-tub-correct repair for 720S, 765LT, Artura, GT, and 750S. Hydraulic suspension, dihedral door alignment, factory paint. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "McLaren collision repair, MonoCage-correct.",
    intro:
      "McLaren built the 720S around a carbon tub the dealer's body shop is not equipped to repair. The dihedral doors don't tolerate misaligned hinges. The hydraulic suspension lines run through panels the average tech won't track. The paint code is famously hard to match. I've worked on enough McLarens to know where the damage hides, and I have the equipment, the patience, and the procedure to bring yours back to factory spec.",
    models: [
      "570S",
      "570GT",
      "600LT",
      "650S",
      "675LT",
      "720S",
      "750S",
      "765LT",
      "Artura",
      "GT",
      "P1",
      "Senna",
    ],
    specialties: [
      {
        title: "MonoCage carbon-tub safety",
        copy: "The 720S, 765LT, and Artura all use a one-piece carbon monocoque. Damage to the tub itself is McLaren-only territory — we know what's repairable and what triggers a structural inspection. We won't paint over a problem.",
      },
      {
        title: "Dihedral door alignment",
        copy: "Dihedral doors lift up and forward on a single hinge mechanism. Misalignment after collision is common and the gap tolerance is tight. We adjust to factory spec on a leveled lift and verify the seal under spray test.",
      },
      {
        title: "Hydraulic suspension repair",
        copy: "McLaren's Proactive Chassis Control runs hydraulic lines through the body. A clipped panel can mean a leaking accumulator. We pressure-test the system before reassembly and replace any line that's compromised.",
      },
      {
        title: "Twin-turbo V8 cooling system",
        copy: "Front-end damage on a 720S almost always involves the front-mounted radiators and intercoolers. We replace OEM, pressure-test, and verify the active aero shutters cycle correctly before the car leaves.",
      },
      {
        title: "Factory paint match",
        copy: "McLaren Orange. Volcano Yellow. Ceramic Grey. Each has a known ΔE drift problem after collision repair if mixed wrong. We mix to McLaren's PPG codes and verify under booth daylight, color-match camera, and side-by-side panel test.",
      },
      {
        title: "MQA-procedural workflow",
        copy: "We follow McLaren Quality Assurance procedures end-to-end — from the documented intake walkthrough to the post-repair scan-tool verification. You get the report; the carfax stays clean.",
      },
    ],
    faqs: [
      {
        question: "Who repairs McLaren collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on 570S, 720S, 765LT, Artura, and GT following McLaren OEM procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can a McLaren carbon tub be repaired after a crash?",
        answer:
          "No body shop repairs the MonoCell or MonoCage. If the tub is damaged, McLaren specifies replacement, and the car is usually a total loss. Most collisions damage the aluminum crash structures and composite panels bolted to the tub, which are replaceable. We measure the tub first so you know which situation you have.",
      },
      {
        question: "Do you replace McLaren aluminum crash structures?",
        answer:
          "Yes. Front and rear aluminum extrusions are bolted subassemblies designed to be replaced, not straightened. We fit new OEM structures, check mounting points against the factory dimensions, and document the measurements.",
      },
      {
        question: "Can you match McLaren Elite and MSO paint colors?",
        answer:
          "We mix to the McLaren paint code and the car's build sheet, spray in a controlled booth, and verify the match under daylight-matched lighting before clear. Some MSO colors require a factory-supplied formula, which we request through McLaren.",
      },
      {
        question: "Is the Artura's hybrid system a problem for body repair?",
        answer:
          "It changes the order of operations. Before any panel near the high-voltage system comes off, we de-energize the hybrid system per McLaren procedure and verify it with an insulated meter. Then the body work proceeds like any other McLaren.",
      },
      {
        question: "Do you use OEM McLaren parts?",
        answer:
          "Yes. Panels, brackets, sensors, and fasteners come from McLaren. Parts often ship from the UK, so lead time is part of the written timeline you receive after disassembly.",
      },
    ],
  },
  {
    slug: "audi-r8-collision-repair-sarasota",
    name: "Audi R8",
    brandKey: "audi",
    metaTitle: "Audi R8 Collision Repair — Sarasota, FL",
    metaDescription:
      "Aluminum spaceframe-correct repair for R8 V10, V10 Plus, GT, and Performance. Quattro alignment, magnetic ride suspension, factory paint. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "Audi R8 collision repair, spaceframe-correct.",
    intro:
      "The R8 is built on the same Audi Space Frame as the Lamborghini Huracán — aluminum, mid-engine, unforgiving of bent body mounts. Quattro AWD adds alignment complexity most shops don't budget for. Factory paints like Ara Blue Crystal and Suzuka Grey have a known ΔE drift problem if you don't mix to spec. I treat the R8 like the engineered exotic it is — not the &ldquo;practical Audi&rdquo; the dealer&apos;s body shop sees.",
    models: [
      "R8 V10",
      "R8 V10 Plus",
      "R8 V10 Performance",
      "R8 V10 Spyder",
      "R8 GT",
      "R8 e-tron (rare)",
    ],
    specialties: [
      {
        title: "Aluminum spaceframe repair",
        copy: "The R8 uses an aluminum and CFRP space frame — joining methods are spot-welded, riveted, and bonded. We follow the Audi Spaceframe-Repair certification process and have the equipment to do it right.",
      },
      {
        title: "V10 mid-engine integrity",
        copy: "The naturally-aspirated 5.2L V10 sits where the rear seats would be on a regular car. Frame damage near the engine bay needs checking against factory tolerances. We measure and document.",
      },
      {
        title: "Quattro AWD alignment",
        copy: "Front and rear alignment on a Quattro-equipped R8 is tighter than RWD. We align on a Hunter machine and verify the toe + camber against R8-specific factory specs, not generic Audi specs.",
      },
      {
        title: "Magnetic ride suspension",
        copy: "Magnetic dampers don't tolerate bent control arms or compromised mounts. We inspect every component, replace what's out of spec, and re-zero the ride-height calibration via VCDS.",
      },
      {
        title: "Factory paint match — Ara Blue, Suzuka Grey, Tango Red",
        copy: "R8 paints are tri-coat with metallic flakes that catch light differently per booth setup. We mix to Audi's PPG codes, layer to factory depth, and verify under matched booth lighting before clear-coat.",
      },
      {
        title: "ADAS recalibration",
        copy: "R8 V10 Performance carries radar, lane-keep, and parking sensors that all throw calibration after collision. We recalibrate via VAS 6131 with original target boards — to OEM procedure.",
      },
    ],
    faqs: [
      {
        question: "Who repairs Audi R8 collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on every R8 generation, including the V10 Plus, Performance, and GT, following Audi repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can an Audi R8 aluminum space frame be repaired?",
        answer:
          "Partially. The Audi Space Frame is aluminum with bonded and riveted joints and, on the second generation, carbon-fiber sections. Repair means replacing sections with the Audi-specified rivets, adhesive, and jig points, not straightening. Sections Audi marks as non-repairable mean replacement or total loss.",
      },
      {
        question: "Do you work on both R8 generations?",
        answer:
          "Yes. First-generation cars (2008 to 2015) and second-generation cars (2017 on) have different frame construction and different repair procedures. We follow the correct one for the chassis in front of us.",
      },
      {
        question: "Can you match Audi exclusive and matte paints?",
        answer:
          "Solid and metallic colors are mixed to the Audi paint code and verified in the booth. Matte finishes cannot be spot-repaired or polished, so damaged matte panels are refinished whole to keep the sheen even.",
      },
      {
        question: "Does the R8 need calibration after body repair?",
        answer:
          "Yes for anything involving the front bumper, windshield, or mirrors. The R8 carries parking sensors, cameras, and on later cars front radar. We recalibrate with the Audi diagnostic platform before delivery.",
      },
      {
        question: "Do you use OEM Audi parts on the R8?",
        answer:
          "Yes. Panels, fasteners, and sensors come from Audi. If a part is discontinued for an older R8, we tell you the options before ordering anything.",
      },
    ],
  },
  {
    slug: "ferrari-collision-repair-sarasota",
    name: "Ferrari",
    brandKey: "ferrari",
    metaTitle: "Ferrari Collision Repair — Sarasota, FL",
    metaDescription:
      "Factory-correct collision repair for 488, F8, 296, SF90, Roma, 812, Portofino, and Purosangue. Aluminum-chassis welding, tri-coat Rosso match, hybrid HV systems. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "Ferrari collision repair, factory-correct.",
    intro:
      "A Ferrari isn't a body-shop car. The aluminum chassis is TIG-welded by procedure; one wrong heat cycle and you've compromised it. The Rosso family of paints — Rosso Corsa, Rosso Mugello, Rosso Maranello — drift visibly if mixed from generic codes. The SF90 and 296 carry high-voltage hybrid systems that need their own safety procedure before a panel comes off. I've spent the last 4 years working on Maranello's cars — every rivet replaced to spec, every damper measured, every Manettino sensor recalibrated to OEM. If yours has been hit, bring it here before anyone else opens a panel.",
    models: [
      "488 GTB",
      "488 Pista",
      "488 Spider",
      "F8 Tributo",
      "F8 Spider",
      "296 GTB",
      "296 GTS",
      "SF90 Stradale",
      "SF90 Spider",
      "Roma",
      "812 Superfast",
      "812 GTS",
      "Portofino",
      "Portofino M",
      "Purosangue",
      "Daytona SP3",
    ],
    specialties: [
      {
        title: "Aluminum chassis welding",
        copy: "Ferrari's aluminum spaceframe (488, F8, 296, SF90) is TIG-welded by procedure with controlled heat input. We follow the Ferrari aluminum-repair certification process and document every weld for the records package.",
      },
      {
        title: "Rosso paint match — Corsa, Mugello, Maranello",
        copy: "The Rosso family has a documented ΔE drift problem when matched from generic codes. We mix to Ferrari's PPG / Standox build-sheet codes, layer to factory depth, and verify under matched booth lighting before clear-coat.",
      },
      {
        title: "Carbon-fiber panel repair",
        copy: "488 Pista, F8 Tributo, SF90 carry CFRP panels — bumpers, splitters, rear hatches. Damaged carbon doesn't get filler — it gets relayered, weave-matched, and clear-coated to factory gloss with the right primer thickness.",
      },
      {
        title: "Hybrid HV system safety (SF90, 296)",
        copy: "The SF90 and 296 PHEV carry 800V hybrid traction systems. Before a panel touches the body, we follow the Ferrari de-energization procedure: HV disconnect, lockout-tagout, and verify with an insulated meter. No shortcuts on hybrid Ferraris.",
      },
      {
        title: "Carbon-ceramic brake handling",
        copy: "Ferrari's CCM brakes can't be machined or contaminated. We protect them through the entire repair, verify pad transfer-film integrity, and re-bed only as the OEM procedure specifies.",
      },
      {
        title: "ADAS + Manettino recalibration",
        copy: "Forward radar, parking cameras, lane-keep on the Roma and Purosangue all throw calibration after collision. We recalibrate via the Ferrari diagnostic platform with original target boards — to OEM procedure.",
      },
    ],
    faqs: [
      {
        question: "Who repairs Ferrari collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on 488, F8, 296, SF90, Roma, 812, Portofino, and Purosangue following Ferrari repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can a Ferrari aluminum chassis be repaired after an accident?",
        answer:
          "Yes, within limits. Ferrari's aluminum spaceframe is repaired by replacing sections with TIG welds and rivets under controlled heat input, following the Ferrari aluminum repair process. Sections Ferrari designates as non-repairable mean replacement. Every weld is photographed for your records.",
      },
      {
        question: "Can you match Rosso Corsa and other Ferrari reds?",
        answer:
          "Yes. Rosso Corsa, Rosso Mugello, and Rosso Maranello drift visibly when mixed from generic codes. We mix to the Ferrari build-sheet code, layer to factory film thickness, and verify under matched booth lighting before clear.",
      },
      {
        question: "Is an SF90 or 296 safe to repair at an independent shop?",
        answer:
          "Yes, if the shop follows the high-voltage procedure. Before a panel near the hybrid system comes off, we disconnect and lock out the HV system per Ferrari procedure and verify with an insulated meter. Then the body work proceeds.",
      },
      {
        question: "Will repairing my Ferrari outside the dealer affect its value?",
        answer:
          "What affects value is the quality of the repair and the paperwork. You receive a photo record from intake through final measurement, OEM part invoices, and a written warranty. That is what a buyer or a Ferrari dealer asks to see.",
      },
      {
        question: "Do you use OEM Ferrari parts?",
        answer:
          "Yes. Panels, fasteners, sensors, and trim come from Ferrari. Parts ship from Italy, so lead time is part of the written timeline you receive after disassembly.",
      },
    ],
  },
  {
    slug: "porsche-collision-repair-sarasota",
    name: "Porsche",
    brandKey: "porsche",
    metaTitle: "Porsche Collision Repair — Sarasota, FL",
    metaDescription:
      "Factory-correct collision repair for 911, GT3, GT3 RS, Taycan, Cayenne, Panamera, and 718. PASM dampers, carbon-ceramic, EV high-voltage, factory paint. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "Porsche collision repair, factory-correct.",
    intro:
      "Porsche's lineup runs from a base 718 to a 911 GT3 RS to a tri-motor Taycan Turbo S — and the body-shop discipline scales with it. PASM dampers don't tolerate bent control arms. Carbon-ceramic brakes can't be contaminated. The Taycan's 800V architecture needs an HV de-energization procedure before a clip comes out. PTS (Paint to Sample) colors require the original build sheet to match. I treat every Porsche like an engineered exotic — torque to spec, gap to factory, sensors recalibrated to OEM. The way it left Stuttgart.",
    models: [
      "911 Carrera",
      "911 Carrera S / 4S",
      "911 Turbo",
      "911 Turbo S",
      "911 GT3",
      "911 GT3 RS",
      "911 GT3 Touring",
      "911 GT2 RS",
      "911 Targa",
      "718 Cayman",
      "718 Cayman GT4",
      "718 Cayman GT4 RS",
      "718 Boxster",
      "Taycan",
      "Taycan Turbo S",
      "Taycan Cross Turismo",
      "Cayenne",
      "Cayenne Turbo GT",
      "Panamera",
      "Panamera Turbo",
    ],
    specialties: [
      {
        title: "PASM damper alignment",
        copy: "Porsche Active Suspension Management dampers don't tolerate bent control arms or compromised mounts. We inspect every link, replace what's out of spec, and re-zero the ride-height calibration via PIWIS so active damping reads true.",
      },
      {
        title: "GT3 RS aero panel repair",
        copy: "GT3 RS, GT4 RS, and 911 GT2 RS carry CFRP aero — splitters, swan-neck wings, hood vents. Damaged carbon doesn't get filler — it gets relayered, weave-matched, and clear-coated to factory gloss. The aerodynamics survive the repair.",
      },
      {
        title: "Taycan HV system safety",
        copy: "Taycan's 800V architecture requires the Porsche de-energization procedure before any panel comes off near the battery. HV disconnect, lockout-tagout, verify with insulated meter. No bypassing the procedure on EVs.",
      },
      {
        title: "Carbon-ceramic brake handling",
        copy: "PCCB rotors can't be machined or contaminated. We protect them through the entire repair, verify pad transfer-film integrity, and re-bed only as the OEM procedure specifies.",
      },
      {
        title: "PTS + factory paint match",
        copy: "Crayon, Gulf Blue, GT Silver, and the full Paint-to-Sample range require the original build-sheet code — generic Porsche codes drift visibly. We mix to spec, layer to factory depth, and verify under matched booth lighting.",
      },
      {
        title: "ADAS + PCM recalibration",
        copy: "911 (992-gen), Taycan, and Cayenne carry radar, lane-keep, parking, and surround sensors that throw calibration after collision. We recalibrate via PIWIS with original target boards — to OEM procedure.",
      },
    ],
    faqs: [
      {
        question: "Who repairs Porsche collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on 911, 718, Taycan, Cayenne, Panamera, and Macan following Porsche repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can you match Porsche Paint to Sample colors?",
        answer:
          "Yes. PTS colors need the original build sheet or the sample code, not a generic match. We source the formula, spray in a controlled booth, and verify under daylight-matched lighting before clear. Standard Porsche colors are mixed to the factory code the same way.",
      },
      {
        question: "Do you repair Porsche 911 GT3 and GT3 RS carbon aero?",
        answer:
          "Yes. Splitters, swan-neck wings, and CFRP hoods are re-layered and weave-matched rather than filled, then refinished to factory gloss. Damaged carbon that Porsche designates as non-repairable is replaced with a new OEM part.",
      },
      {
        question: "Is a Taycan safe to repair at an independent shop?",
        answer:
          "Yes, if the shop follows the high-voltage procedure. The Taycan runs an 800-volt system. Before any panel near it comes off, we de-energize per Porsche procedure and verify with an insulated meter. Then the body work proceeds.",
      },
      {
        question: "Does a Porsche need PIWIS recalibration after a collision?",
        answer:
          "Usually. Front radar, cameras, parking sensors, and on PASM cars the ride-height calibration all read wrong after a collision or suspension replacement. We recalibrate with the Porsche diagnostic platform before the car leaves.",
      },
      {
        question: "Do you use OEM Porsche parts?",
        answer:
          "Yes. Panels, fasteners, sensors, and trim come from Porsche. If a part is on back order from Germany, the lead time goes into the written timeline you receive after disassembly.",
      },
      {
        question: "Will my insurance cover repair at an independent Porsche shop?",
        answer:
          "In Florida you choose the shop. We write the estimate to Porsche procedure, document every step with photos, and work directly with the adjuster on OEM parts and required calibrations.",
      },
    ],
  },
  {
    slug: "bentley-collision-repair-sarasota",
    name: "Bentley",
    brandKey: "bentley",
    metaTitle: "Bentley Collision Repair — Sarasota, FL",
    metaDescription:
      "Factory-correct collision repair for Continental GT, Flying Spur, Bentayga, and Mulsanne. Aluminum superform panels, deep-gloss paint, veneer and leather protection. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "Bentley collision repair, factory-correct.",
    intro:
      "A Bentley hides its engineering under the finish. The Continental GT's fenders and hood are superformed aluminum that will not tolerate the hammer-and-dolly work a steel car takes. The paint is deep enough that a thin spot reads from across a parking lot. Inside, the veneer and hide are the reason the car cost what it did, and they have to survive the repair untouched. I take Bentleys apart by procedure, replace what Crewe says to replace, and refinish to the film thickness on the build sheet. The way it left the factory.",
    models: [
      "Continental GT",
      "Continental GT Speed",
      "Continental GTC",
      "Flying Spur",
      "Flying Spur Speed",
      "Bentayga",
      "Bentayga EWB",
      "Bentayga Speed",
      "Mulsanne",
      "Mulsanne Speed",
      "Batur",
    ],
    specialties: [
      {
        title: "Superformed aluminum panels",
        copy: "Continental GT and Flying Spur fenders, hood, and quarter panels are heat-formed aluminum. They are replaced, not straightened, and bonded and riveted to the Bentley procedure with the specified adhesive cure time.",
      },
      {
        title: "Deep-gloss paint to factory depth",
        copy: "Bentley paint is applied thick and flattened between coats. We measure the film on the undamaged panels, match the build sheet code, and layer to the same depth so the repaired panel reflects like the rest of the car.",
      },
      {
        title: "Veneer, hide, and brightwork protection",
        copy: "Before disassembly the interior is masked and covered, and exterior brightwork is removed rather than taped. Chrome and polished stainless trim are bagged and logged so nothing gets scratched on the bench.",
      },
      {
        title: "Aluminum and steel hybrid body",
        copy: "Bentleys mix aluminum skins with steel structure. Mixed-metal joints need isolated fasteners and the right corrosion barrier, or the repair starts to bubble in Florida humidity within a year. We follow the factory joining method every time.",
      },
      {
        title: "ADAS and air-suspension calibration",
        copy: "Front radar, cameras, night vision on the Bentayga, and the air suspension ride-height sensors all need recalibration after a collision. We run the Bentley diagnostic procedure before the car leaves.",
      },
      {
        title: "Insurance documentation",
        copy: "Bentley repairs are expensive because the parts and procedures are. We write the estimate to the factory method, photograph every stage, and deal with the adjuster so you are not arguing over a superformed fender.",
      },
    ],
    faqs: [
      {
        question: "Who repairs Bentley collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on Continental GT, Flying Spur, Bentayga, and Mulsanne following Bentley repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can a Bentley aluminum fender be repaired or does it have to be replaced?",
        answer:
          "Superformed aluminum panels on the Continental GT and Flying Spur are replaced, not straightened. Minor cosmetic damage to a steel panel can sometimes be repaired. We tell you which after we see the car.",
      },
      {
        question: "Can you match Bentley paint?",
        answer:
          "Yes. We mix to the Bentley build-sheet code, measure the film thickness on the undamaged panels, and layer the repair to the same depth so the gloss matches. Mulliner colors may need a factory-supplied formula, which we request through Bentley.",
      },
      {
        question: "Will the interior be protected during repair?",
        answer:
          "Yes. The veneer, hide, and brightwork are masked or removed before any grinding or paint work, and every removed trim piece is bagged and logged.",
      },
      {
        question: "Do you use OEM Bentley parts?",
        answer:
          "Yes. Panels, fasteners, sensors, and trim come from Bentley. Parts ship from the UK, so lead time is part of the written timeline you receive after disassembly.",
      },
      {
        question: "Does a Bentayga need recalibration after a bumper repair?",
        answer:
          "Yes. Front radar, cameras, and parking sensors lose calibration when the bumper is removed, and the air suspension ride-height sensors need checking after any suspension work. We run the Bentley diagnostic procedure before delivery.",
      },
    ],
  },
  {
    slug: "mercedes-amg-collision-repair-sarasota",
    name: "Mercedes-AMG",
    brandKey: "mercedes",
    metaTitle: "Mercedes-AMG Collision Repair — Sarasota, FL",
    metaDescription:
      "Factory-correct collision repair for G63, GT, SL, E63, C63, and Brabus builds. Aluminum-steel body, designo and matte paint, ADAS recalibration. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "Mercedes-AMG collision repair, factory-correct.",
    intro:
      "An AMG is a Mercedes that has had every tolerance tightened. The G63's ladder frame takes a hit differently than the AMG GT's aluminum spaceframe, and the repair procedures do not overlap. Matte designo paint cannot be polished, so a scratch means the whole panel. Brabus and Mansory widebody parts are bonded composite that has to be refitted to the same gaps it was built with. I have done the widebody builds; I know where the panels are supposed to sit. When one of these gets hit, it comes here to be put back to spec.",
    models: [
      "G63 AMG",
      "G63 Brabus",
      "G63 Mansory",
      "AMG GT",
      "AMG GT Black Series",
      "AMG GT 63 S",
      "SL 63",
      "E63 S",
      "C63 S",
      "CLS 63",
      "S63",
      "GLE 63",
      "GLS 63",
    ],
    specialties: [
      {
        title: "G-Class ladder frame and body",
        copy: "The G63 is body-on-frame. A collision can shift the body on its mounts without visibly bending the frame. We measure the frame and body mounts against the factory dimensions before any panel work starts.",
      },
      {
        title: "AMG GT aluminum spaceframe",
        copy: "The AMG GT and SL use a bonded and riveted aluminum structure. Sections are replaced with the Mercedes-specified rivets and adhesive, never welded or straightened, and the joints are documented for the records package.",
      },
      {
        title: "designo and matte paint",
        copy: "Matte designo finishes cannot be spot-repaired or buffed. Damaged matte panels are refinished whole with the factory matte clear so the sheen reads even. Gloss designo colors are mixed to the build-sheet code and verified in the booth.",
      },
      {
        title: "Brabus and Mansory widebody refit",
        copy: "Widebody flares, hoods, and bumpers are bonded composite parts with their own fitment tolerances. We have installed these kits from scratch. After a collision we refit them to the same gaps they were built with, not to whatever the panel will accept.",
      },
      {
        title: "Carbon-ceramic brake handling",
        copy: "AMG ceramic composite brakes cannot be machined or contaminated. They are protected through the repair and re-bedded only as the OEM procedure specifies.",
      },
      {
        title: "ADAS recalibration via XENTRY",
        copy: "Distronic radar, the 360 camera system, and lane-keep all need recalibration after front, side, or windshield work. We recalibrate with the Mercedes diagnostic platform and original targets before the car leaves.",
      },
    ],
    faqs: [
      {
        question: "Who repairs Mercedes-AMG collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on G63, AMG GT, SL, E63, C63, and Brabus or Mansory builds following Mercedes repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can you repair a G-Wagon after a collision?",
        answer:
          "Yes. The G63 is body-on-frame, so we measure the frame and body mounts first, then replace or repair panels to the Mercedes procedure. Brabus and Mansory body parts are refitted to their original gaps.",
      },
      {
        question: "Can a matte designo panel be repaired?",
        answer:
          "Not spot-repaired. Matte paint cannot be blended or polished, so a damaged matte panel is refinished as a whole panel with the factory matte clear. We tell you which panels are affected before quoting.",
      },
      {
        question: "Do you work on Brabus or Mansory widebody cars?",
        answer:
          "Yes. We have installed Brabus and Mansory kits on G63s and know the fitment tolerances. After a collision the composite parts are repaired or replaced and refitted to the same gaps the build had.",
      },
      {
        question: "Does an AMG need recalibration after body repair?",
        answer:
          "Usually. Distronic radar, the surround cameras, and lane-keep lose calibration when a bumper, grille, mirror, or windshield is disturbed. We recalibrate with the Mercedes diagnostic platform before delivery.",
      },
      {
        question: "Do you use OEM Mercedes parts?",
        answer:
          "Yes for Mercedes-AMG parts. Brabus and Mansory components come from those manufacturers or their US distributors. Lead time is part of the written timeline you receive after disassembly.",
      },
    ],
  },
  {
    slug: "bmw-m-collision-repair-sarasota",
    name: "BMW M",
    brandKey: "bmw",
    metaTitle: "BMW M Collision Repair — Sarasota, FL",
    metaDescription:
      "Factory-correct collision repair for M3, M4, M5, M8, X5 M, X6 M, and XM. Carbon roof and CFRP parts, Individual and frozen paint, ADAS recalibration. Sarasota, FL.",
    eyebrow: "Sarasota, FL · OEM-procedure body work",
    headline: "BMW M collision repair, factory-correct.",
    intro:
      "A BMW M car looks like the standard car and repairs nothing like it. The M3 and M4 carry a CFRP roof that cannot be welded near. The M8 and XM carry carbon-core structure with its own repair instructions. BMW Individual and frozen paints are refinished whole or not at all. And the driver-assistance package on a current M5 needs the BMW diagnostic platform, not a generic scan tool, to calibrate after a bumper comes off. I repair M cars to the BMW procedure, document each step, and return the car with the gaps it left Munich with.",
    models: [
      "M2",
      "M3",
      "M3 Competition",
      "M3 CS",
      "M4",
      "M4 Competition",
      "M4 CSL",
      "M5",
      "M5 CS",
      "M8",
      "M8 Competition",
      "X5 M",
      "X6 M",
      "XM",
      "Z4 M40i",
    ],
    specialties: [
      {
        title: "CFRP roof and carbon parts",
        copy: "The M3 and M4 carbon roof is bonded to the body and cannot take weld heat. Adjacent repairs are done with the roof protected, and a damaged roof is replaced by the BMW procedure. CFRP trunk lids, splitters, and mirror caps are repaired or replaced as BMW specifies.",
      },
      {
        title: "Individual and frozen paint",
        copy: "BMW Individual colors are mixed to the build-sheet code and verified in the booth. Frozen matte finishes cannot be blended or polished, so damaged frozen panels are refinished whole with the factory matte clear.",
      },
      {
        title: "Mixed-material body structure",
        copy: "Current M cars combine high-strength steel, aluminum, and on the M8 and XM carbon-core elements. Each joint has a specified method. We replace sections with the BMW rivets and adhesive and never straighten ultra-high-strength steel.",
      },
      {
        title: "ADAS recalibration via ISTA",
        copy: "Front radar, KAFAS camera, parking sensors, and the surround view all read wrong after bumper, grille, or windshield work. We calibrate with the BMW diagnostic platform and original targets before delivery.",
      },
      {
        title: "M-specific suspension and geometry",
        copy: "M cars run unique control arms, subframes, and alignment specs. After a collision we inspect every link, replace what is out of spec, and align to the M specification rather than the base model figures.",
      },
      {
        title: "Carbon-ceramic brake handling",
        copy: "M Carbon ceramic brakes cannot be machined or contaminated. They are protected through the repair and re-bedded only as the OEM procedure specifies.",
      },
    ],
    faqs: [
      {
        question: "Who repairs BMW M collision damage in Sarasota?",
        answer:
          "SP Automotive Collision & Repair in Sarasota, FL. Serge, the owner, works on M2, M3, M4, M5, M8, X5 M, X6 M, and XM following BMW repair procedures. By appointment. Call or text photos to (941) 599-4025.",
      },
      {
        question: "Can an M3 or M4 carbon roof be repaired?",
        answer:
          "Cosmetic clear-coat damage can be refinished. Cracked or delaminated CFRP is replaced per the BMW procedure, because the roof is bonded structure and cannot be patched. We tell you which case you have after inspection.",
      },
      {
        question: "Can you match BMW Individual and frozen paint?",
        answer:
          "Yes. Individual colors are mixed to the build-sheet code and verified in the booth. Frozen matte paint cannot be blended, so the affected panel is refinished whole with the factory matte clear.",
      },
      {
        question: "Does an M car need recalibration after a bumper repair?",
        answer:
          "Yes. The front radar, camera, and parking sensors lose calibration when the bumper is removed. We recalibrate with the BMW diagnostic platform and original targets before the car leaves.",
      },
      {
        question: "Do you use OEM BMW parts?",
        answer:
          "Yes. Panels, fasteners, sensors, and CFRP parts come from BMW. If a part is on back order, the lead time goes into the written timeline you receive after disassembly.",
      },
      {
        question: "Will my insurance cover repair at an independent BMW M shop?",
        answer:
          "In Florida you choose the shop. We write the estimate to the BMW procedure, photograph every stage, and work directly with the adjuster on OEM parts and required calibrations.",
      },
    ],
  },
];

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
