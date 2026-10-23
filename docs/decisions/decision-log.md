# Decision Log — Source of Truth

This document prevents Claude from treating an attractive idea as an already approved requirement.

## Approved / selected
| Item | Decision |
|---|---|
| Brand palette | Botanical Luxury; keep Stage 01 colors intact |
| Main experiential reference | Healing Minds (scroll feeling, calm transitions, emotional editorial storytelling) |
| Secondary visual reference | Midu Studio (composition, typography, image scaling) |
| Hero medium | **Reuse the current site's actual venue video**, subject to accessing and verifying the original asset |
| Venue spaces experience | Codrops **Horizontal Parallax Gallery** direction |
| Weddings experience | Recreate the characteristic Codrops **Infinite Scroll GSAP Gallery** interaction; photos are clickable and expand to the full album of that wedding |
| Album content starting point | The five weddings already showcased by the current venue content, pending asset and venue attribution checks |
| 3D | Use a restrained perspective/depth treatment **as a transition**, not as an extra standalone attraction |
| Testimonials | ~~Large authentic couple image + editorial quote carousel preferred over dense card grid~~ — **superseded 2026-10-23:** per user brief and approval of Figma Section 06 rev 2, a compact masonry of real testimonials inspired by 21st.dev Testimonial V2 (three columns, 12px card radius, no CTA). **Motion updated 2026-10-23 (user decision):** the scroll-linked drift is replaced by the reference's continuous upward column loop (15s / 19s / 17s, masked window as tall as the approved composition) with a pause/play control, pause on hover and off-screen; static on phones and with reduced motion. The DS "Testimonial" carousel component stays in Figma but is unused |
| Inquiry method | Continue using personalized-message WhatsApp contact flow; reuse it in sections 04 and 07 |
| Experiences & Services CTA (2026-10-23) | Per user brief and approval of Figma Section 05: **no CTA** in Experiences & Services (storytelling only). Conversion touchpoints so far are Section 01 (Hero) and Section 04 (Real Stories); this supersedes the site map's WhatsApp entry point for this section |
| Final CTA destination (2026-10-23) | User decision: Section 08 "Agende uma visita" opens WhatsApp **directly** with a static visit-intent message (no form, does not route to Section 07). Uses the WhatsApp CTA / Inline component like the Hero. Message wording still pending approval |
| Working process | Research & documentation → proposed design → review/approval → only then implementation |
| Documentation language | English; site copy in pt-BR |
| Tech stack (2026-10-23) | React + TypeScript + Vite + Tailwind CSS 4, Lucide icons, self-hosted Bodoni Moda / Hanken Grotesk (Fontsource), Vitest. Motion for React only where an animation genuinely needs it. Authorized by the user with the Hero implementation |
| Git workflow (2026-10-23) | Feature branch per section, merged into `main` without PRs (user authorization); no force push |

## Proposed, not yet fully approved
| Item | Working proposal / open point |
|---|---|
| Exact section titles, final order and layouts | Current eight-section map is a strong working structure, open to refinement |
| 3D placement | Bridge leading into real weddings; test if it improves continuity |
| Hero title, film crop, overlay and transition | Produce design alternatives based on actual video |
| Fonts, grid, spacing, responsive layouts | Claude proposes, user reviews |
| Wedding album UI | Detail layout, image count, navigation and URLs to be prototyped |
| Testimonial autoplay | Default to manual; any autoplay needs review |
| WhatsApp field list and exact template | Must match audited existing process; no invented phone or fields |
| Performance budgets | To define before launch; Hero currently ships 74 KB gzip JS, 9.5 KB gzip CSS, 4.1–8.2 MB video per breakpoint |

## Unknown / verification needed
- Existing Vercel site source / downloadable original video and photos.
- Which public wedding albums match the current site and their rights / wedding couple permissions.
- Which testimonials are specifically from Recanto Miami, not another Grupo Miami venue.
- Approved contact number, existing WhatsApp template, business/services and factual claims.

## Explicit non-goals for this stage
No code, no deployment, no Git operations, no modifying production services, no invented content, no unreviewed visual identity change.
