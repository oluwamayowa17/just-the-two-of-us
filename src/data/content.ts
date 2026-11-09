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
  /** Optional italic line shown under the title. */
  subtitle?: string;
  /** Optional gentle reminder shown in a soft callout. */
  reminder?: string;
}

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'letter',
    number: '01',
    title: 'A Letter to My Favourite Person',
    kicker: 'A little something from your heart',
    body: [
      "Write me a little letter. Nothing too formal, and definitely no vows.",
      'Tell me something you appreciate about us, something about me that makes you smile, and something you wish I knew.',
      'It can be sweet, funny, sentimental, or a little bit of everything.',
      'Bring it with you and read it to me when we meet.',
    ],
    note: 'No pressure to make it perfect. Just make it yours.',
  },
  {
    id: 'memories',
    number: '02',
    title: 'The Memory Test',
    kicker: 'Three little time machines',
    body: ['Prepare three memories of us:'],
    list: [
      'Your favourite memory',
      'The funniest memory',
      'One memory you wish you could relive',
    ],
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
  {
    id: 'grow',
    number: '05',
    title: 'A Little Room to Grow',
    kicker: 'Growing, together',
    subtitle:
      'Because loving each other also means helping each other become better.',
    body: [
      "We're both growing, learning, and becoming the people we want to be.",
      "For this assignment, I want you to think about one thing you'd love for me to work on or improve.",
      'It could be something personal, something related to my goals, a habit, something that would help me grow, or something that could make our relationship even better.',
      'Think about it with love, kindness, and honesty.',
      'Come prepared to share it with me on Wednesday.',
    ],
    note: "And yes, I'll be sharing mine with you too.",
    reminder:
      "This isn't about criticism, pointing out flaws, or changing who we are. It's about supporting each other's growth and becoming better versions of ourselves.",
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
  // The basics (he should know these…)
  "What's my go-to order when we eat out?",
  'What is my favourite colour?',
  'What is my comfort food after a long day?',
  'What is my favourite movie or series to rewatch?',
  'Which song do I play on repeat right now?',
  'What is my favourite season, and why?',
  'What is my go-to drink?',
  'What is my favourite thing to do on a free day?',
  'What snack can I never say no to?',
  'Which of my friends would I call first with big news?',

  // My little ways
  'Which of my habits secretly makes you smile?',
  'What is my most-used phrase or word?',
  'What do I always do when I am nervous?',
  'What is the one thing that instantly ruins my mood?',
  'What is the one thing that instantly makes my day better?',
  'Am I a morning person or a night owl?',
  'What do I do first when I wake up?',
  'What am I most likely to spend money on?',
  'What is my biggest pet peeve?',
  'What face do I make when I am pretending not to be upset?',

  // Me, deeper
  'What do you think I was like as a child?',
  'What is one dream I have that you believe in?',
  'What am I most proud of in my life so far?',
  'What is something I am secretly scared of?',
  'Who has had the biggest influence on who I am?',
  'What makes me feel most appreciated?',
  'What is my love language?',
  'What is one thing on my bucket list?',
  'What would I do if money did not matter?',
  'What is something I am working hard on right now?',

  // Us
  'What was your very first impression of me?',
  'Who said "I like you" first — honestly?',
  'What was our first proper date?',
  'What is one thing I do that makes you feel loved?',
  'What is my favourite memory of us?',
  "What's the most \"us\" thing we've ever done?",
  'What song would play if our relationship was a film?',
  'What was the first gift I ever gave you?',
  'Who apologises first after a disagreement?',
  'What is the sweetest thing I have ever done for you?',

  // Just for fun
  'If we swapped lives for a day, what would you do first?',
  'Where would I choose to go on a dream holiday?',
  'If I were an animal, what would I be?',
  'If I won a million dollars tomorrow, what is the first thing I would buy?',
  'Which celebrity do I think you look like?',
  'Which reality show would I secretly win?',
  'What would my superpower be?',
  'If I had a warning label, what would it say?',
  'What would I name our first pet?',
  'If I wrote a book about my life, what would the title be?',
];

export const JAR_QUESTIONS: string[] = [
  // Where it all started
  'What moment made you realise you really liked me?',
  'What was your very first thought when you saw me?',
  'What is one thing about me that surprised you once you got to know me?',
  'What did you tell your friends about me in the beginning?',
  'When did you first know this was something special?',

  // Us, right now
  "What's a small thing about us you never want to change?",
  'When do you feel closest to me?',
  'What do you think we do best as a couple?',
  'What is your favourite thing we do together that costs nothing?',
  'What is one little habit of mine you secretly love?',
  'What is something I do that makes you feel really loved?',
  'When was the last time I made you really proud?',
  'What is one way I make your life easier?',
  "What's one thing you've learned from me?",
  'If you had to describe us in three words, what would they be?',

  // The soft ones
  "What's a dream you haven't said out loud yet?",
  'What is something you have always wanted to tell me but never found the right moment?',
  'What does home feel like to you?',
  'What is one thing you need more of from me?',
  'When you are having a hard day, what is the best thing I can do for you?',
  'What is a fear you have that you rarely talk about?',
  'What part of your childhood do you hope we can give our future family?',
  'What is one memory of us you replay when you miss me?',
  'What does being loved well look like to you?',
  'What is something about yourself you are proud of but never brag about?',

  // The future
  'Where do you see us in five years?',
  'What is something new you want us to try this year?',
  'Where in the world do you want us to wake up together one day?',
  'What would our dream home have that no other house has?',
  'What tradition do you want us to start together?',
  'What is one goal you want us to chase together?',
  'What do you think we will laugh about when we are old?',

  // The fun ones
  'What made you laugh the hardest this month?',
  'What would our first dance song be?',
  'If today had a title, what would it be?',
  'If we were a Nollywood movie, what would it be called?',
  'Who is the better cook between us? Be honest.',
  'Whose jollof is winning in our future home?',
  'What is the most "us" thing we have ever done?',
  'If we were stranded on an island, who would survive longer?',
  'What would my name be in your phone if you could only use emojis?',
  'What is the funniest argument we have ever had?',
  'If we swapped lives for a day, what would you do first?',
  'Which of us is more dramatic? Defend your answer.',
  'What would our couple name be?',
  'What song would play every time I walk into a room?',
  'If we opened a business together, what would it be?',
  'What is the most random thing that reminds you of me?',

  // The last one in the jar
  'What is one thing you want me to always remember about how you feel about me?',
  'If you could relive one day with me, which one would it be?',
];

export const BUCKET_LIST_PROMPTS: string[] = [
  'A trip neither of us has taken before',
  'Cook a three-course meal together',
  'Watch a sunrise somewhere beautiful',
  'Learn a dance — properly',
  'A spontaneous weekend away',
  'Something we are both a little scared of',
];
