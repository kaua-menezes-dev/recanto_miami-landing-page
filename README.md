# Recanto Miami — Design Documentation

**Project:** Recanto Miami | Weddings & Events  
**Documentation language:** English  
**Website content language:** Brazilian Portuguese (pt-BR)  
**Current stage:** 02 — Visual references completed; prepare design exploration  
**Status:** Design-only handoff; **no website implementation is authorized**.

## Objective
Redesign the existing Recanto Miami landing page as an elegant, nature-inspired and commercially effective experience. Combine the established **Botanical Luxury** identity with cinematic media, smooth scroll-driven storytelling, two distinct image-gallery experiences, authentic couple testimonials, and a WhatsApp-first inquiry journey.

The current website is the **content baseline**, not the design model to copy. Prioritize its real video, real photographs, venue details, existing wedding albums, verified customer stories, service information, contact details and existing quote-request workflow. Audit every asset and claim before reuse.

Current website (primary content source): https://recantomiami-eventos.vercel.app/  
Additional public source for auditing (not necessarily identical to the current website): https://www.grupomiamieventos.com.br/

> The Vercel site was not accessible to automated inspection while this documentation was prepared. Treat its exact media URLs, layout, form fields, phone number and copy as **pending audit**, not verified facts. Ask for access to the source repository or exported assets if necessary; do not invent them.

## Reading order for Claude Code
1. [`docs/decisions/decision-log.md`](docs/decisions/decision-log.md) — approved vs provisional choices.
2. [`docs/brand/visual-identity.md`](docs/brand/visual-identity.md) — existing Botanical Luxury palette and mood.
3. [`docs/design/creative-direction.md`](docs/design/creative-direction.md) — narrative and design principles.
4. [`docs/references/reference-library.md`](docs/references/reference-library.md) — exact references and intended use.
5. [`docs/design/site-map.md`](docs/design/site-map.md) — proposed eight-section structure.
6. [`docs/design/motion-specification.md`](docs/design/motion-specification.md) — behaviors, scroll and 3D.
7. [`docs/design/gallery-and-albums.md`](docs/design/gallery-and-albums.md) — wedding galleries and album UX.
8. [`docs/design/testimonials.md`](docs/design/testimonials.md) — editorial testimonial concept.
9. [`docs/conversion/whatsapp-flow.md`](docs/conversion/whatsapp-flow.md) — lead capture UX.
10. [`docs/content/content-audit.md`](docs/content/content-audit.md) — inventory and permissions.
11. [`docs/workflow/design-approval.md`](docs/workflow/design-approval.md) — required design-only process.

## Scope boundaries
**Do now:** audit, create moodboards, propose user journey and design system, wireframe, prototype and present designs for approval. Existing approved reference choices are a starting point, not permission to add new effects without consideration.

**Do not do now:** scaffold an application; write React/CSS/animation code; install dependencies; alter production assets; push commits; open pull requests; publish; or start implementation. Request a separate explicit approval for each transition to development.

## Proposed folder structure
```text
recanto-miami/
├── README.md
├── docs/
│   ├── brand/visual-identity.md
│   ├── references/reference-library.md
│   ├── design/
│   │   ├── creative-direction.md
│   │   ├── site-map.md
│   │   ├── motion-specification.md
│   │   ├── gallery-and-albums.md
│   │   └── testimonials.md
│   ├── conversion/whatsapp-flow.md
│   ├── content/content-audit.md
│   ├── decisions/decision-log.md
│   └── workflow/
│       ├── design-approval.md
│       └── claude-first-message.md
└── assets/
    ├── README.md
    ├── hero/
    ├── spaces/
    ├── weddings/
    └── testimonials/
```

This is documentation packaging, not a required application architecture. The `CLAUDE.md` and tool permission settings will be defined when Claude Code is configured. If an earlier `docs/brand/visual-identity.md` already exists, **merge rather than blindly overwrite** it, preserving the existing approved palette.
