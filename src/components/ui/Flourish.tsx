/** A small hand-drawn style divider with a heart in the centre. */
export function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" fill="none" className={className} aria-hidden="true">
      <path d="M2 6h44" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M74 6h44" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path
        d="M60 10.2s-5-3-5-6.2a2.6 2.6 0 0 1 5-1.1 2.6 2.6 0 0 1 5 1.1c0 3.2-5 6.2-5 6.2z"
        fill="currentColor"
      />
      <circle cx="50" cy="6" r="1.1" fill="currentColor" />
      <circle cx="70" cy="6" r="1.1" fill="currentColor" />
    </svg>
  );
}
