import { AnimatePresence, motion } from 'framer-motion';
import { Check, Shirt, Sparkles, X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../config/event';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { PrintSwatch, type PrintKind } from '../ui/PrintSwatch';

const LOOKS: { kind: PrintKind; no: string; name: string; note: string; tall?: boolean }[] = [
  { kind: 'ankara', no: 'Look 01', name: 'Ankara', note: 'Bold, bright, unapologetic. A statement shirt does the talking.', tall: true },
  { kind: 'adire', no: 'Look 02', name: 'Adire-inspired', note: 'Indigo, hand-dyed energy. Effortless but thoughtful.' },
  { kind: 'kente', no: 'Look 03', name: 'Woven & Regal', note: 'Kente or aso-oke details — a sash, a cap, a trim.' },
  { kind: 'mudcloth', no: 'Look 04', name: 'Earthy Mudcloth', note: 'Quiet, textured, very handsome.', tall: true },
];

const YES = ['Ankara shirts or two-piece sets', 'Dashiki, kaftan or senator styles', 'Adire, aso-oke or kente accents', 'Clean footwear. Good fragrance.'];
const NO = ['Jeans', 'Overly casual outfits', 'Your everyday "it\'s just a Wednesday" fit'];

export function DressCode() {
  const [revealed, setRevealed] = useLocalStorage<boolean>(STORAGE_KEYS.dressRevealed, false);

  return (
    <section id="dress-code" className="relative scroll-mt-16 px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="The dress code" title="Before you ask, yes, there is a dress code." />

      <div className="mx-auto mt-12 max-w-5xl">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="sealed"
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
            >
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-cocoa px-6 py-16 text-center text-cream shadow-lift sm:py-24">
                  <div className="absolute inset-0 grid grid-cols-4 opacity-25 blur-[3px]">
                    {LOOKS.map((l) => (
                      <PrintSwatch key={l.kind} kind={l.kind} className="h-full w-full" />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-cocoa/70 via-cocoa/85 to-cocoa/95" />
                  <div className="relative mx-auto max-w-md">
                    <Shirt className="mx-auto h-8 w-8 text-gold-light" strokeWidth={1.2} />
                    <p className="mt-6 font-serif text-2xl italic leading-snug sm:text-3xl">
                      Your outfit is very important to me.
                    </p>
                    <p className="mt-3 text-[0.95rem] text-cream/75">Click below to find out what I want you to wear.</p>
                    <motion.button
                      type="button"
                      onClick={() => setRevealed(true)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn mt-9 bg-gold px-8 py-3.5 text-cocoa shadow-lift hover:bg-gold-light"
                    >
                      <Sparkles className="h-4 w-4" />
                      Reveal the dress code
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            </motion.div>
          ) : (
            <motion.div key="revealed" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
              {/* Headline */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
                className="relative overflow-hidden rounded-3xl bg-burgundy px-6 py-14 text-center text-cream shadow-lift sm:py-20"
              >
                <div className="absolute inset-x-0 top-0 h-4">
                  <PrintSwatch kind="kente" className="h-full w-full" />
                </div>
                <p className="eyebrow !text-gold-light">The verdict</p>
                <h3 className="mt-5 font-display text-[2.4rem] font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
                  {['AFRICAN', 'PRINTS.'].map((w, i) => (
                    <motion.span
                      key={w}
                      className="inline-block"
                      initial={{ opacity: 0, y: '40%', rotateX: -60 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.25 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w}&nbsp;
                    </motion.span>
                  ))}
                  <motion.span
                    className="mt-1 block font-serif text-[1.9rem] font-normal italic tracking-normal text-blush sm:text-5xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75, duration: 0.8 }}
                  >
                    Thoughtfully styled.
                  </motion.span>
                </h3>
                <div className="absolute inset-x-0 bottom-0 h-4">
                  <PrintSwatch kind="kente" className="h-full w-full" />
                </div>
              </motion.div>

              {/* Letter + editorial grid */}
              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
                <motion.div
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                  className="paper hairline relative p-7 sm:p-9"
                >
                  <p className="eyebrow">A note from your stylist</p>
                  <div className="mt-5 space-y-4 font-serif text-[1.18rem] leading-relaxed text-cocoa">
                    <p>
                      I want you to wear something African-inspired. Something with prints. Something you wouldn't
                      normally wear on an ordinary day.
                    </p>
                    <p>
                      Think <em className="text-burgundy">Ankara</em>, <em className="text-burgundy">Adire</em>-inspired
                      prints, traditional pieces, or a beautifully styled African outfit.
                    </p>
                    <p>Dress in something you know I'd love seeing you in.</p>
                    <p className="font-medium text-burgundy">No jeans. No overly casual outfits.</p>
                  </div>
                  <p className="mt-6 font-hand text-[0.95rem] leading-loose text-rouge">I want you to make an effort for me.</p>

                  <div className="mt-8 grid gap-5 border-t border-cocoa/10 pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.25em] text-cocoa-muted">Yes, please</p>
                      <ul className="mt-3 space-y-2 text-sm text-cocoa">
                        {YES.map((y) => (
                          <li key={y} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {y}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.25em] text-cocoa-muted">Absolutely not</p>
                      <ul className="mt-3 space-y-2 text-sm text-cocoa">
                        {NO.map((n) => (
                          <li key={n} className="flex gap-2">
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-rouge" /> {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Editorial lookbook */}
                <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                  <div className="flex items-baseline justify-between border-b border-cocoa/15 pb-3">
                    <p className="font-display text-2xl italic text-burgundy">The Lookbook</p>
                    <p className="text-[0.62rem] uppercase tracking-[0.25em] text-cocoa-muted">Issue Nº 11 · Nov</p>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    {LOOKS.map((look, i) => (
                      <motion.figure
                        key={look.kind}
                        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -6 }}
                        className={`group ${i % 2 === 1 ? 'mt-10' : ''}`}
                      >
                        <div
                          className={`relative overflow-hidden rounded-[1.25rem] shadow-paper ${
                            look.tall ? 'aspect-[3/4.2]' : 'aspect-[3/3.6]'
                          }`}
                        >
                          <PrintSwatch
                            kind={look.kind}
                            className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent" />
                          <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-cocoa">
                            {look.no}
                          </span>
                          <p className="absolute bottom-3 left-4 font-display text-xl italic text-cream">{look.name}</p>
                        </div>
                        <figcaption className="mt-2.5 px-1 text-[0.8rem] leading-snug text-cocoa-light">{look.note}</figcaption>
                      </motion.figure>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setRevealed(false)}
                  className="text-xs text-cocoa-muted underline-offset-4 hover:text-burgundy hover:underline"
                >
                  Seal it again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
