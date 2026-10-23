# Claude Code Workflow — Design Only

**Non-negotiable stage gate: design before implementation.**

## Stage A — Understand and audit
1. Read the full documentation in the README order.
2. Summarize approved decisions, proposals and unresolved questions.
3. Inspect existing assets/source only with access provided by the user. Do not assume inaccessible content is verified.
4. Cross-check the current venue's content, weddings, testimonials, services and sales flow.
5. Surface licensing / identity ambiguities rather than guessing.

**Deliverable:** a short content inventory and creative brief, with clear unknowns.

## Stage B — Design direction
1. Propose a cohesive landing page based on the approved Botanical Luxury palette.
2. Interpret Healing Minds as primary motion/flow inspiration and Midu as editorial support.
3. Propose typography, spacing, surfaces, section mood changes and narrative CTA placements.
4. Show which interactions follow Codrops faithfully and which are custom adaptations.

**Deliverable:** design direction + proposed design system for **review**.

## Stage C — Prototype
1. Produce low-fidelity wireframes for the eight proposed sections.
2. After review, produce high-fidelity desktop and mobile compositions using verified assets or explicitly labeled placeholders.
3. Prototype hero scroll, spaces horizontal parallax, optional 3D bridge, real-wedding image-to-album navigation, editorial testimonials and WhatsApp inquiry flow.
4. Include reduced-motion / keyboard/touch considerations in the design rationale.
5. Organize the Figma file in a sensible, reviewable hierarchy; provide review links **only when actually available**.

**Deliverable:** a navigable prototype + annotated interaction states + owner approval request.

## Stage D — Explicit approval gate
**STOP.** Do not write app source, install packages, prepare production assets, deploy, commit/push, or open PRs until the user explicitly approves design and separately authorizes an implementation step. Even after approval, implement incrementally by approved section, not the entire website in one pass.

## Collaboration and output conventions
- Documentation/technical notes: English.
- Site content/user-facing labels: Portuguese (Brazil).
- Show work incrementally, ask for feedback at logical design checkpoints, and clearly distinguish approved choices from suggestions.
- Prefer visual evidence over abstract design adjectives.
- Do not overwrite the existing brand doc without a deliberate merge.
- Do not create `CLAUDE.md` or modify Claude Code permissions yet; configuration will be handled separately.

## Acceptance criteria for design stage
- Eight sections have a consistent narrative, without visual discontinuities.
- Both galleries are distinct, and album navigation for five weddings is visible.
- Hero uses existing real video as approved direction; fallback is designed.
- Testimonial layout is editorial photo + quote, using real approved material.
- Two commercial sections reuse the same WhatsApp inquiry process.
- Mobile and reduced-motion user journeys are fully usable.
- Prototypes clearly label unavailable/unapproved assets and copy.
- The design is reviewed before any source implementation begins.
