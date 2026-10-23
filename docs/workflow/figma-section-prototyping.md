# Stage 04 — Figma Prototyping and Section Approval

**Project:** Recanto Miami | Weddings & Events  
**Status:** Governing workflow for Stage 04  
**Language:** This documentation is in English; final public-facing website copy should be in Brazilian Portuguese unless otherwise approved.

## Goal
Design the complete landing page in Figma, one section at a time, while protecting the approved Botanical Luxury identity and the existing WhatsApp lead-generation journey. No website implementation happens during this stage.

## Existing source of truth
Use the approved documentation, especially the brand visual identity, creative direction, site map, motion specification, gallery/album interaction, testimonials, WhatsApp conversion flow, and existing design approval workflow. Read only the documents needed for the currently requested section. Existing approved choices take precedence over new proposals.

## Non-negotiable scope
- Work **only on the currently authorized design deliverable**. Do not jump to later sections or generate the entire page in one pass.
- Create and edit **real, editable Figma frames/components** through connected Figma tools when supported. An image, HTML rendering, or code screenshot alone is not an acceptable replacement for an editable Figma design.
- Do not create or modify React, HTML, CSS, application routes, production assets, or website implementation code. Do not open a coding PR during Stage 04.
- Explicitly request user approval at each gate. Silence, positive comments, or the absence of requested changes are **not** approvals.
- Do not advance or mark a section `APPROVED` without an explicit user confirmation.
- Reuse the approved design system; do not reinvent the palette, fonts, layout language, or CTA strategy per section.

## Approval gates
### Gate 0: Shared design system
Define and present global Figma styles/tokens, typography, grid, spacing, components, buttons, and imagery treatment, following the approved brand documentation. Obtain explicit approval before the first section design. If already approved, reuse it rather than rebuilding it.

### Gates 1–N: One section at a time
For each section in the **approved site-map order**:
1. Read only the relevant design, content, media, motion, and conversion specifications.
2. Create the desktop Figma composition for **that section only** (and mobile variant when requested or once desktop design is approved).
3. Preserve adjacency and continuity with already approved sections.
4. Present the Figma link, frame name, and a concise rationale (layout, hierarchy, interactions, CTA).
5. Wait for the user's critique. Refine the **same section** until explicitly approved.
6. Record `APPROVED`, revision, and date in the approval tracker. Only then proceed to the next section, and only when instructed.

### Final design gate
After all sections are approved individually, perform a cross-section consistency pass covering desktop and mobile, navigation, responsiveness, image/video behavior, motion continuity and WhatsApp flows. Get **explicit approval of the overall design** before planning production React implementation.

## Already-agreed project decisions
- Direction: **Botanical Luxury** — nature, contemporary sophistication, and subtle premium restraint.
- Hero: reuse the existing site's venue video as the preferred direction; verify media availability and rights before production.
- Gallery: use an Infinite Scroll Gallery-inspired presentation. Hover can signal clickability on pointer devices, but touch and keyboard access need equivalent interactions. Open wedding-specific photo collections after selection. Five wedding showcases exist on the current site and can serve as the initial content structure.
- Testimonials: emphasize authentic wedding/client social proof.
- Motion: smooth transitions; any selective 3D effect must be purposeful and must not compromise legibility, accessibility, mobile use or performance.
- Conversion: reuse the existing personalized WhatsApp message strategy consistently at both approved conversion touchpoints. Keep the user's intent/context in the message; do not invent booking availability or event package prices.
- Content and copy: avoid fabricated testimonials, counts, client identities, venue features, awards or service guarantees. Mark missing real-world assets as placeholders.

## Design review checklist
- Matches documented palette and premium botanical identity.
- Clear headline, supporting copy, hierarchy, readable contrast and sufficient spacing.
- Accessible interactive states: hover, focus, keyboard and mobile/touch equivalents.
- Uses real approved media where available; otherwise labels placeholders.
- Motion specification includes reduced-motion fallback.
- Mobile composition is intentional rather than a naive desktop shrink.
- CTA placement and message intent follow `whatsapp-flow.md`.
- Design remains editable, orderly, named and traceable in Figma.
- Does not contradict previously approved sections.

