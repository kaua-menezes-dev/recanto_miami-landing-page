# Motion & Scroll Experience

**Status:** Approved references and motion intentions; technical details and exact durations are **not** approved implementation specifications. Claude must design and prototype first.

## Global motion language
- Inspired primarily by Healing Minds, complemented by Midu's editorial image scaling.
- Slow-feeling, intentional and smooth, never laggy or heavy.
- Prefer 2–3 major choreographed moments over continuous animation everywhere.
- Scale, opacity, position and clip reveals must feel connected across section boundaries.
- Color transitions may shift between ivory, sand, forest green and deep-night green where narrative continuity supports them.
- Establish a consistent easing philosophy in a future design-system proposal; **do not hardcode numbers now**.

## Interaction matrix

| Area | Desktop desired behavior | Mobile / accessibility fallback | Priority |
|---|---|---|---|
| Hero (#01) | Existing Recanto Miami film; muted autoplay loop, editorial overlay, gentle scroll-to-next scale treatment | Optimized mobile rendition or static poster; never force audio; respect data/motion preferences | Locked film direction, details under review |
| About (#02) | Subtle image enlargement/shrink, sectional reveals as user scrolls | Simple reveal or static composition | Concept approved |
| Spaces (#03) | Codrops Horizontal Parallax Gallery, vertical-to-horizontal browsing | Native horizontal swipe or simpler stacked frames; avoid hijacking page scroll | Reference chosen |
| Services (#04) | Lightweight editorial transitions, no complex 3D | Static/reduced effect | Proposed |
| Bridge (#04 → #05 or near #05) | A brief perspective tunnel / Z-depth handoff, **not another standalone hero** | Dissolve, short image crossfade or static transition | Concept approved; placement provisional |
| Weddings (#05) | Asymmetric infinite-scroll GSAP-style gallery with image expansion to a wedding album | Scrollable cards/grid and tap-to-open album; no hover dependency | Interaction chosen |
| Testimonials (#06) | Editorial photo + quote carousel, soft image/text change | Swipe + visible previous/next controls; manual navigation | Preferred and accepted |
| Plan (#07) | Calm form reveal and direct WhatsApp handoff | Standard accessible form | Flow accepted |
| Final (#08) | Brief cinematic sign-off, strong contact hierarchy | Static or very subtle motion | Proposed |

## Hard user-experience constraints
1. Never use scroll-jacking that prevents normal page navigation or wheel/trackpad use.
2. Preserve intuitive escape/return from an album via a visible button and browser back behavior where applicable.
3. Hover is an enhancement only. All cards and photos must work on touch and keyboard.
4. Respect `prefers-reduced-motion`: reduce/remove parallax, infinite animation illusion, perspective fly-through, scaling and auto motion; keep full content reachable.
5. Do not make vital words difficult to read due to image movement or video contrast.
6. Hero poster, compressed media, lazy-loaded offscreen images and responsive assets should be planned before implementation.
7. Avoid layering several high-cost visual effects at once. Especially assess GPU work when 3D meets infinite gallery.
8. Ensure focus states, controls, semantic reading order and stable layout during transitions.

## What Claude should show at design stage
Create **three-state interaction storyboards** for hero, horizontal parallax, wedding card-to-album transition and 3D bridge: before / during / after. Also show desktop, mobile and reduced-motion alternatives. Document feasibility risks separately; do not write frontend animation code yet.
