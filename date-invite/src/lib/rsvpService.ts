/**
 * RSVP integration layer.
 *
 * This site has no backend. The RSVP is ALWAYS saved locally (localStorage)
 * on his device. Getting it to *you* needs one of two things:
 *
 *   1. EmailJS configured (VITE_EMAILJS_* env vars) → sent automatically.
 *   2. Otherwise → a mailto: link that opens his email app with a
 *      pre-written message. Nothing is sent until he presses Send himself.
 *
 * The UI never claims an email was delivered unless EmailJS returns 200.
 */
import { EVENT } from '../config/event';

export type RsvpAnswer = 'yes' | 'maybe';

export interface RsvpRecord {
  answer: RsvpAnswer;
  respondedAt: string; // ISO
  notified?: boolean; // true only when EmailJS confirmed delivery
}

const env = import.meta.env;
const EMAILJS = {
  serviceId: (env.VITE_EMAILJS_SERVICE_ID as string | undefined)?.trim(),
  templateId: (env.VITE_EMAILJS_TEMPLATE_ID as string | undefined)?.trim(),
  publicKey: (env.VITE_EMAILJS_PUBLIC_KEY as string | undefined)?.trim(),
};
/** Where his answer goes. Override with VITE_RSVP_EMAIL if you ever need to. */
const DEFAULT_RSVP_EMAIL = 'ogungburemayowa2019@gmail.com';
const RSVP_EMAIL = (env.VITE_RSVP_EMAIL as string | undefined)?.trim() || DEFAULT_RSVP_EMAIL;

export type RsvpChannel = 'emailjs' | 'mailto';

export const rsvpChannel: RsvpChannel =
  EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey ? 'emailjs' : 'mailto';

export const hasRecipientEmail = RSVP_EMAIL.length > 0;

function messageFor(answer: RsvpAnswer) {
  return answer === 'yes'
    ? {
        subject: `It's a YES 💌 — ${EVENT.title}`,
        body: [
          'My love,',
          '',
          "I opened the envelope, I read every word, and I'm officially saying YES.",
          '',
          `Consider me booked for an entire day with you:`,
          `📅 ${EVENT.dateLabel}`,
          `🕙 ${EVENT.timeLabel}`,
          `📍 ${EVENT.location}`,
          '',
          "I'll be there on time, dressed in my best African print (no jeans, I promise), with my vow, my three memories, our song and my list for the future.",
          '',
          "Thank you for planning all of this. I can't wait.",
          '',
          'Yours, always ❤️',
        ].join('\n'),
      }
    : {
        subject: `Almost a yes… 🥺 — ${EVENT.title}`,
        body: [
          'My love,',
          '',
          `I've seen the invitation and my heart is already saying yes. I just need to confirm a couple of things for ${EVENT.dateLabel}.`,
          '',
          "I'll give you my final answer very soon. Please don't give my spot to anyone else.",
          '',
          'Yours ❤️',
        ].join('\n'),
      };
}

/** A mailto: URL he can tap to send you his answer himself. */
export function buildMailto(answer: RsvpAnswer): string {
  const { subject, body } = messageFor(answer);
  const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${encodeURIComponent(RSVP_EMAIL)}?${q}`;
}

/**
 * Try to notify automatically. Resolves to true ONLY when the email service
 * confirms it was accepted. Resolves false when unconfigured or on failure.
 */
export async function notifyRsvp(record: RsvpRecord): Promise<boolean> {
  if (rsvpChannel !== 'emailjs') return false;
  const { subject, body } = messageFor(record.answer);
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId,
        template_id: EMAILJS.templateId,
        user_id: EMAILJS.publicKey,
        template_params: {
          subject,
          message: body,
          answer: record.answer,
          responded_at: new Date(record.respondedAt).toLocaleString(),
          event_title: EVENT.title,
          event_date: EVENT.dateLabel,
          to_email: RSVP_EMAIL,
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
