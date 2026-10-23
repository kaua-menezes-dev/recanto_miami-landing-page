# Design System V1 — Botanical Luxury

**Status:** APPROVED — revision 1, approved by the user on 2026-10-22 (Typography pairing A as built in Figma). Gate 0 of `docs/workflow/figma-section-prototyping.md`.
**Figma (source of truth for visuals):** https://www.figma.com/design/TibRuIazLhbleizHsoukKt
This file is a written companion to the Figma file. If the two disagree, the Figma file wins and this file must be updated.

## Creative direction
The real venue leads. Footage and photography carry the emotion; the type, color and motion around them stay restrained. The page follows the day-to-night story the venue already tells: the garden in afternoon light, then the crystal chandeliers lit at night. Ivory and Sand sections (Day mode) open the story and Forest and Deep Night sections (Evening mode) close it. The editorial references are Healing Minds for pacing and Midu for scale-based image reveals. Champagne Gold is punctuation, never a surface.

## Figma structure
| Page | Contents |
|---|---|
| Cover | Title, status, index |
| 00 — Foundations | Principles, grid/breakpoints (real layout grids), spacing, aspect ratios, radius, elevation, imagery rules |
| 01 — Typography & Colors | Palette (approved + DERIVED), semantic roles in Day/Evening, contrast rules, pairing A vs B, type scale |
| 02 — Components | Main components (edit here) + in-context preview built from instances |
| 03 — Motion & Interaction | Duration/easing tokens, curves, patterns, card→album storyboard, mobile/reduced-motion/performance |
| 04 — Accessibility & Open Decisions | A11y checklist, decisions awaiting approval, content blockers |

Variables: `Primitives` (7 approved + 7 derived + 5 alpha), `Color` (26 semantic tokens, modes **Day** / **Evening**), `Spacing & Radius`, `Motion`. 32 text styles (`Desktop/*`, `Mobile/*`), 1 effect style.

## Color
Approved Stage 01 palette is unchanged. Derived tones (pending approval) exist only where the palette cannot meet WCAG AA:

| Token | Hex | Use | Contrast |
|---|---|---|---|
| derived/forest-hover | #1E332A | Primary hover | — |
| derived/graphite-70 | #575A52 | Secondary text on light | 6.35 ivory / 5.32 sand |
| derived/gold-deep | #755830 | Gold-family text on light | 5.94 ivory / 4.98 sand |
| derived/clay | #8C3A2C | Errors on light (with icon + text) | 6.88 ivory |
| derived/sand-line | #D9D2C4 | Decorative hairlines | decorative |
| derived/ivory-muted | #BFC1B9 | Secondary text on dark | 8.2 night / 6.59 forest |
| derived/disabled-ink | #A3A69E | Disabled labels | exempt |

Key rules: Gold on Ivory is 2.12:1, so gold is never text on light (it is fine on Forest at 5.10 and Deep Night at 6.35). Dusty Rose never carries text on light. Text over media sits on a Deep Night scrim of ≥65% (body) or ≥55% (display ≥40px). Focus ring is Forest on Day and Gold on Evening: 2px, 3px offset.

## Typography (not approved)
- **A, recommended:** Bodoni Moda (display/headings, optical sizes, italic for one emotional word) + Hanken Grotesk (UI/body).
- **B:** Gilda Display + Jost.
Both are Google Fonts under the SIL OFL with full pt-BR coverage. Scale (desktop / mobile): Display XL 112/56 · Display LG 80/44 · H1 56/36 · H2 40/30 · H3 28/24 · H4 20/18 (sans) · Quote 32/24 italic · Body LG 20/18 · Body MD 17/16 · Body SM 15/14 · Eyebrow 13/12 uppercase +12% · Button 16 · Nav 15/16 · Field 14 · Caption 13. Sizes are fluid between breakpoints.

## Layout
Breakpoints 375 · 768 · 1024 · 1440 · 1920. Columns 12 / 8 / 4, margins 80 / 40 / 20, gutters 24 / 20 / 16. Content max 1280 (galleries up to 1440 at ≥1920). Reading measure ≤64ch. Spacing scale 4–160 (`space/2xs`…`space/6xl`). Section padding 128 / 96 / 64, with 160 at Day→Evening chapter breaks. Ratios: 16:9, 9:16, 3:2, 4:5, 2:3, 1:1. Radius: 0 for media and sections, 2 for buttons and fields, round only for icon buttons. Flat elevation, with one shadow for the floating CTA and the menu sheet.

## Components (Figma component sets)
Icons (14) · Button (Primary/Secondary/Text × Default/Hover/Pressed/Focus/Disabled) · Icon Button · WhatsApp CTA (Inline/Floating × 4 states; brand palette + glyph, per user decision 2026-10-22) · Nav Item · Navbar (Over media/Solid × Desktop/Mobile) · Menu Sheet (mobile) · Section Heading · Field (5 states) · Choice Chip (5 states) · Media/Placeholder (6 ratios) · Media/Video (Playing/Paused/Reduced motion) · Media/Text Overlay (3 scrims) · Cursor/Ver álbum · Wedding Gallery Item (4 states) · Album Bar · Testimonial (Desktop/Mobile) · Footer/Contact Item (4 types). Usage notes are in each component's Figma description.

## Motion (proposed tokens)
Durations 120 / 200 / 360 / 600 / 1000 ms · stagger 80ms · rise 24px (12px on mobile). Curves: Settle `cubic-bezier(0.22,1,0.36,1)` for entering, Drift `(0.65,0,0.35,1)` for moving between places, Leave `(0.4,0,1,1)` for exits. Animate transform and opacity only, with at most one high-cost effect per viewport. No scroll-jacking. Every pattern has a reduced-motion fallback (see Figma page 03).

## Discrepancies noted during this pass
- `docs/content/content-audit.md` says the live site could not be read. It is readable now and contains concrete content (form fields, microcopy, testimonials, contact data). Those facts still need owner confirmation before reuse; the content audit was not updated.
- `docs/workflow/design-approval.md` says not to create `CLAUDE.md`, but one now exists. Likely outdated; not changed.
- `docs/workflow/design-approval.md` Stage C mentions wireframes for all eight sections, while the governing `figma-section-prototyping.md` mandates one section at a time. This pass followed the governing doc.
