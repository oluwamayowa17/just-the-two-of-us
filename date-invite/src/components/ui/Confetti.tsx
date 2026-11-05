import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['#6B1E2E', '#A23B3B', '#E8C4BC', '#B8954F', '#D4B77A', '#F3DDD7'];

/** A one-shot burst of paper confetti and tiny hearts. Fixed to the viewport. */
export function Confetti({ fire }: { fire: number }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 160 + Math.random() * 320;
        return {
          id: `${fire}-${i}`,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.7 - 120,
          rotate: Math.random() * 720 - 360,
          color: COLORS[i % COLORS.length],
          heart: i % 6 === 0,
          w: 6 + Math.random() * 6,
          h: 10 + Math.random() * 8,
          delay: Math.random() * 0.15,
        };
      }),
    [fire],
  );

  if (reduce || fire === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center" aria-hidden="true">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
            animate={{ x: p.x, y: [0, p.y, p.y + 420], opacity: [1, 1, 0], rotate: p.rotate, scale: 1 }}
            transition={{ duration: 2.6, delay: p.delay, ease: [0.16, 1, 0.3, 1], times: [0, 0.35, 1] }}
          >
            {p.heart ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill={p.color}>
                <path d="M12 21s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.1-8 11-8 11z" />
              </svg>
            ) : (
              <span className="block rounded-[2px]" style={{ width: p.w, height: p.h, background: p.color }} />
            )}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
