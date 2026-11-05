/**
 * Hand-built SVG textile patterns inspired by West African prints.
 * Used as editorial "fabric swatches" in the dress code section.
 */
export type PrintKind = 'ankara' | 'adire' | 'kente' | 'mudcloth';

export function PrintSwatch({ kind, className = '' }: { kind: PrintKind; className?: string }) {
  const id = `p-${kind}`;
  return (
    <svg className={className} preserveAspectRatio="xMidYMid slice" viewBox="0 0 200 260" aria-hidden="true">
      <defs>
        {kind === 'ankara' && (
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#6B1E2E" />
            <circle cx="20" cy="20" r="16" fill="#B8954F" />
            <circle cx="20" cy="20" r="11" fill="#F7EFE3" />
            <circle cx="20" cy="20" r="7" fill="#A23B3B" />
            <circle cx="20" cy="20" r="2.5" fill="#3B2418" />
            <circle cx="0" cy="0" r="5" fill="#E8C4BC" />
            <circle cx="40" cy="0" r="5" fill="#E8C4BC" />
            <circle cx="0" cy="40" r="5" fill="#E8C4BC" />
            <circle cx="40" cy="40" r="5" fill="#E8C4BC" />
            <path d="M20 0v3M20 37v3M0 20h3M37 20h3" stroke="#F7EFE3" strokeWidth="1.5" />
          </pattern>
        )}
        {kind === 'adire' && (
          <pattern id={id} width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="#26324A" />
            <rect x="0" y="0" width="25" height="25" fill="#2E3C58" />
            <rect x="25" y="25" width="25" height="25" fill="#2E3C58" />
            <circle cx="12.5" cy="12.5" r="6" fill="none" stroke="#E7DCC8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="12.5" cy="12.5" r="1.8" fill="#E7DCC8" />
            <path d="M28 30q4.5-5 9 0t9 0M28 38q4.5-5 9 0t9 0M28 46q4.5-5 9 0t9 0" fill="none" stroke="#E7DCC8" strokeWidth="1" />
            <path d="M28 4l8 8M36 4l-8 8M38 13l8 8M46 13l-8 8" stroke="#E7DCC8" strokeOpacity=".7" strokeWidth="1" />
            <path d="M4 30h17M4 36h17M4 42h17" stroke="#E7DCC8" strokeOpacity=".6" strokeWidth="1" strokeDasharray="1 3" />
          </pattern>
        )}
        {kind === 'kente' && (
          <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
            <rect width="48" height="48" fill="#B8954F" />
            <rect y="0" width="48" height="6" fill="#3B2418" />
            <rect y="9" width="48" height="2" fill="#6B1E2E" />
            <rect y="13" width="48" height="2" fill="#6B1E2E" />
            <rect x="0" y="18" width="24" height="12" fill="#6B1E2E" />
            <rect x="24" y="18" width="24" height="12" fill="#2F4A3A" />
            <path d="M0 24h24M24 24h24" stroke="#D4B77A" strokeWidth="1.2" strokeDasharray="3 2" />
            <rect y="33" width="48" height="2" fill="#6B1E2E" />
            <rect y="37" width="48" height="2" fill="#6B1E2E" />
            <rect y="42" width="48" height="6" fill="#3B2418" />
            <path d="M6 42l6 6 6-6 6 6 6-6 6 6 6-6 6 6" fill="none" stroke="#D4B77A" strokeWidth="1" />
          </pattern>
        )}
        {kind === 'mudcloth' && (
          <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
            <rect width="44" height="44" fill="#3B2418" />
            <path d="M4 6h36M4 38h36" stroke="#EFE2CF" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M8 14l6 8-6 8M20 14l6 8-6 8M32 14l6 8-6 8" fill="none" stroke="#EFE2CF" strokeWidth="1.4" strokeLinejoin="round" />
            <circle cx="16" cy="22" r="1.2" fill="#EFE2CF" />
            <circle cx="28" cy="22" r="1.2" fill="#EFE2CF" />
          </pattern>
        )}
      </defs>
      <rect width="200" height="260" fill={`url(#${id})`} />
    </svg>
  );
}
