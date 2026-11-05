import { motion } from 'framer-motion';
import { ChevronDown, MailOpen } from 'lucide-react';
import { Envelope } from '../ui/Envelope';
import { FloatingHearts } from '../ui/FloatingHearts';
import { Flourish } from '../ui/Flourish';
import { EVENT } from '../../config/event';

interface LandingProps {
  opened: boolean;
  onOpen: () => void;
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Landing({ opened, onOpen }: LandingProps) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-24">
      <FloatingHearts count={12} />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <motion.p {...fade(0.2)} className="font-script text-2xl text-rouge sm:text-[1.7rem]">
          A little something planned just for you.
        </motion.p>

        <motion.h1
          {...fade(0.45)}
          className="mt-3 font-display text-[2.6rem] leading-[1.02] text-burgundy sm:text-6xl"
        >
          {EVENT.title.split(' Just ')[0]}
          <span className="block italic text-rouge">just for us</span>
        </motion.h1>

        <motion.div {...fade(0.6)}>
          <Flourish className="mx-auto mt-5 h-3 w-28 text-gold" />
        </motion.div>

        <motion.p {...fade(0.75)} className="mt-5 max-w-sm font-serif text-xl italic text-cocoa-light">
          Are you ready for a day made just for us?
        </motion.p>

        <motion.div {...fade(1)} className="mt-10 w-full max-w-[400px] px-2" style={{ paddingTop: opened ? '27%' : 0 }}>
          <Envelope open={opened} onClick={onOpen} label="Open your invitation" sealInitial="♥" rise={44}>
            <div className="flex h-full flex-col items-center justify-start px-5 pt-[6%] text-center">
              <p className="eyebrow">You are invited</p>
              <p className="mt-2 font-display text-[clamp(1.05rem,4.6vw,1.6rem)] italic leading-tight text-burgundy">
                To my favourite person
              </p>
              <p className="mt-2 font-hand text-[clamp(0.7rem,2.6vw,0.9rem)] leading-loose text-cocoa-light">
                {EVENT.dayName} the 11th
              </p>
            </div>
          </Envelope>
        </motion.div>

        {!opened ? (
          <motion.div {...fade(1.25)} className="mt-12 flex flex-col items-center gap-3">
            <button type="button" onClick={onOpen} className="btn-primary px-8">
              <MailOpen className="h-4 w-4" />
              Open your invitation
            </button>
            <p className="text-xs tracking-wide text-cocoa-muted">or tap the seal</p>
          </motion.div>
        ) : (
          <motion.a
            href="#invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-12 flex flex-col items-center gap-1 text-sm text-cocoa-light hover:text-burgundy"
          >
            Keep reading
            <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </motion.a>
        )}
      </div>
    </section>
  );
}
