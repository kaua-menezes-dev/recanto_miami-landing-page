/**
 * Real wedding collections shown on the current site (recantomiami-eventos.vercel.app,
 * "Casamentos reais"), photographed by Nairobi Comunicação. Labels are the couples'
 * initials exactly as published there; photo order and alt texts are the site's own.
 * Rights and couple consent are pending owner confirmation (docs/design/gallery-and-albums.md).
 */
export type Orientation = 'landscape' | 'portrait'

export type WeddingPhoto = {
  alt: string
  orientation: Orientation
}

export type Wedding = {
  /** Stable album id (`wedding-<id>` in the docs). */
  id: string
  label: string
  /** Photo opened from the wedding's primary gallery card (0-based). */
  primary: number
  photos: WeddingPhoto[]
}

const l = (alt: string): WeddingPhoto => ({ alt, orientation: 'landscape' })
const p = (alt: string): WeddingPhoto => ({ alt, orientation: 'portrait' })

export const PHOTO_CREDIT = '@NairobiComunicacao'

export const WEDDINGS: Wedding[] = [
  {
    id: 'jm',
    label: 'J + M',
    primary: 2,
    photos: [
      l('Cadernos de votos e plaquinha com as iniciais J e M, entre copos-de-leite'),
      l('Noivos se beijando sob o véu, diante da fachada clássica'),
      p('Noivos abraçados e sorrindo entre palmeiras'),
      p('Noivo beijando o rosto da noiva'),
      p('Noiva de véu segurando buquê de copos-de-leite'),
      l('Noiva entrando com o pai pelo corredor de flores'),
      p('Noivos de mãos dadas no altar de voil'),
      l('Mesa principal com teto de folhagens e flores brancas'),
    ],
  },
  {
    id: 'gl',
    label: 'G + L',
    primary: 6,
    photos: [
      l('Noiva sorrindo enquanto passa perfume, entre capim-dos-pampas'),
      l('Noiva sorrindo de olhos fechados, com a mão no véu'),
      p('Noivo entrando com a mãe sob luz verde e flores brancas'),
      l('Noivo beijando a testa da noiva à noite'),
      l('Noivos saindo entre os convidados à noite'),
      l('Noivos abraçados diante da porta de madeira entalhada'),
      p('Noiva sob a luz dourada dos lustres'),
      p('Noiva de robe no altar de voil, com o vestido nas mãos'),
    ],
  },
  {
    id: 'nw',
    label: 'N + W',
    primary: 5,
    photos: [
      l('Noivos saindo sorridentes sob bolhas de sabão'),
      l('Noivos se beijando entre bolhas e flores no corredor'),
      l('Noivos na fachada clássica com o véu ao vento'),
      l('Noivos brindando com garrafinhas de refrigerante na porta de madeira'),
      l('Noiva e madrinhas de rosa na ponte da piscina'),
      p('Buquê de rosas vermelhas e brancas, com o sorriso da noiva ao fundo'),
      l('Noiva comemorando com as madrinhas no jardim'),
      l('Noivos se beijando sob a tenda de voil'),
    ],
  },
  {
    id: 'ai',
    label: 'A + I',
    primary: 2,
    photos: [
      l('Noivos saindo pelo corredor do jardim após o sim'),
      l('Noivos na saída, entre padrinhos e madrinhas'),
      p('Noivos de rosto colado, sorrindo'),
      l('Noivos na fachada, com o véu esvoaçando'),
      l('Noivos se beijando sob o véu, junto à fonte do jardim'),
      l('Noiva rindo com buquê de rosas vermelhas, na varanda'),
      l('Noiva de robe ao lado da banheira da suíte'),
      l('Pajem entrando pelo corredor espelhado'),
    ],
  },
  {
    id: 'tg',
    label: 'T + G',
    primary: 1,
    photos: [
      l('Noivos à noite diante da porta entalhada, com o véu longo no chão'),
      p('Noivos abraçados, de olhos fechados, sob luz verde'),
      p('Noiva de robe ao lado do vestido pendurado, diante do painel de rosas'),
      p('Noiva de cabelos ruivos sorrindo por cima do ombro'),
      l('Corredor da cerimônia entre cortinas de voil e lustres'),
      l('Noiva emocionada no altar ao lado do noivo'),
      p('Noivos abraçados sob a luz quente dos lustres'),
      l('Noivos sorrindo com o cachorrinho de terno no colo'),
    ],
  },
]

