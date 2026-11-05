import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { Heart } from 'lucide-react';

/** A handful of faint hearts drifting slowly upward in the background. */
export function FloatingHearts({ count = 10, className = '' }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        size: 10 + ((i * 7) % 14),
        duration: 16 + ((i * 5) % 12),
        delay: (i * 1.7) % 10,
        drift: ((i % 2 ? 1 : -1) * (10 + (i % 4) * 8)) as number,
        color: i % 3 === 0 ? 'text-gold/30' : i % 3 === 1 ? 'text-rouge/20' : 'text-blush',
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className={`absolute bottom-[-40px] ${h.color}`}
          style={{ left: h.left }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{ y: '-115vh', x: [0, h.drift, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          <Heart fill="currentColor" strokeWidth={0} style={{ width: h.size, height: h.size }} />
        </motion.span>
      ))}
    </div>
  );
}
