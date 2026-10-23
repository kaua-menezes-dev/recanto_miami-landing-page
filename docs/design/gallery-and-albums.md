# Photo Experiences — Spaces and Real Weddings

## Gallery A — Our Spaces (#03)
**Chosen source:** https://tympanus.net/Tutorials/HorizontalParallaxGallery/index.html

Goal: let visitors feel as though they are exploring distinct physical areas of the venue, not simply viewing a conventional slideshow.

### Presentation
- Horizontal parallax driven by section browsing on desktop.
- Each environment includes a real photo, verified title and a short, factual description.
- Use controlled depth/offset while preserving text readability.
- On mobile, prioritize native touch navigation or simpler stacked spaces.
- Number/names of environments **TBD from venue audit**; do not invent rooms or amenities.

## Gallery B — Real Weddings (#05)
**Chosen source:** https://tympanus.net/Tutorials/InfiniteScrollGSAPGallery/

### Experience to match faithfully
- Asymmetrical image placement and a strong sense of continuous gallery browsing.
- Parallax / position changes aligned with scrolling.
- Custom cursor or hover treatment on desktop that communicates **click to open**.
- Click/tap a photo to smoothly expand it and transition to an **album for that specific wedding**.
- An obvious, elegant way to return to the gallery and keep exploring.

### Necessary functional extension
The reference demonstrates image-to-detail/page transitions. Our design adapts it to **event-group album opening**. Every card must know which wedding it belongs to; clicking any card belonging to Wedding A opens Wedding A's full collection, not a random single photo.

### Initial content: five wedding albums
The user confirmed that the current site already presents five weddings. Public Grupo Miami Eventos event pages also list the following **candidate source labels**; verify their match to the specific Recanto Miami collection before publication:

| Working album ID | Candidate public label | Confirmed photo assets |
|---|---|---|
| `wedding-01` | J + M | Pending asset audit |
| `wedding-02` | G + L | Pending asset audit |
| `wedding-03` | N + W | Pending asset audit |
| `wedding-04` | A + I | Pending asset audit |
| `wedding-05` | T + G | Pending asset audit |

Source to cross-check: https://www.grupomiamieventos.com.br/eventos

### Album detail (design requirements)
- Wedding's verified name/title and cover image.
- Photo sequence populated from that wedding only.
- Distinct back/close path, preserved browsing context if feasible.
- Keyboard and touch navigation, meaningful alt text, and readable controls.
- Clearly differentiated single-event browsing (inside the album) from multi-event infinite gallery (outside).
- Natural end-of-gallery / continue-page route despite the infinite illusion.

### Data model for content planning only (not code)
Each event needs: `stable_id`, `display_title`, `approved_cover_media`, `ordered_approved_photos`, `optional_date`, `photographer_credit`, `permission_status`, `optional_story`. Dates and credits must not be invented.

### Rights
The public events page credits @NairobiComunicacao. Verify venue licensing, photographer permissions and any needed couple consent before copying or publishing. Do not hotlink public-gallery image URLs as a long-term asset strategy.

## Design deliverables
1. Spaces gallery desktop + mobile frames.
2. Infinite gallery desktop view with cursor state.
3. Opening transition to an album, including image expansion.
4. Album desktop/mobile presentation and return flow.
5. List of original assets still needed from the venue.
