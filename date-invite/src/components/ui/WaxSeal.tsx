/** A burgundy wax seal with a small heart, drawn in SVG. */
export function WaxSeal({ className = '', initial }: { className?: string; initial?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#9B3647" />
          <stop offset="55%" stopColor="#6B1E2E" />
          <stop offset="100%" stopColor="#3F0F1A" />
        </radialGradient>
      </defs>
      <path
        d="M40 3c5 0 7 4 11 5s9-1 12 3 1 8 3 12 6 6 6 11-4 7-5 11 2 9-2 12-8 1-12 3-5 7-11 7-8-5-12-6-9 1-12-3-1-8-3-12-6-6-6-11 4-7 5-11-2-9 2-12 8-1 12-3 6-7 11-7z"
        fill="url(#wax)"
      />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#B8954F" strokeOpacity=".55" strokeWidth="1" />
      <circle cx="40" cy="40" r="19" fill="none" stroke="#3F0F1A" strokeOpacity=".45" strokeWidth=".8" />
      {initial ? (
        <text
          x="40"
          y="47"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontStyle="italic"
          fontSize="20"
          fill="#E9D3A6"
        >
          {initial}
        </text>
      ) : (
        <path
          d="M40 52s-11-6.6-11-14.6a6 6 0 0 1 11-3.3 6 6 0 0 1 11 3.3C51 45.4 40 52 40 52z"
          fill="#E9D3A6"
          fillOpacity=".9"
        />
      )}
    </svg>
  );
}