const SRC = '/media/stories'

/** WebP renditions: 384 (thumbnails), 828 and 1280 px wide. */
export function photoSources(weddingId: string, photo: number) {
  const base = `${SRC}/casal-${weddingId}-${photo + 1}`
  return {
    src: `${base}-828.webp`,
    srcSet: `${base}-384.webp 384w, ${base}-828.webp 828w, ${base}-1280.webp 1280w`,
    thumb: `${base}-384.webp`,
  }
}

/** Intrinsic size of the renditions (reserves layout before decode). */
export function photoSize(orientation: Orientation) {
  return orientation === 'landscape' ? { width: 1280, height: 853 } : { width: 1280, height: 1920 }
}

export type GalleryCard = {
  wedding: number
  photo: number
  /** Approved Figma "Real Stories / Desktop 1440": x, y and frame width (px at 1440). */
  desktop: { x: number; y: number; w: number }
  /** Approved Figma "Real Stories / Mobile 390": x and frame width (px at 390); slot = stack order. */
  mobile?: { slot: number; x: number; w: number }
  /** Loop-seam clone: the sequence visibly restarts under the fade (decorative). */
  seam?: boolean
}

/**
 * Gallery box (mirrors `.stories-gallery` / `.stories-seam-fade` in index.css):
 * the gallery clips its bottom edge and the fade covers its last `fade` px.
 * Phone values are at the 390px reference width (one card every `step`).
 */
export const GALLERY_BOUNDS = {
  card: 437,
  desktop: { height: 2960, fade: 330 },
  phone: { step: 477, height: 7 * 477 + 200, fade: 240 },
} as const

/**
 * Gallery composition, two cards per wedding, in reading order. Every frame is
 * 400px tall in the approved frames; only the width (and so the crop) varies.
 */
export const GALLERY: GalleryCard[] = [
  { wedding: 0, photo: 2, desktop: { x: 160, y: 0, w: 400 }, mobile: { slot: 0, x: 20, w: 260 } },
  { wedding: 1, photo: 6, desktop: { x: 820, y: 200, w: 300 }, mobile: { slot: 1, x: 150, w: 220 } },
  { wedding: 2, photo: 2, desktop: { x: 280, y: 680, w: 420 }, mobile: { slot: 2, x: 20, w: 320 } },
  { wedding: 3, photo: 2, desktop: { x: 900, y: 820, w: 360 }, mobile: { slot: 3, x: 110, w: 260 } },
  { wedding: 4, photo: 1, desktop: { x: 140, y: 1160, w: 320 }, mobile: { slot: 4, x: 20, w: 240 } },
  { wedding: 0, photo: 1, desktop: { x: 780, y: 1400, w: 400 }, mobile: { slot: 5, x: 50, w: 320 } },
  { wedding: 2, photo: 5, desktop: { x: 340, y: 1760, w: 300 } },
  { wedding: 1, photo: 3, desktop: { x: 900, y: 1840, w: 420 }, mobile: { slot: 6, x: 20, w: 300 } },
  { wedding: 3, photo: 4, desktop: { x: 120, y: 2240, w: 440 } },
  { wedding: 4, photo: 7, desktop: { x: 800, y: 2320, w: 380 } },
  { wedding: 0, photo: 2, desktop: { x: 160, y: 2690, w: 400 }, mobile: { slot: 7, x: 90, w: 260 }, seam: true },
  { wedding: 1, photo: 6, desktop: { x: 820, y: 2760, w: 300 }, seam: true },
]
