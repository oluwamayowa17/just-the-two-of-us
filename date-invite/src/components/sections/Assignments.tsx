import { AnimatePresence, motion } from 'framer-motion';
import { Check, Feather, Hourglass, Music4, Telescope } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { EVENT, STORAGE_KEYS } from '../../config/event';
import { ASSIGNMENTS, type Assignment } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

type Done = Record<string, boolean>;

function Rings({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <circle cx="48" cy="46" r="22" fill="none" stroke="#B8954F" strokeWidth="4" />
      <circle cx="72" cy="46" r="22" fill="none" stroke="#D4B77A" strokeWidth="4" />
      <path d="M48 24l-5-7h10z" fill="#E8C4BC" stroke="#B8954F" strokeWidth="1" />
      <path d="M90 14s-5-3-5-6.2a2.6 2.6 0 0 1 5-1.1 2.6 2.6 0 0 1 5 1.1C95 11 90 14 90 14z" fill="#A23B3B" />
      <path d="M22 18s-3.5-2-3.5-4.3a1.8 1.8 0 0 1 3.5-.8 1.8 1.8 0 0 1 3.5.8c0 2.3-3.5 4.3-3.5 4.3z" fill="#E8C4BC" />
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  vow: <Rings className="h-16 w-24" />,
  memories: <Hourglass className="h-9 w-9 text-gold" strokeWidth={1.1} />,
  soundtrack: <Music4 className="h-9 w-9 text-gold" strokeWidth={1.1} />,
  future: <Telescope className="h-9 w-9 text-gold" strokeWidth={1.1} />,
};

function ProgressRing({ value, total }: { value: number; total: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const pct = total ? value / total : 0;
  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#EFE2CF" strokeWidth="5" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#6B1E2E"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl text-burgundy">
          {value}/{total}
        </span>
        <span className="text-[0.55rem] uppercase tracking-[0.2em] text-cocoa-muted">done</span>
      </div>
    </div>
  );
}

function AssignmentCard({
  a,
  done,
  onToggle,
  index,
}: {
  a: Assignment;
  done: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        layout
        whileHover={{ y: -5 }}
        className={`paper relative flex h-full flex-col overflow-hidden border p-6 transition-colors duration-500 sm:p-8 ${
          done ? 'border-burgundy/30' : 'border-cocoa/10'
        }`}
      >
        {/* stamp when complete */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 1.6, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="pointer-events-none absolute bottom-20 right-5 rounded-md bg-cream-light/60 border-2 border-rouge/70 px-3 py-1 font-display text-sm font-bold uppercase tracking-[0.2em] text-rouge/80"
            >
              Completed
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-5xl leading-none text-blush">{a.number}</p>
            <p className="eyebrow mt-3">{a.kicker}</p>
            <h3 className="mt-1.5 font-display text-2xl text-burgundy sm:text-[1.7rem]">{a.title}</h3>
          </div>
          <div className="shrink-0 pt-1">{ICONS[a.id] ?? <Feather className="h-9 w-9 text-gold" />}</div>
        </div>

        <div className="mt-5 flex-1 space-y-3 font-serif text-[1.12rem] leading-relaxed text-cocoa">
          {a.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {a.list && (
            <ul className="space-y-1.5 pl-1">
              {a.list.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {a.note && <p className="font-hand text-sm leading-loose text-rouge">{a.note}</p>}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-cocoa/15 pt-5">
          <label className="group flex cursor-pointer items-center gap-3 text-sm text-cocoa-light">
            <input type="checkbox" checked={done} onChange={onToggle} className="peer sr-only" />
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md border transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-gold ${
                done ? 'border-burgundy bg-burgundy text-cream' : 'border-cocoa/30 bg-cream-light group-hover:border-burgundy'
              }`}
            >
              <AnimatePresence>
                {done && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            {done ? 'Done — thank you' : 'Mark as done'}
          </label>
          {!done && (
            <button type="button" onClick={onToggle} className="btn-ghost px-4 py-2 text-xs">
              I have completed this
            </button>
          )}
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Assignments() {
  const [done, setDone] = useLocalStorage<Done>(STORAGE_KEYS.assignments, {});
  const total = ASSIGNMENTS.length;
  const count = ASSIGNMENTS.filter((a) => done[a.id]).length;
  const all = count === total;

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <section id="assignments" className="relative scroll-mt-16 bg-cream-dark/40 px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Homework, but make it romantic"
        title={`Your assignments before ${EVENT.dayName}`}
        subtitle="I need you to complete a few little things before you arrive. Don't worry, it's nothing too serious. Or maybe it is."
      />

      <Reveal delay={0.1} className="mx-auto mt-12 flex max-w-md items-center gap-6 rounded-2xl border border-cocoa/10 bg-cream-light/70 p-5">
        <ProgressRing value={count} total={total} />
        <div className="flex-1">
          <p className="text-[0.62rem] uppercase tracking-[0.25em] text-cocoa-muted">Your progress</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-dark">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rouge to-burgundy"
              animate={{ width: `${(count / total) * 100}%` }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <p className="mt-2.5 font-serif text-lg italic text-cocoa">
            {all
              ? 'All done. Look at you, overachiever.'
              : count === 0
                ? "Haven't started? I'm watching."
                : `${total - count} more to go. You're doing so well.`}
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {ASSIGNMENTS.map((a, i) => (
          <AssignmentCard key={a.id} a={a} index={i} done={!!done[a.id]} onToggle={() => toggle(a.id)} />
        ))}
      </div>

      <AnimatePresence>
        {all && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-12 text-center font-script text-3xl text-burgundy"
          >
            Gold star. Now bring it all on {EVENT.dayName}. ✦
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
