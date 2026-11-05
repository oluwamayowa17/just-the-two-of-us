import type { LucideIcon } from 'lucide-react';
import {
  DoorOpen,
  Gem,
  Sandwich,
  Puzzle,
  Palette,
  Music2,
  Popcorn,
  Gift,
  MoonStar,
} from 'lucide-react';

export interface Assignment {
  id: string;
  number: string;
  title: string;
  kicker: string;
  body: string[];
  list?: string[];
  note?: string;
}

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'vow',
    number: '01',
    title: 'The Wedding Vow',
    kicker: 'The serious one. Sort of.',
    body: [
      "Imagine we're getting married.",
      'I want you to write a vow for me. Something sweet, funny, meaningful, emotional, or all of the above.',
      'You will read it to me when we meet.',
      'And yes, I expect you to put some thought into it.',
    ],
  },
  {
    id: 'memories',
    number: '02',
    title: 'The Memory Test',
    kicker: 'Three little time machines',
    body: ['Prepare three memories of us:'],
    list: ['Your favourite memory', 'The funniest memory', 'One memory you wish you could relive'],
    note: 'Keep them to yourself until we meet.',
  },
  {
    id: 'soundtrack',
    number: '03',
    title: 'The Soundtrack',
    kicker: 'Our song, chosen by you',
    body: [
      'Choose one song that reminds you of me or our relationship.',
      "Don't tell me which song until Wednesday.",
      'I want to hear it when we meet.',
    ],
  },
  {
    id: 'future',
    number: '04',
    title: 'The Future',
    kicker: 'A little list for later',
    body: [
      'Write down three things you want us to experience together in the future.',
      'They can be little things, big things, random adventures, or places you want us to visit.',
    ],
  },
];

export interface ItineraryItem {
  time: string;
  title: string;
  note?: string;
  icon: LucideIcon;
}

export const ITINERARY: ItineraryItem[] = [
  { time: '10:00 AM', title: 'The Arrival', note: 'Come in, settle down, and prepare for the day.', icon: DoorOpen },
  { time: '10:30 AM', title: 'The Little Ceremony', note: "It's time to read your vow.", icon: Gem },
  { time: '11:00 AM', title: 'Our Picnic', note: 'Good food, good company, and absolutely no rushing.', icon: Sandwich },
  { time: '12:00 PM', title: 'The Couple Games', note: "Let's see how well we actually know each other.", icon: Puzzle },
  { time: '1:00 PM', title: 'The Creative Hour', note: "Something fun, something silly, something we'll remember.", icon: Palette },
  { time: '2:00 PM', title: 'Just Us', note: 'Conversations, music, and quality time.', icon: Music2 },
  { time: '3:00 PM', title: 'Movie Time', note: 'Get comfortable. We have a movie and ice cream waiting.', icon: Popcorn },
  { time: '4:30 PM', title: 'The Closing Moment', note: 'One final little surprise before we call it a day.', icon: Gift },
  { time: '5:00 PM', title: 'Until Next Time', icon: MoonStar },
];

export const COUPLE_QUESTIONS: string[] = [
  'What was your very first impression of me?',
  'Which of my habits secretly makes you smile?',
  "What's my go-to order when we eat out?",
  'If we swapped lives for a day, what would you do first?',
  'What song would play if our relationship was a film?',
  'What is one thing I do that makes you feel loved?',
  'Where would I choose to go on a dream holiday?',
  "What's the most \"us\" thing we've ever done?",
  'Who said "I like you" first — honestly?',
  'What do you think I was like as a child?',
];

export const JAR_QUESTIONS: string[] = [
  'What moment made you realise you really liked me?',
  "What's a small thing about us you never want to change?",
  'What does a perfect lazy Sunday with me look like?',
  'What is something new you want us to try this year?',
  'What do you think we do best as a couple?',
  "What's a dream you haven't said out loud yet?",
  'When do you feel closest to me?',
  "What's one thing you've learned from me?",
  'Where do you see us in five years?',
  'What made you laugh the hardest this month?',
  'What would our first dance song be?',
  'If today had a title, what would it be?',
];

export const BUCKET_LIST_PROMPTS: string[] = [
  'A trip neither of us has taken before',
  'Cook a three-course meal together',
  'Watch a sunrise somewhere beautiful',
  'Learn a dance — properly',
  'A spontaneous weekend away',
  'Something we are both a little scared of',
];
