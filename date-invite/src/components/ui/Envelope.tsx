import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { WaxSeal } from './WaxSeal';

interface EnvelopeProps {
  open: boolean;
  onClick?: () => void;
  /** Content written on the letter that slides out. */
  children?: ReactNode;
  label?: string;
  className?: string;
  /** How far the letter rises when opened, as % of envelope height. */
  rise?: number;
  sealInitial?: string;
}

/**
 * A vintage envelope with a wax seal. When `open` becomes true the flap
 * folds back and the letter slides up out of the pocket.
 */
export function Envelope({
  open,
  onClick,
  children,
  label = 'Open the envelope',
  className = '',
  rise = 58,
  sealInitial,
}: EnvelopeProps) {
  const reduce = useReducedMotion();
  const [flapBehind, setFlapBehind] = useState(open);

  useEffect(() => {
    if (!open) {
      setFlapBehind(false);
      return;
    }
    const t = window.setTimeout(() => setFlapBehind(true), reduce ? 0 : 380);
    return () => window.clearTimeout(t);
  }, [open, reduce]);

  const Wrapper = onClick && !open ? motion.button : motion.div;

  return (
    <Wrapper
      type={onClick && !open ? 'button' : undefined}
      onClick={!open ? onClick : undefined}
      aria-label={!open ? label : undefined}
      className={`group relative block aspect-[1.55/1] w-full select-none [perspective:1200px] ${
        !open && onClick ? 'cursor-pointer' : ''
      } ${className}`}
      whileHover={!open && onClick ? { y: -4, rotate: -0.6 } : undefined}
      whileTap={!open && onClick ? { scale: 0.985 } : undefined}
    >
      {/* soft shadow */}
      <div className="absolute inset-x-6 -bottom-4 h-8 rounded-[50%] bg-cocoa/20 blur-xl" />

      {/* back / inside of envelope */}
      <div className="absolute inset-0 overflow-hidden rounded-md bg-gradient-to-b from-burgundy-dark to-burgundy shadow-lift">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(184,149,79,.5) 0 1px, transparent 1px 9px)',
          }}
        />
      </div>

      {/* the letter */}
      <motion.div
        className="paper absolute inset-x-[6%] bottom-[5%] top-[8%] z-10 overflow-hidden rounded-sm border border-cocoa/10 text-left"
        initial={false}
        animate={{ y: open ? `-${rise}%` : '0%' }}
        transition={{ duration: reduce ? 0 : 1.1, delay: open && !reduce ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* front pocket */}
      <svg
        viewBox="0 0 310 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full drop-shadow-sm"
        aria-hidden="true"
      >
        <path d="M0 0 L150 112 L0 200 Z" fill="#EFE2CF" />
        <path d="M310 0 L160 112 L310 200 Z" fill="#EFE2CF" />
        <path d="M0 200 L155 98 L310 200 Z" fill="#F4E8D8" />
        <path d="M0 200 L155 98 L310 200" fill="none" stroke="#3B2418" strokeOpacity=".08" />
      </svg>

      {/* flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[60%] origin-top"
        style={{ zIndex: flapBehind ? 5 : 30, transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.75, ease: [0.65, 0, 0.35, 1] }}
      >
        <svg viewBox="0 0 310 120" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
          <path d="M0 0 L155 120 L310 0 Z" fill={flapBehind ? '#5A1826' : '#F7EDE0'} />
          <path d="M0 0 L155 120 L310 0" fill="none" stroke="#3B2418" strokeOpacity=".1" />
        </svg>
        <motion.div
          className="absolute left-1/2 top-[100%] w-[22%] max-w-[86px] -translate-x-1/2 -translate-y-[62%]"
          animate={{ opacity: open ? 0 : 1, scale: open ? 0.85 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <WaxSeal className="h-auto w-full drop-shadow-md" initial={sealInitial} />
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}
