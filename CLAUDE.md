# Recanto Miami — Claude Code Project Instructions

## Project mission
Build an elegant, credible, conversion-oriented website for **Recanto Miami**, an established venue for weddings, celebrations, and events in Brazil. The website must showcase the real space, events, photographs, videos, and testimonials, and convert interested visitors into qualified WhatsApp conversations.

## Source of truth and language
- The approved project documentation lives in `docs/`. Read the relevant topic files before acting. Do not assume the website currently online is the latest approved specification.
- Use `docs/brand/`, `docs/references/`, `docs/design/`, `docs/content/`, `docs/conversion/`, and `docs/decisions/` for the relevant requirements. Follow the existing documentation's actual file names; do not invent missing documents.
- The governing design workflow is `docs/workflow/design-approval.md` together with `docs/workflow/figma-section-prototyping.md`. Tooling guidance is in `docs/workflow/claude-tooling.md`.
- When documents conflict or a necessary decision is missing, report the discrepancy briefly and ask before changing a previously approved direction. Never silently overwrite approved decisions.
- Write documentation, design descriptions and code identifiers in English unless directed otherwise. User-facing website copy and WhatsApp messages should be in **Brazilian Portuguese** unless specifically approved otherwise. Communicate with the user in the language they use.
- Do not invent reviews, customer identities, numbers, venue features, prices, awards, package details, or real-world event availability. Use clearly labeled placeholders when assets or facts have not been supplied.

## Brand and commercial direction
- Visual identity: **Botanical Luxury** — nature, modern sophistication, premium restraint, strong imagery, readable typography, and coherent visual rhythm. Use the approved palette and design tokens; do not invent competing brand systems.
- Hero: prefer the existing venue video as discussed, subject to asset availability and permission to reuse it.
- Wedding gallery: Infinite Scroll Gallery-inspired browsing, with clickable wedding-specific photo collections. Provide accessible keyboard and touch equivalents to hover interactions.
- Testimonials: feature genuine, permissioned client/social proof, never fabricated quotes.
- Motion: elegant, smooth transitions; use selective 3D only when purposeful. Favor accessibility and performance over spectacle, including reduced-motion behavior.
- Conversion: preserve the existing personalized WhatsApp prospecting strategy at both approved conversion touchpoints; review the conversion docs for exact message logic and CTAs. Do not invent booking availability.

## Current phase: 04 — Figma-first prototyping (+ Hero implementation)
**Design only for every section that is not explicitly authorized for implementation.**

> **2026-10-23 — user authorization:** implementation of **Section 01 (Hero + navbar + background video)** is authorized and done (React + TypeScript + Vite + Tailwind CSS; see `README.md`). The user also authorized commit, push and merge to `main` without pull requests for this work. Every other section stays Figma-only until its design is approved **and** its implementation is explicitly authorized. Items 7–8 below apply to those sections.
>
> **2026-10-23 — user authorization:** implementation of **Section 02 (Intro — testimonial + scroll-linked photo reveal)** is authorized and done (`src/sections/intro/`), including branch, push, pull request and merge to `main`.
>
> **2026-10-23 — user authorization:** implementation of **Section 04 (Real Stories — vertical infinite-scroll gallery + wedding albums)** is authorized (`src/sections/stories/`), including feature branch, commits, push and merge to `main` without a pull request.
>
> **2026-10-23 — user authorization:** implementation of **Section 05 (Experiences & Services — editorial reveals + final photographic expansion)** is authorized (`src/sections/experiences/`), including feature branch, commit, push and a pull request to `main`. **Do not merge** — the user merges after review.

1. Verify the connected Figma MCP can create and edit real **editable Figma frames and components**. A screenshot, static image, generated HTML mock-up or code rendering does not replace an editable Figma prototype.
2. Start with the **shared Figma Design System** (approved brand tokens, typography, grid, spacing, reusable components and interactive states). Show the deliverable and obtain explicit user approval before designing the first page section.
3. Then design **one section at a time**, in the order defined by the approved site map. Do not build the entire landing page in one pass.
4. For each section: read only its relevant documentation; create its desktop composition; present the Figma frame/link, brief design decisions, interaction details and any open questions; refine that same section until the user explicitly approves it.
5. Design mobile variants when the workflow requests them or after desktop approval, maintaining an intentional responsive layout. Do not declare the whole section finished before its required responsive states are approved.
6. Record section status, revision, Figma reference and user approval in the tracker identified by `docs/workflow/figma-section-prototyping.md`. Never label work `APPROVED` without explicit confirmation.
7. Advance only when instructed. After all individual sections are approved, conduct a cross-section consistency review and obtain **explicit final approval of the complete design** before any React/HTML/CSS implementation begins.
8. During this phase **do not create or modify website React, HTML, CSS, routes, application configuration or production assets**, and do not open coding pull requests. Ask before using an HTML/code-to-Figma intermediary and ensure the final result is editable in Figma.
9. Never treat silence, positive feedback on an unrelated point or a lack of corrections as approval.

For full details, follow `docs/workflow/figma-section-prototyping.md` rather than duplicating its checklist in conversation.

## Claude Code tools and token discipline
- Keep this root file small. Load only documents, skills, Figma pages and repository files relevant to the active task. Do **not** scan the entire repo or paste all documentation into context by default.
- Use project-scoped skills under `.claude/skills/` only when relevant: `/prototype-section` for one Figma deliverable, `/critique-section` for reviewing one frame, and `/prelaunch-audit` only during a future release review.
- Use Figma MCP for editable prototyping. Impeccable can support visual critique and design quality, but it does not replace user review or Figma.
- Before installing anything, check whether that skill, MCP connection or plugin is already configured. Avoid duplicate installs and unnecessary tooling.
- Keep responses concise: deliverable/link, what changed, blockers and the next approval requested. Prefer focused questions only when a decision truly blocks progress.
- Use `/context`, `/compact` and `/clear` strategically, and reference specific files rather than repeatedly loading the whole repository. See `docs/workflow/claude-tooling.md`.

## Permissions, Git and safety
- Ask the user before installing dependencies or plugins; modifying project settings; creating commits, branches, pushes or pull requests; merging; publishing; or making other external or destructive changes. **Never push or merge without explicit approval.**
- Respect any stricter permissions already configured in `.claude/settings.json` or repository policies.
- During Phase 04, document and Figma changes must still respect the relevant approval gates. No implementation-related commits or PRs.
- Never expose secrets, credentials, personal contact information or private customer data in logs, prompts, Figma frames or the repository.
- Respect client consent and ownership for wedding images, testimonials and venue video. Flag missing rights or assets rather than substituting invented real-world proof.
- For future coding: protect external links and WhatsApp URL encoding, prevent unsafe HTML injection, minimize third-party scripts, and verify accessibility, mobile responsiveness, performance and dependencies.
- Security-review tools are supplements, not guarantees. Enable code security tooling in the implementation/pre-launch stage as appropriate; see `docs/workflow/claude-tooling.md`.

## End-of-task response for Phase 04
Give a short response stating:
- Figma file/frame link and the exact section or design-system deliverable worked on.
- Major visual or interaction decisions (briefly).
- Any missing media, open decisions or limitations.
- The current approval status and a request for explicit approval.
- Confirmation that no website implementation code was written.

Do not proceed to another section until the user approves and authorizes that next step.
