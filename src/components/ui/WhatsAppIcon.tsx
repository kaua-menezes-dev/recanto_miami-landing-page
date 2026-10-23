type WhatsAppIconProps = { className?: string }

/**
 * Line glyph from the Design System (Icon/whatsapp, 24px, 1.5 stroke).
 * Lucide has no brand icons; swap for the official WhatsApp asset if Meta
 * brand guidelines require it (noted in the Figma component description).
 */
export function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9.2 7.8C8.6 8 8 8.8 8.1 9.7c.3 2.9 3.3 5.9 6.2 6.2.9.1 1.7-.5 1.9-1.1l-1.9-1.2-1 .8a5.3 5.3 0 0 1-2.7-2.7l.8-1-2.2-2.9Z" />
    </svg>
  )
}
