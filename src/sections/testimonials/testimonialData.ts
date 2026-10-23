/**
 * Real testimonials shown on the current site (recantomiami-eventos.vercel.app,
 * "Depoimentos — Nas palavras das noivas"), transcribed verbatim with the names as
 * published there. Titles are the site's own headlines; Marcella's card had none,
 * so hers is a verbatim excerpt of her quote (Figma "Testimonials — Design notes").
 * "Casamento" follows the site's heading; "junho de 2025" is from Marcella's text.
 * Consent, venue attribution and client photos are pending owner confirmation, so
 * no photo is shown (the Figma photo slot only demonstrates the optional state).
 */
export type Testimonial = {
  id: string
  title: string
  quote: string
  name: string
  event: string
  /** Forest card — at most one per composition. */
  featured?: boolean
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'marcella',
    title: 'O dia mais feliz da minha vida',
    quote:
      '“Me casei em junho de 2025 e posso dizer com todo meu coração que foi o dia mais feliz da minha vida. O local é perfeito, os funcionários são maravilhosos, a comida divina! O chefe de cozinha passou de mesa em mesa para ver se estava tudo perfeito. Quando acabou a festa eu nem queria ir embora.”',
    name: 'Marcella',
    event: 'Casamento · junho de 2025',
    featured: true,
  },
  {
    id: 'suellen',
    title: 'Mil vezes melhor do que pedi',
    quote:
      '“A decoração me deixou emocionada, mil vezes melhor do que pedi. Comida perfeita, assessoria incrível, chefe ótimo. Meus convidados amaram do início ao fim e nem queriam ir embora.”',
    name: 'Suellen',
    event: 'Casamento',
  },
  {
    id: 'noiva',
    title: 'Não me preocupei com absolutamente nada',
    quote:
      '“Fiz meu casamento morando em Maringá/PR e, com a ajuda das Cris, não me preocupei com absolutamente nada. No dia sempre me levavam algo para beber ou beliscar enquanto eu tirava fotos. A assessora foi impecável e super pontual.”',
    name: 'Noiva do Recanto',
    event: 'Casamento',
  },
  {
    id: 'amanda',
    title: 'Atendimento impecável da equipe',
    quote:
      '“As entradas passavam toda hora na mesa dos convidados, o prato principal foi servido bem demais e a cascata de chocolate foi um sucesso. Uma das assessoras percebeu que a tarracha do meu brinco tinha caído e, sem pensar duas vezes, tirou a dela para me emprestar.”',
    name: 'Amanda',
    event: 'Casamento',
  },
  {
    id: 'fernanda',
    title: 'Tudo perfeito',
    quote:
      '“Obrigada ao buffet e à assessoria pelo excelente trabalho, atenção aos detalhes e atendimento exclusivo aos noivos. O local é lindíssimo, decoração impecável, comida maravilhosa.”',
    name: 'Fernanda',
    event: 'Casamento',
  },
  {
    id: 'priscila',
    title: 'Cada detalhe feito com amor',
    quote:
      '“Foi um sonho realizado casar no Recanto Miami. Um lugar dos sonhos, atendimento perfeito, cada detalhe feito com amor e perfeição. Agradeço a cada um dos colaboradores por tornarem o melhor dia da minha vida um dia perfeito.”',
    name: 'Priscila',
    event: 'Casamento',
  },
]

export type ColumnCount = 1 | 2 | 3

/**
 * Card ids per column, as placed in the approved frames (rev 2):
 * "Mobile 390" (single column, reading order), "Tablet 768" and "Desktop 1440".
 */
export const COLUMNS: Record<ColumnCount, string[][]> = {
  1: [['marcella', 'suellen', 'noiva', 'amanda', 'fernanda', 'priscila']],
  2: [
    ['marcella', 'suellen', 'priscila'],
    ['amanda', 'noiva', 'fernanda'],
  ],
  3: [
    ['suellen', 'amanda'],
    ['marcella', 'fernanda'],
    ['noiva', 'priscila'],
  ],
}
