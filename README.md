# A Day Made Just for Us 💌

A private, interactive date invitation — a digital love letter built with
React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.

**Wednesday, November 11, 2026 · 10:00 AM – 5:00 PM · Lagos Sneaker Club**

---

## What's inside

| Section | What it does |
| --- | --- |
| Landing | Sealed envelope with wax seal; opens and slides out the letter. Music toggle (off by default). |
| Invitation | "You have officially been invited…" plus the formal invitation card. |
| Countdown | Live days/hours/minutes/seconds to 11 Nov 2026, 10:00 AM Lagos time. Switches to "Our little day has arrived." |
| RSVP | Yes → confetti + "YAY!" message. Maybe → playful nudge with a way back to Yes. Status saved in localStorage. |
| Dress code | Dramatic reveal of "AFRICAN PRINTS. THOUGHTFULLY STYLED." with an editorial lookbook of hand-drawn print swatches. |
| Assignments | Four cards with checkboxes, "I have completed this" buttons, a stamp animation and a progress ring. Saved in localStorage. |
| Itinerary | Alternating vertical timeline (single column on mobile). |
| Together | Question card game, blind drawing challenge, bucket list notepad, conversation jar. |
| Secret message | Envelope that opens into a handwritten letter, line by line. |
| Footer | "Made with an unreasonable amount of love and intention." with a beating heart. |

Reduced-motion preferences are respected everywhere (`MotionConfig reducedMotion="user"` + CSS).

---

## Run it locally

You need **Node.js 18 or newer** (https://nodejs.org).

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).
To view it on your phone on the same Wi-Fi: `npm run dev -- --host` and open the "Network" address.

Build for production:

```bash
npm run build     # type-checks, then outputs to /dist
npm run preview   # serves the built site locally
```

**Testing tip:** progress is saved in the browser. To start fresh, open DevTools →
Application → Local Storage and clear the `dmjfu:v1:*` keys (or use a private window).
Before sending him the link, clear it on your own devices so he sees the sealed envelope.

---

## Deploy to Vercel

**Option A — GitHub (recommended)**

1. Push this folder to a new GitHub repository (private is fine).
2. Go to https://vercel.com/new and import the repository.
3. Vercel detects Vite automatically: build command `npm run build`, output `dist`.
4. (Optional) Add environment variables under *Settings → Environment Variables* (see below).
5. Click **Deploy**. Share the `*.vercel.app` link with him.

**Option B — command line**

```bash
npm i -g vercel
vercel          # follow the prompts
vercel --prod
```

**Netlify** works too: `netlify.toml` is included. Drag the `dist` folder onto
https://app.netlify.com/drop, or connect the repository.

The page has `noindex` set so search engines won't list it.

---

## RSVP: how you actually find out his answer

This is a frontend-only site, so the site is honest about it: his answer is
saved **on his device**, and the page never claims you received it unless an
email service confirmed delivery.

Without any setup, after he answers he sees an **"Email her my answer"** button
that opens his email app with a pre-written message. Nothing is sent until he
presses Send.

### Pre-address that email (recommended)

Create `.env.local` (copy `.env.example`) or add on Vercel:

```
VITE_RSVP_EMAIL=you@example.com
```

Note: anything starting with `VITE_` ends up in the public JavaScript, so your
email address will be visible to anyone who inspects the site.

### Send automatically with EmailJS (optional)

1. Create a free account at https://www.emailjs.com.
2. Add an **Email Service** (e.g. Gmail) → copy the *Service ID*.
3. Create an **Email Template**. Use these variables in it:
   `{{subject}}`, `{{message}}`, `{{answer}}`, `{{responded_at}}`, `{{event_title}}`, `{{event_date}}`.
   Set "To email" to your address (or `{{to_email}}`). Copy the *Template ID*.
4. Under *Account → General* copy your **Public Key**.
5. Add to `.env.local` / Vercel:

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

The EmailJS *public* key is designed to be used in browsers. Never put a private
key or password in a `VITE_` variable. In EmailJS, restrict the allowed domain to
your Vercel URL. Redeploy after changing env vars.

If sending fails, the site falls back to the mailto button automatically.

---

## Background music

Off by default. With no setup, the toggle plays a soft, generated ambient chord
loop (no files needed). To use a real song, put an mp3 in `/public` (e.g.
`public/music.mp3`) and set `VITE_MUSIC_URL=/music.mp3`. Only use music you have
the rights to share.

---

## Customising

- **Date, time, venue, countdown target:** `src/config/event.ts`
  (`startsAt` includes the `+01:00` Lagos offset so the countdown is correct in any timezone).
- **Assignments, itinerary, game questions, jar questions, bucket list ideas:** `src/data/content.ts`
- **Colours & fonts:** `tailwind.config.js` and the Google Fonts link in `index.html`
- **Reset everyone's saved progress:** bump `v1` to `v2` in `STORAGE_KEYS`.

## Project structure

```
src/
  App.tsx                 page composition, open state, music
  config/event.ts         all event details
  data/content.ts         assignments, itinerary, questions
  hooks/                  useLocalStorage, useCountdown, useAmbientMusic
  lib/rsvpService.ts      RSVP integration layer (EmailJS / mailto)
  components/ui/          Envelope, WaxSeal, Confetti, FloatingHearts, Nav, ...
  components/sections/    Landing, Invitation, Countdown, Rsvp, DressCode,
                          Assignments, Itinerary, Activities, SecretMessage, Footer
```
