import { AnimatePresence, motion } from 'framer-motion';
import { Check, Clock3, Heart, Info, Mail, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../config/event';
import {
  buildMailto,
  hasRecipientEmail,
  notifyRsvp,
  rsvpChannel,
  type RsvpAnswer,
  type RsvpRecord,
} from '../../lib/rsvpService';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Confetti } from '../ui/Confetti';

type SendState = 'idle' | 'sending' | 'sent' | 'failed';

export function Rsvp() {
  const [rsvp, setRsvp] = useLocalStorage<RsvpRecord | null>(STORAGE_KEYS.rsvp, null);
  const [burst, setBurst] = useState(0);
  const [send, setSend] = useState<SendState>(rsvp?.notified ? 'sent' : 'idle');

  const answer = async (a: RsvpAnswer) => {
    const record: RsvpRecord = { answer: a, respondedAt: new Date().toISOString() };
    setRsvp(record);
    setSend('idle');
    if (a === 'yes') setBurst((n) => n + 1);

    if (rsvpChannel === 'emailjs') {
      setSend('sending');
      const ok = await notifyRsvp(record);
      setSend(ok ? 'sent' : 'failed');
      if (ok) setRsvp({ ...record, notified: true });
    }
  };

  const reset = () => {
    setRsvp(null);
    setSend('idle');
  };

  const when = rsvp ? new Date(rsvp.respondedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '';

  return (
    <section id="rsvp" className="relative scroll-mt-16 px-5 py-24 sm:py-32">
      <Confetti fire={burst} />
      <SectionHeading eyebrow="Répondez s'il vous plaît" title="Will you be joining me for our little date?" />

      <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
        <div className="paper hairline relative overflow-hidden p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {rsvp?.answer === 'yes' ? (
              <motion.div
                key="yes"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-cream shadow-lift"
                >
                  <Heart className="h-7 w-7 fill-cream" strokeWidth={0} />
                </motion.div>
                <p className="mt-6 font-display text-4xl text-burgundy sm:text-5xl">YAY!</p>
                <p className="mx-auto mt-3 max-w-md font-serif text-2xl italic leading-snug text-cocoa">
                  You're officially booked for a day with me. I can't wait.
                </p>
                <p className="mt-4 font-hand text-sm text-rouge">best decision you've made all week x</p>
              </motion.div>
            ) : rsvp?.answer === 'maybe' ? (
              <motion.div
                key="maybe"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-burgundy/30 text-burgundy"
                >
                  <Clock3 className="h-6 w-6" strokeWidth={1.5} />
                </motion.div>
                <p className="mt-6 font-serif text-2xl italic text-cocoa">Hmm. I'll allow it… for now.</p>
                <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-cocoa-light">
                  Confirm soon, please. I've already planned the snacks, the playlist and the outfit — the only
                  thing missing is your yes.
                </p>
                <button type="button" onClick={() => answer('yes')} className="btn-primary mt-7">
                  <Heart className="h-4 w-4 fill-cream" strokeWidth={0} />
                  Okay fine — of course I'm coming
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="ask"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-serif text-xl italic text-cocoa-light">There is really only one correct answer.</p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <motion.button
                    type="button"
                    onClick={() => answer('yes')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary px-7 py-3.5"
                  >
                    <Sparkles className="h-4 w-4" />
                    Of course, I wouldn't miss it
                  </motion.button>
                  <button type="button" onClick={() => answer('maybe')} className="btn-ghost px-7 py-3.5">
                    I need to confirm
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status */}
        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-center gap-3 rounded-xl border border-cocoa/10 bg-cream-light/60 px-4 py-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                rsvp?.answer === 'yes'
                  ? 'bg-burgundy text-cream'
                  : rsvp?.answer === 'maybe'
                    ? 'bg-blush text-burgundy'
                    : 'bg-cream-dark text-cocoa-muted'
              }`}
            >
              {rsvp?.answer === 'yes' ? <Check className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
            </span>
            <div className="text-sm">
              <p className="text-[0.62rem] uppercase tracking-[0.25em] text-cocoa-muted">Your RSVP status</p>
              <p className="font-medium text-cocoa">
                {rsvp?.answer === 'yes'
                  ? 'Confirmed — you are coming'
                  : rsvp?.answer === 'maybe'
                    ? 'Pending — waiting on your yes'
                    : 'Not answered yet'}
                {rsvp && <span className="font-normal text-cocoa-muted"> · {when}</span>}
              </p>
            </div>
          </div>
          {rsvp && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-cocoa-muted hover:text-burgundy"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Change answer
            </button>
          )}
        </div>

        {/* Delivery — honest about what has and hasn't been sent */}
        {rsvp && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-dashed border-gold/50 bg-cream-light/50 p-4 text-sm"
          >
            {rsvpChannel === 'emailjs' && send === 'sending' && (
              <p className="text-cocoa-light">Sending your answer…</p>
            )}
            {rsvpChannel === 'emailjs' && send === 'sent' && (
              <p className="flex items-center gap-2 text-cocoa">
                <Check className="h-4 w-4 text-burgundy" /> Your answer was sent to her.
              </p>
            )}
            {(rsvpChannel === 'mailto' || send === 'failed') && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-cocoa-light">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    {send === 'failed'
                      ? "Automatic sending didn't go through. "
                      : 'Your answer is saved on this device only — it has not been sent to her. '}
                    Tap the button — a little note to her is already written, you just press Send.
                  </span>
                </p>
                <a href={buildMailto(rsvp.answer)} className="btn-ghost shrink-0 px-5 py-2.5">
                  <Mail className="h-4 w-4" /> Email her my answer
                </a>
              </div>
            )}
            {rsvpChannel === 'mailto' && !hasRecipientEmail && import.meta.env.DEV && (
              <p className="mt-3 border-t border-cocoa/10 pt-3 text-xs text-cocoa-muted">
                Setup note (only visible while developing): set <code>VITE_RSVP_EMAIL</code> so the email is
                pre-addressed, or the <code>VITE_EMAILJS_*</code> variables to send RSVPs automatically. See README.
              </p>
            )}
          </motion.div>
        )}
      </Reveal>
    </section>
  );
}
