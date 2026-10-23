type InstagramIconProps = { className?: string }

/**
 * Line glyph from the Design System (Icon/instagram, 24px, 1.5 stroke).
 * Lucide has no brand icons, so it is drawn here like WhatsAppIcon.
 */
export function InstagramIcon({ className }: InstagramIconProps) {
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
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.75" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.1" cy="6.9" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
