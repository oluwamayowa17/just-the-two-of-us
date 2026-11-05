import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Dice5, EyeOff, ListChecks, PenLine, RefreshCw, Shuffle, Timer } from 'lucide-react';
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
/* 2. Blind drawing challenge                                          */
/* ------------------------------------------------------------------ */
function DrawingChallenge() {
  const reduce = useReducedMotion();
  const [key, setKey] = useState(0);
  return (
    <div className="grid gap-5 sm:grid-cols-[1fr_1.1fr] sm:items-center">
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        aria-label="Redraw the doodle"
        className="ruled group relative aspect-square overflow-hidden rounded-xl border border-cocoa/10 bg-cream-light"
      >
        <svg key={key} viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          <motion.path
            d="M100 40c-28 0-46 22-44 52 2 26 18 52 44 54 30 2 48-26 46-54-2-30-20-50-46-52m-24 50c6-6 14-6 18 0m22-2c6-6 14-4 18 2m-30 12c-4 8-2 14 6 14m-18 16c10 10 28 10 38-2m-70-48c-10-18-2-40 20-46 18-6 40-4 56 10 12 10 14 24 12 34M80 150c-6 14-14 20-30 26m80-24c8 12 18 18 34 22"
            fill="none"
            stroke="#6B1E2E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
        </svg>
        <span className="absolute bottom-2 right-3 font-hand text-[0.65rem] text-rouge">a masterpiece, clearly</span>
        <span className="absolute left-3 top-2 opacity-0 transition group-hover:opacity-100">
          <RefreshCw className="h-3.5 w-3.5 text-cocoa-muted" />
        </span>
      </button>
      <ul className="space-y-3 text-[0.92rem] text-cocoa">
        {[
          { icon: <EyeOff className="h-4 w-4" />, t: 'Eyes on each other, never on the paper.' },
          { icon: <Timer className="h-4 w-4" />, t: 'Two minutes each. No peeking, no lifting the pen.' },
          { icon: <PenLine className="h-4 w-4" />, t: 'Sign it, date it. We keep both forever.' },
        ].map((r) => (
          <li key={r.t} className="flex gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush-light text-burgundy">
              {r.icon}
            </span>
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
            icon={<PenLine className="h-4 w-4" />}
            label="Game 02"
            title="The Drawing Challenge"
            blurb="We draw each other without looking at the paper. The results will be tragic and I will treasure them."
          >
            <DrawingChallenge />
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
