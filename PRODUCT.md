# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Deferred. No stack, packages or performance budgets are chosen; they are decided only during a separately authorized implementation-planning phase (see `docs/decisions/decision-log.md`). The current phase (04) is Figma-first prototyping only — no website code.

## Users

- **Primary:** engaged couples planning their wedding, evaluating whether Recanto Miami is the right venue and wanting to start a quote conversation.
- **Secondary:** people planning other celebrations and events (social or corporate) at the venue. They are served by the same site and inquiry flow, but weddings lead the story.
- Visitors read and act in Brazilian Portuguese, often on mobile, and finish the job in WhatsApp (app on mobile, WhatsApp Web on desktop).

## Product Purpose

A landing page for Recanto Miami, an established wedding and event venue in Brazil. It shows the real venue, its spaces, real weddings held there and genuine client stories, then turns interested visitors into qualified WhatsApp conversations through a personalized, pre-filled quote-request message.

Success means a visitor moves from inspiration to an editable, ready-to-send WhatsApp message carrying their event details. Opening WhatsApp is not a delivered lead; only a message the visitor sends counts.

## Positioning

**Open — pending owner input.** The concrete differentiator (location, setting, capacity, services or other facts) has not been confirmed. Until it is, the only claim future work may lean on is the venue's own reality: real footage, real spaces and real weddings held there. Do not invent a differentiator.

## Operating Context

- Visitors move through an eight-section working structure (`docs/design/site-map.md`): hero, about, spaces, experiences & services, real weddings, testimonials, plan your event, final CTA & footer. Titles and order remain open to design review.
- Two primary conversion touchpoints (sections 04 and 07) open one shared inquiry form and message builder, which composes a safely encoded WhatsApp URL to the official business number.
- The existing site (https://recantomiami-eventos.vercel.app/) is the content baseline, not the design model. Grupo Miami Eventos (https://www.grupomiamieventos.com.br/) is an audit source that may include other venues.
- Design work follows `docs/workflow/design-approval.md` and `docs/workflow/figma-section-prototyping.md`: design system first, then one section at a time, each explicitly approved.

## Capabilities and Constraints

- Inquiry: preserve the existing personalized WhatsApp quote-request process. Exact fields, required rules, consent notice and message template are **pending audit** of the current site; the illustrative template in `docs/conversion/whatsapp-flow.md` is not approved.
- Visitors without a firm date or guest count must still be able to reach sales; short form, no long questionnaire, no implied server storage.
- Wedding albums: five weddings from current venue content are the starting point, each expanding to its own full album, pending venue-attribution and rights checks.
- No invented booking availability, prices, packages, capacities, infrastructure, ratings, awards or service promises.
- Undecided: official WhatsApp number, field list, services list, address/map/social links, logo files, tech stack.
- Terminology: user-facing copy in pt-BR; documentation and identifiers in English.

## Brand Commitments

- Name: **Recanto Miami** (Weddings & Events).
- Identity: **Botanical Luxury**, with the approved Stage 01 palette in `docs/brand/visual-identity.md` kept intact. Typography is not yet approved.
- Approved references and interaction choices live in `docs/decisions/decision-log.md` and `docs/references/reference-library.md`; treat them as binding where marked approved.
- Personality: warm, modern, refined, emotional, welcoming; real and natural, never generic or artificial luxury.

## Evidence on Hand

- `assets/` holds only empty placeholder folders (`hero/`, `spaces/`, `testimonials/`, `weddings/wedding-01` … `wedding-05`). **No media has been supplied yet.**
- Pending: hero venue video and poster, venue photography, five wedding albums, testimonials with consent, services, logo, contact details (`docs/content/content-audit.md`).
- Testimonials must be genuine, permissioned and verified as Recanto Miami (not another Grupo Miami venue). Never fabricate reviews, couples, dates or ratings; use clearly labeled placeholders until real assets arrive.

## Product Principles

1. **The real venue is the proof.** Authentic footage, spaces and weddings carry persuasion; nothing is substituted with stock or invented content.
2. **Inspiration leads to one clear conversation.** Every path ends in the same short, personalized WhatsApp inquiry, never in friction or repeated typing.
3. **Honesty over hype.** Claim only owner-confirmed facts; mark everything else as pending.
4. **Consent and ownership first.** Couples' images, names and quotes appear only with permission and correct attribution.
5. **Calm confidence.** Motion and effects serve the story and stay subordinate to readability, accessibility and performance.

## Accessibility & Inclusion

- Keyboard and touch equivalents for every hover or scroll-driven interaction (galleries, albums, carousel).
- Reduced-motion variants for all motion, including the 3D bridge and carousel.
- Readable contrast for text and CTAs over video and imagery; never rely on color alone to convey state.
- Accessible form labels and errors; correct pt-BR accents throughout.
