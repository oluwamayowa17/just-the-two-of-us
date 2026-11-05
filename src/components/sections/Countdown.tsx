import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import { EVENT } from '../../config/event';
import { Reveal } from '../ui/Reveal';

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-[4.4rem] items-center justify-center overflow-hidden rounded-xl border border-gold/30 bg-cream/5 sm:h-28 sm:w-28">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '60%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl tabular-nums text-cream sm:text-6xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[0.62rem] uppercase tracking-[0.3em] text-gold-light">{label}</span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(EVENT.startsAt);

  return (
    <section id="countdown" className="relative scroll-mt-16 overflow-hidden bg-burgundy px-5 py-20 text-cream sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #F7EFE3 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        {done ? (
          <div className="py-6">
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <Heart className="mx-auto h-8 w-8 fill-blush text-blush" />
            </motion.div>
            <p className="mt-6 font-display text-4xl italic sm:text-5xl">Our little day has arrived.</p>
          </div>
        ) : (
          <>
            <p className="eyebrow !text-gold-light">Counting down to us</p>
            <p className="mt-4 font-serif text-2xl italic text-cream/90 sm:text-3xl">
              Until I see you at {EVENT.location}
            </p>
            <div className="mt-10 flex justify-center gap-3 sm:gap-6" role="timer" aria-live="off">
              <Unit value={days} label="Days" />
              <Unit value={hours} label="Hours" />
              <Unit value={minutes} label="Minutes" />
              <Unit value={seconds} label="Seconds" />
            </div>
            <p className="mt-8 text-xs tracking-wide text-cream/60">
              {EVENT.dateLabel} · {EVENT.arrivalLabel} {EVENT.timezoneLabel}
            </p>
          </>
        )}
      </Reveal>
    </section>
  );
}
