import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Brush, Dice5, Heart, ListChecks, Palette, Shuffle, Wine } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { BUCKET_LIST_PROMPTS, COUPLE_QUESTIONS, JAR_QUESTIONS } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ActivityCard({
  icon,
  label,
  title,
  blurb,
  children,
  className = '',
}: {
  icon: ReactNode;
  label: string;
  title: string;
  blurb: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`paper hairline flex h-full flex-col p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="eyebrow">{label}</span>
      </div>
      <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-burgundy">{title}</h3>
      <p className="mt-2 font-serif text-[1.08rem] italic leading-relaxed text-cocoa-light">{blurb}</p>
      <div className="mt-6 flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Couple question game                                             */
/* ------------------------------------------------------------------ */
function QuestionGame() {
  const [deck, setDeck] = useState(() => shuffle(COUPLE_QUESTIONS));
  const [index, setIndex] = useState(-1);
  const current = index >= 0 ? deck[index] : null;
  const finished = index >= deck.length - 1;

  const next = () => {
    if (finished) {
      setDeck(shuffle(COUPLE_QUESTIONS));
      setIndex(0);
    } else setIndex((i) => i + 1);
  };

  return (
    <div>
      <div className="relative mx-auto h-56 max-w-sm [perspective:1000px]">
        {/* the stack behind */}
        {[2, 1].map((n) => (
          <div
            key={n}
            className="absolute inset-0 rounded-2xl border border-cocoa/10 bg-cream-dark"
            style={{ transform: `translate(${n * 6}px, ${n * 6}px) rotate(${n * 1.5}deg)` }}
          />
        ))}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ x: -40, rotate: -8, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center shadow-paper ${
              current ? 'border border-gold/40 bg-cream-light' : 'bg-burgundy text-cream'
            }`}
          >
            {current ? (
              <>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cocoa-muted">
                  Question {index + 1} of {deck.length}
                </span>
                <p className="mt-4 font-serif text-[1.45rem] leading-snug text-cocoa">{current}</p>
              </>
            ) : (
              <>
                <span className="font-display text-5xl italic text-blush">?</span>
                <p className="mt-2 font-serif text-xl italic">How well do you know me?</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={next} className="btn-primary px-5 py-2.5 text-xs">
          {index < 0 ? 'Draw the first card' : finished ? 'Shuffle & start again' : 'Next question'}
        </button>
        {index >= 0 && (
          <button
            type="button"
            onClick={() => {
              setDeck(shuffle(COUPLE_QUESTIONS));
              setIndex(-1);
            }}
            aria-label="Reset the deck"
            className="btn-ghost px-3 py-2.5"
          >
            <Shuffle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Paint & Sip                                                      */
/* ------------------------------------------------------------------ */
const PAINT_PALETTES: { name: string; sky: string; sun: string; hill: string; hill2: string; heart: string }[] = [
  { name: 'Sunset', sky: '#F3DDD7', sun: '#D4B77A', hill: '#A23B3B', hill2: '#6B1E2E', heart: '#6B1E2E' },
  { name: 'Lagos dusk', sky: '#EFD9C4', sun: '#C47E5A', hill: '#7A5E50', hill2: '#3B2418', heart: '#A23B3B' },
  { name: 'Garden', sky: '#EDEBDD', sun: '#E8C4BC', hill: '#8FA882', hill2: '#5E7A55', heart: '#A23B3B' },
  { name: 'Midnight', sky: '#D9DCE6', sun: '#F7EFE3', hill: '#2E3C58', hill2: '#26324A', heart: '#E8C4BC' },
];

function PaintAndSip() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const p = PAINT_PALETTES[idx];
  const stroke = (delay: number) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delay, ease: 'easeInOut' as const },
  });

  return (
    <div>
      <div className="space-y-2 font-serif text-[1.05rem] leading-relaxed text-cocoa">
        <p>
          We're going to paint together, enjoy our drinks, and see what happens when we let our creative sides out.
        </p>
        <p>
          It doesn't have to be perfect. <span className="font-script text-[1.35rem] text-rouge">It just has to be ours.</span>
        </p>
      </div>

      <div className="mt-6 grid items-end gap-5 sm:grid-cols-[1.15fr_1fr]">
        {/* The easel + canvas: tap to repaint */}
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % PAINT_PALETTES.length)}
          aria-label={`Repaint the canvas (current palette: ${p.name})`}
          className="group relative mx-auto w-full max-w-[15rem]"
        >
          <svg viewBox="0 0 200 230" className="w-full drop-shadow-sm" aria-hidden="true">
            {/* easel legs */}
            <path d="M60 150 40 226M140 150l20 76M100 150v70" stroke="#7A5E50" strokeWidth="4" strokeLinecap="round" />
            <rect x="34" y="148" width="132" height="7" rx="2" fill="#5C3D2E" />
            {/* canvas */}
            <rect x="38" y="16" width="124" height="134" rx="3" fill="#FBF6EE" stroke="#3B2418" strokeOpacity=".15" />
            <g key={idx}>
              <motion.rect x="46" y="24" width="108" height="118" rx="2" fill={p.sky}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.6 }} />
              <motion.circle cx="124" cy="58" r="15" fill={p.sun}
                initial={{ scale: reduce ? 1 : 0 }} animate={{ scale: 1 }} transition={{ delay: reduce ? 0 : 0.3, type: 'spring', stiffness: 160 }}
                style={{ transformOrigin: '124px 58px' }} />
              <motion.path d="M46 112c18-16 34-20 52-10s36 6 56-8v48H46z" fill={p.hill}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.55, duration: reduce ? 0 : 0.6 }} />
              <motion.path d="M46 126c22-10 42-10 62-2s30 6 46-2v20H46z" fill={p.hill2}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.8, duration: reduce ? 0 : 0.6 }} />
              {/* loose brush strokes */}
              <motion.path d="M56 44c10-6 22-6 30 0" fill="none" stroke="#FBF6EE" strokeWidth="3" strokeLinecap="round" {...stroke(1)} />
              <motion.path d="M62 54c8-4 16-4 22 0" fill="none" stroke="#FBF6EE" strokeWidth="2.4" strokeLinecap="round" {...stroke(1.2)} />
              <motion.path d="M78 96s-8-4.8-8-9.6a4 4 0 0 1 8-1.6 4 4 0 0 1 8 1.6C86 91.2 78 96 78 96z" fill="none" stroke={p.heart} strokeWidth="2.4" strokeLinejoin="round" {...stroke(1.4)} />
            </g>
            {/* paint drips on the ledge */}
            <circle cx="70" cy="152" r="3" fill="#A23B3B" />
            <circle cx="122" cy="152" r="2.4" fill="#D4B77A" />
          </svg>
          <span className="pointer-events-none absolute right-1 top-1 rounded-full bg-cream/90 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.2em] text-cocoa-muted opacity-0 transition group-hover:opacity-100">
            Tap to repaint
          </span>
        </button>

        {/* Palette + two glasses */}
        <div className="flex flex-col items-center gap-5 sm:items-start">
          <div className="relative">
            <svg viewBox="0 0 150 100" className="w-40" aria-hidden="true">
              <path d="M75 6C34 6 6 28 6 54c0 22 20 38 44 38 12 0 14-8 10-16-3-7 2-12 10-12 22 0 74 4 74-22C144 20 112 6 75 6z" fill="#F4E8D8" stroke="#3B2418" strokeOpacity=".15" />
              <ellipse cx="50" cy="72" rx="7" ry="5.5" fill="#FBF6EE" stroke="#3B2418" strokeOpacity=".12" />
            </svg>
            {/* paint blobs are buttons, so he can pick a palette directly */}
            {PAINT_PALETTES.map((pal, i) => {
              const pos = [
                { left: '22%', top: '30%' },
                { left: '42%', top: '16%' },
                { left: '63%', top: '18%' },
                { left: '80%', top: '34%' },
              ][i];
              return (
                <motion.button
                  key={pal.name}
                  type="button"
                  onClick={() => setIdx(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Paint with the ${pal.name} palette`}
                  aria-pressed={idx === i}
                  className={`absolute h-5 w-5 -translate-x-1/2 rounded-full shadow-sm ring-offset-1 ring-offset-cream ${
                    idx === i ? 'ring-2 ring-burgundy' : ''
                  }`}
                  style={{ ...pos, background: `linear-gradient(135deg, ${pal.hill}, ${pal.sun})` }}
                />
              );
            })}
          </div>
          <p className="-mt-2 text-[0.62rem] uppercase tracking-[0.25em] text-cocoa-muted">
            Palette: <span className="text-burgundy">{p.name}</span>
          </p>

          {/* two glasses, gently clinking */}
          <div className="flex items-end gap-1" aria-hidden="true">
            {[0, 1].map((g) => (
              <motion.svg
                key={g}
                viewBox="0 0 40 70"
                className="h-14 w-8"
                animate={reduce ? undefined : { rotate: g === 0 ? [0, 8, 0] : [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
                style={{ transformOrigin: g === 0 ? '50% 100%' : '50% 100%' }}
              >
                <path d="M8 4h24c0 18-4 28-12 30C12 32 8 22 8 4z" fill="#FBF6EE" fillOpacity=".7" stroke="#3B2418" strokeOpacity=".25" />
                <path d="M9.5 14h21c-1 11-5 17-10.5 18-5.5-1-9.5-7-10.5-18z" fill={g === 0 ? '#A23B3B' : '#D4B77A'} fillOpacity=".85" />
                <path d="M20 34v26M12 62h16" stroke="#3B2418" strokeOpacity=".3" strokeWidth="1.5" strokeLinecap="round" />
              </motion.svg>
            ))}
            <span className="mb-10 ml-1 font-script text-lg text-rouge">cheers ♥</span>
          </div>
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
        {[
          { icon: <Palette className="h-3.5 w-3.5" />, t: 'One canvas each' },
          { icon: <Wine className="h-3.5 w-3.5" />, t: 'Something to sip' },
          { icon: <Heart className="h-3.5 w-3.5" />, t: 'Zero judgement' },
        ].map((r) => (
          <li key={r.t} className="inline-flex items-center gap-1.5 rounded-full bg-blush-light px-3 py-1.5 text-xs text-burgundy">
            {r.icon}
            {r.t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Bucket list                                                      */
/* ------------------------------------------------------------------ */
function BucketList() {
  const [shown, setShown] = useState(3);
  const items = BUCKET_LIST_PROMPTS.slice(0, shown);
  return (
    <div className="relative rounded-xl border border-cocoa/10 bg-cream-light px-5 pb-5 pt-4 shadow-paper">
      <div className="absolute bottom-0 left-9 top-0 w-px bg-rouge/30" />
      <p className="pl-7 font-hand text-sm leading-[32px] text-burgundy">Our list ~ things to do together</p>
      <ol className="ruled pl-7">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex h-8 items-center gap-2 font-script text-[1.3rem] text-cocoa"
            >
              <span className="w-5 text-sm text-gold">{i + 1}.</span>
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
        {[0, 1].map((n) => (
          <li key={`blank-${n}`} className="flex h-8 items-center gap-2 font-script text-[1.2rem] text-cocoa-muted/60">
            <span className="w-5 text-sm text-gold/60">{items.length + n + 1}.</span>
            {n === 0 ? 'yours, written on the day…' : ''}
          </li>
        ))}
      </ol>
      {shown < BUCKET_LIST_PROMPTS.length && (
        <button
          type="button"
          onClick={() => setShown((s) => s + 1)}
          className="mt-3 pl-7 text-xs font-medium text-burgundy underline-offset-4 hover:underline"
        >
          + one more idea
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Conversation jar                                                 */
/* ------------------------------------------------------------------ */
const SLIP_COLORS = ['#F3DDD7', '#EFE2CF', '#E8C4BC', '#F7EDE0', '#D4B77A'];

function ConversationJar() {
  const [pulled, setPulled] = useState<string | null>(null);
  const [pool, setPool] = useState(() => shuffle(JAR_QUESTIONS));
  const slips = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        x: 22 + ((i * 37) % 76),
        y: 70 + ((i * 23) % 58),
        r: ((i * 53) % 70) - 35,
        c: SLIP_COLORS[i % SLIP_COLORS.length],
      })),
    [],
  );

  const pull = () => {
    const [q, ...rest] = pool.length ? pool : shuffle(JAR_QUESTIONS);
    setPool(rest.length ? rest : shuffle(JAR_QUESTIONS));
    setPulled(q);
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <motion.button
        type="button"
        onClick={pull}
        whileHover={{ rotate: [-2, 2, -1, 0], transition: { duration: 0.5 } }}
        whileTap={{ scale: 0.96 }}
        aria-label="Pull a question from the jar"
        className="relative w-40 shrink-0"
      >
        <svg viewBox="0 0 120 150" className="w-full drop-shadow-md" aria-hidden="true">
          <rect x="34" y="6" width="52" height="14" rx="3" fill="#B8954F" />
          <rect x="34" y="6" width="52" height="4" rx="2" fill="#D4B77A" />
          <path d="M38 20h44v8c14 6 22 18 22 34v66c0 10-8 18-18 18H34c-10 0-18-8-18-18V62c0-16 8-28 22-34z" fill="#FBF6EE" fillOpacity=".55" stroke="#3B2418" strokeOpacity=".25" strokeWidth="1.5" />
          {slips.map((s, i) => (
            <rect key={i} x={s.x} y={s.y} width="20" height="9" rx="1.5" fill={s.c} stroke="#3B2418" strokeOpacity=".12" transform={`rotate(${s.r} ${s.x + 10} ${s.y + 4})`} />
          ))}
          <path d="M28 50c-4 14-4 50 0 74" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="30" y="86" width="60" height="22" rx="3" fill="#6B1E2E" />
          <text x="60" y="101" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="12" fill="#F7EFE3">talk to me</text>
        </svg>
      </motion.button>

      <div className="min-h-[9rem] flex-1 text-center sm:text-left">
        <AnimatePresence mode="wait">
          {pulled ? (
            <motion.div
              key={pulled}
              initial={{ opacity: 0, y: 30, rotate: -6, scaleY: 0.2 }}
              animate={{ opacity: 1, y: 0, rotate: -1.5, scaleY: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="origin-top rounded-md bg-blush-light px-5 py-5 shadow-paper"
            >
              <p className="font-script text-[1.45rem] leading-snug text-cocoa">{pulled}</p>
            </motion.div>
          ) : (
            <motion.p key="hint" className="font-serif text-lg italic text-cocoa-light" exit={{ opacity: 0 }}>
              A jar full of little folded questions. Tap it to pull one out.
            </motion.p>
          )}
        </AnimatePresence>
        {pulled && (
          <button type="button" onClick={pull} className="mt-4 text-xs font-medium text-burgundy underline-offset-4 hover:underline">
            Pull another
          </button>
        )}
      </div>
    </div>
  );
}

export function Activities() {
  return (
    <section id="together" className="relative scroll-mt-16 bg-cream-dark/40 px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="A sneak peek"
        title="Things we'll do together"
        subtitle="Little previews of what's waiting for us. The real versions happen in person."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2">
        <Reveal>
          <ActivityCard
            icon={<Dice5 className="h-4 w-4" />}
            label="Game 01"
            title="The Couple Question Game"
            blurb="One card at a time. Answer honestly. Points are awarded entirely at my discretion."
          >
            <QuestionGame />
          </ActivityCard>
        </Reveal>
        <Reveal delay={0.08}>
          <ActivityCard
            icon={<Brush className="h-4 w-4" />}
            label="Get creative"
            title="Paint & Sip 🎨"
            blurb="A little creativity, a little colour, a little something to sip on, and a whole lot of fun."
          >
            <PaintAndSip />
          </ActivityCard>
        </Reveal>
        <Reveal delay={0.04}>
          <ActivityCard
            icon={<ListChecks className="h-4 w-4" />}
            label="Together"
            title="Our Relationship Bucket List"
            blurb="We'll write it together, by hand, and keep adding to it for years. Here are a few to get us started."
          >
            <BucketList />
          </ActivityCard>
        </Reveal>
        <Reveal delay={0.12}>
          <ActivityCard
            icon={<span className="text-sm">✦</span>}
            label="Slow conversation"
            title="The Conversation Jar"
            blurb="Questions we don't usually ask on an ordinary day."
          >
            <ConversationJar />
          </ActivityCard>
        </Reveal>
      </div>
    </section>
  );
}