## Approval tracker
Maintain a single source of status in this document or link to the existing decision log. Use the approved site map as the definitive section list; do not infer or create missing sections.

| Deliverable | Status | Figma frame/link | Revision | Approval date |
| --- | --- | --- | --- | --- |
| Shared design system | APPROVED | https://www.figma.com/design/TibRuIazLhbleizHsoukKt (spec: `docs/design/design-system-v1.md`) | 1 (2026-10-22) | 2026-10-22 (user confirmed in chat) |
| Hero (video) | APPROVED | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=19-3 — page `05 — Hero (Section 01)`, frames `Hero / Desktop 1440`, `Hero / Tablet 768`, `Hero / Mobile 390`, notes `Hero — Design notes (rev 2)`. Rev 2: desktop nav links centred on viewport (Navbar component, desktop variants), approved headline, paragraph and eyebrow applied | 2 (2026-10-22) | 2026-10-22 (user confirmed in chat: desktop, tablet, mobile) |
| Section 02 — Intro / About (testimonial-led) | APPROVED | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=26-7 — page `06 — Intro (Section 02)`, frames `Intro / Desktop 1440`, `Intro / Tablet 768` (node 34-8), `Intro / Mobile 390` (node 34-28), plus `Intro — Scroll reveal storyboard` and `Intro — Design notes`. Photo is a labelled placeholder | 1 (2026-10-22) | 2026-10-22 (user confirmed in chat: desktop, tablet, mobile) |
| Section 03 — Our Spaces (panoramic scroll-linked gallery) | IN REVIEW | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=40-2 — page `07 — Spaces (Section 03)`, frames `Spaces / Desktop 1440`, `Spaces / Tablet 768`, `Spaces / Mobile 390`, `Spaces / Desktop 1440 · Reduced motion`, `Spaces / Motion preview / S1–S3` (playback prototype), `Spaces — Design notes (rev 1)`. 4 real photos from the existing site (rights to confirm) | 1 (2026-10-22) | — |
| Section 04 — Real Stories / Histórias Reais (Infinite Scroll Gallery + wedding albums; site map lists Real Weddings as #05 — numbered 04 per user brief 2026-10-23) | APPROVED | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=52-5 — page `08 — Real Stories (Section 04)`, frames `Real Stories / Desktop 1440`, `Real Stories / Mobile 390` (node 58-1116), `Album / Desktop 1440 · 01–05`, `Album / Mobile 390 · 01–05`, `Storyboard / S1–S4`, components `Real Stories / Gallery Item`, `Real Stories / Album Stage / Desktop·Mobile / <couple>`, notes `Real Stories — Design notes (rev 1)`. 40 real photos from the existing site (credited @NairobiComunicacao; rights and couple consent to confirm). No tablet frame yet | 1 (2026-10-23) | 2026-10-23 (user confirmed in chat: desktop, mobile) |
| Section 05 — Experiences & Services / Experiências e Serviços (site map lists it as #04 — numbered 05 per user brief 2026-10-23; brief removes the site map's WhatsApp entry point here, CTAs stay in S01 and S04) | APPROVED | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=66-2 — page `09 — Experiences (Section 05)`, frames `Experiences / Desktop 1440`, `Experiences / Tablet 768` (node 68-29), `Experiences / Mobile 390` (node 68-121), `Storyboard / Reveal / R1–R3`, `Storyboard / Expansion / E1–E3 · Desktop`, `M1, M3 · Mobile` (playback flows), components `Experiences / Detail Row`, `Experiences / Feature`, notes `Experiences — Design notes (rev 1)`. 3 real photos from the existing site (rights to confirm; final landscape is temporary, reused from S03) + 1 labelled placeholder (Block 02). Venue facts taken from the existing site, pending owner confirmation | 1 (2026-10-23) | 2026-10-23 (user confirmed in chat: desktop, tablet, mobile) |
| Section 06 — Testimonials / Depoimentos (masonry inspired by 21st.dev Testimonial V2 per user brief 2026-10-23; supersedes the editorial-carousel direction in `testimonials.md` and the decision log, pending approval; no CTA per brief) | IN REVIEW | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=76-47 — page `10 — Testimonials (Section 06)`, frames `Testimonials / Desktop 1440` (node 76-47), `Testimonials / Tablet 768` (node 77-52), `Testimonials / Mobile 390` (node 77-121), `Testimonials / Desktop 1440 · Reduced motion`, `Storyboard / Drift / S1–S3` (playback flow), component `Testimonials / Card`, notes `Testimonials — Design notes (rev 2)`. Rev 2: compact 338px cards, 12px section-local radius (not a DS token), no hairline, featured card same size as the others, grid cols 2–11. 6 real testimonials transcribed verbatim from the existing site (consent and venue attribution to confirm); no client photos (2 labelled photo slots); no non-wedding testimonial available | 2 (2026-10-23) | — |
| Section 07 — Plan Your Event / Vamos planejar (editorial photo + inquiry form; WhatsApp handoff) | IN REVIEW | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=86-65 — page `11 — Plan Your Event (Section 07)`, frames `Plan / Desktop 1440` (node 86-65), `Plan / Tablet 768` (node 88-92), `Plan / Mobile 390` (node 88-158), `Plan / Desktop 1440 · Validation`, `Plan / Flow / F1–F4` (prototype flow "S07 · WhatsApp handoff"), `Plan / States · Form components`, `Plan / Motion / M1–M3`, `Plan / Desktop 1440 · Reduced motion`, component `Plan / Inquiry Form`, notes `Plan — Design notes (rev 1)`. Fields, options and message template audited from the live site (2026-10-23); "Ainda não tenho data" added per brief. 1 real photo (`salao`, current site, rights to confirm; also used in S03) | 1 (2026-10-23) | — |
| Section 08 — Final CTA & Footer (cinematic close inspired by user's Reference 1; headline/CTA per user brief 2026-10-23, replacing the site map's "Vamos conversar?" proposal) | IN REVIEW | https://www.figma.com/design/TibRuIazLhbleizHsoukKt?node-id=96-3 — page `12 — Final CTA & Footer (Section 08)`, frames `Final / Desktop 1440` (node 96-3), `Final / Motion / S1–S3 · Desktop 1440 viewport` (prototype flow "S08 · Cinematic close (playback)"), `Final / Desktop 1440 · Reduced motion`, `Final / Tablet 768` (node 101-102), `Final / Mobile 390` (node 101-207), `Final / Motion / M1–M2 · Mobile 390 viewport` (prototype flow "S08 · Cinematic close · Mobile (playback)"), notes `Final — Design notes (rev 3)`. Rev 3: tablet and mobile variants (centred 3-line headline below 1024px, stacked footer). Rev 2: CTA opens WhatsApp directly with a visit message (user decision 2026-10-23), now the WhatsApp CTA / Inline component like the Hero, centred helper, extra air above the CTA. 1 real photo (`cerimonia-corredor`, current site, rights to confirm; also used in S03). Contact values, logo and privacy page are placeholders; visit-message wording pending. **Desktop rev 2 APPROVED** by the user in chat 2026-10-23; tablet/mobile (rev 3) awaiting review, so the section as a whole stays IN REVIEW | 3 (2026-10-23) | Desktop: 2026-10-23 (user confirmed in chat) |
| Hero — frontend implementation | DONE (pending user review) | `src/sections/hero/`, `src/components/layout/` | 1 (2026-10-23) | — |
| Remaining sections (from approved site map) | NOT STARTED | — | — | — |
| Final cross-section approval | BLOCKED | — | — | — |

Statuses: `NOT STARTED` / `IN DESIGN` / `IN REVIEW` / `CHANGES REQUESTED` / `APPROVED`. Only user confirmation permits moving into `APPROVED`.

## Handoff format after each Figma iteration
Return only:
- Design deliverable (name, Figma link and frames).
- What was designed or refined (up to five bullets).
- Open issues or missing assets (if any).
- `Awaiting explicit approval to proceed to the next section. No website code was written.`
