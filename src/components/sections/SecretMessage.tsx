import { AnimatePresence, motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { EVENT } from '../../config/event';
import { Envelope } from '../ui/Envelope';
import { FloatingHearts } from '../ui/FloatingHearts';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const LETTER = [
  'I planned every little part of this day because spending time with you is my favourite thing in the world.',
 'I wanted us to have a day where nothing else matters for a little while. Just us, our conversations, our laughter, and all the little things that make us who we are.',
 "Thank you for being so good to me. Thank you for the way you love me, the way you listen, and the way you make everything feel easier. I don't say it enough, but I see it, and I am so grateful for you.",
  "I love you, Arizechukwu. A hụrụ m gị n'anya. Today, tomorrow, and for a very long time after.",
  'I hope you enjoy this day as much as I enjoyed planning it for you.',
];

export function SecretMessage() {
  const [open, setOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const reveal = () => {
    setOpen(true);
    window.setTimeout(() => setShowLetter(true), 1400);
  };

  return (
    <section id="secret" className="relative scroll-mt-16 overflow-hidden bg-burgundy-dark px-5 py-24 sm:py-32">
      <FloatingHearts count={8} className="opacity-60" />
      <div className="relative">
        <SectionHeading eyebrow="For your eyes only" title="Something I haven't told you yet." tone="dark" />

        <div className="mx-auto mt-14 max-w-xl">
          <AnimatePresence mode="wait">
            {!showLetter ? (
              <motion.div key="env" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <Reveal className="mx-auto max-w-sm">
                  <Envelope open={open} onClick={reveal} label="Open the secret letter" sealInitial="x" rise={40}>
                    <div className="ruled h-full px-5 pt-5">
                      <p className="font-hand text-[0.7rem] leading-[32px] text-burgundy">My love,</p>
                    </div>
                  </Envelope>
                </Reveal>
                {!open && (
                  <div className="mt-10 text-center">
                    <button
                      type="button"
                      onClick={reveal}
                      className="btn border border-gold/50 px-7 py-3 text-gold-light hover:bg-gold/10"
                    >
                      <Lock className="h-4 w-4" />
                      Break the seal
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.article
                key="letter"
                initial={{ opacity: 0, y: 40, rotate: 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: -0.6 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="paper relative px-7 pb-10 pt-9 shadow-2xl sm:px-12 sm:pb-14 sm:pt-12"
              >
                <div className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-[-2deg] bg-blush/70 shadow-sm" />
                <div className="ruled font-hand text-[0.98rem] leading-[32px] text-cocoa sm:text-[1.05rem]">
                  <p className="text-burgundy">My love,</p>
                  {LETTER.map((line, i) => (
                    <motion.p
                      key={i}
                      className="mt-[32px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.9, duration: 1.2 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                  <motion.p
                    className="mt-[32px] text-burgundy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + LETTER.length * 0.9, duration: 1.2 }}
                  >
                    See you {EVENT.dayName}. x
                  </motion.p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowLetter(false);
                    setOpen(false);
                  }}
                  className="mt-8 text-xs text-cocoa-muted underline-offset-4 hover:text-burgundy hover:underline"
                >
                  Fold it back up
                </button>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
