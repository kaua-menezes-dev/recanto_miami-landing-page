# Source Content & Asset Audit

**Status:** Required **before final copy and high-fidelity approval**. This is an inventory plan, not a claim that all assets have been extracted.

## Priority sources
1. Existing Recanto Miami website: https://recantomiami-eventos.vercel.app/ — primary reference for the existing hero film, page content and personalized WhatsApp process. Could not be read through automated browsing during authoring.
2. Grupo Miami Eventos: https://www.grupomiamieventos.com.br/ — candidate public source of Recanto Miami wedding galleries and testimonials; may include other venues.
3. Venue-provided originals — preferred for video/photo quality, rights verification and performance-optimized derivatives.

## Audit checklist
| Asset / information | Expected source | Verification required | Current status |
|---|---|---|---|
| Hero venue video | Existing Recanto Miami site / owner | Original file, duration, aspect ratio, rights, mobile crop | Supplied by the user (2026-10-23) as `docs/references/hero.mp4` (1920×1080 H.264, 29.5 s; kept local, not in Git). Web renditions in `public/media/hero/`. Owner rights confirmation still recommended |
| Hero poster image | Existing media / original file | Representative frame, permission | First frame of the supplied film (`public/media/hero/hero-poster.webp`) |
| Venue photography | Existing website / owner | Real areas, caption accuracy, photographer credit | Pending |
| Five wedding albums | Existing site / Grupo events pages | Correct venue, IDs, names, all selected photos, photo rights | Five expected; files pending |
| Testimonials | Current website / owner | Exact wording, couple/image association, consent | Pending |
| Services / experiences | Current website / sales team | Exact offerings, inclusions, limitations | Pending |
| Practical event guidance | Current website / owner | Dates, process, what is included, FAQs | Pending |
| Brand logo | Owner-provided asset | Approved format and usage | Pending |
| WhatsApp details | Owner-provided / current site | Official phone, CTA destination, existing message template | Taken from the current official site (2026-10-23): wa.me/5511989464713, quote message "Olá! Vim pelo site e gostaria de um orçamento no Recanto Miami." Isolated in `src/config/contact.ts`; owner confirmation pending |
| Address / map / social links | Owner-provided / current site | Current active links, spelling, accuracy | Pending |

## Proposed asset organization
```text
assets/
  hero/             # approved original video / optimized versions / poster
  spaces/           # real venue spaces, named after verified locations
  weddings/
    wedding-01/     # album-specific, licensed photos and optional cover
    wedding-02/
    wedding-03/
    wedding-04/
    wedding-05/
  testimonials/     # approved couples' images and associated permissions
```

## Media handling rules
- Do not scrape or hotlink unverified images from a public website.
- Never use sample stock photos as if they depict Recanto Miami.
- Preserve photographer attribution when required.
- Keep originals archived safely and make derivative assets for web performance at implementation stage.
- No invented wedding identities, event dates, ratings, guest capacities, infrastructure or service promises.
- If a source file is unavailable, create a clearly labeled placeholder and ask for the original.

## Owner approval checklist
- Confirm that the five showcased weddings were hosted at Recanto Miami.
- Approve photo/video reuse, photographer credits and any personal consent requirements.
- Confirm current services, WhatsApp number, form template and venue contact details.
- Approve all final Portuguese headings, testimonials and public claims.
