/**
 * Landing-page anchors, in approved site-map order (docs/design/site-map.md).
 * Only the Hero is implemented; the remaining ids are reserved so navigation
 * starts working as each section ships. No placeholder sections are rendered.
 */
export const sectionNav = [
  { id: 'o-recanto', label: 'O Recanto' },
  { id: 'espacos', label: 'Espaços' },
  { id: 'casamentos', label: 'Casamentos' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
] as const

export type SectionId = (typeof sectionNav)[number]['id']

export const brand = {
  name: 'Recanto Miami',
} as const
