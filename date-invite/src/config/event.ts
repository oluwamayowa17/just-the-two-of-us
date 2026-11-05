/**
 * All of the date's details live here. Change anything in this file and
 * the whole site updates — countdown, invitation card, itinerary, footer.
 */
export const EVENT = {
  title: 'A Day Made Just for Us',
  subtitle: 'An entire day, intentionally planned, just for you and me.',

  /** Shown on the invitation card. */
  dateLabel: 'Wednesday, November 11, 2026',
  dayName: 'Wednesday',
  timeLabel: '10:00 AM – 5:00 PM',
  arrivalLabel: '10:00 AM',
  location: 'Lagos Sneaker Club',
  city: 'Lagos',

  /**
   * The exact moment the countdown counts down to.
   * Written as an ISO string WITH the venue's UTC offset so it is correct
   * no matter which timezone the visitor's phone is set to.
   * Lagos (West Africa Time) is UTC+01:00 all year — no daylight saving.
   */
  startsAt: '2026-11-11T10:00:00+01:00',
  endsAt: '2026-11-11T17:00:00+01:00',
  timezoneLabel: 'Lagos time (WAT)',
} as const;

/** Keys used for localStorage. Bump the version to reset everyone's progress. */
export const STORAGE_KEYS = {
  opened: 'dmjfu:v1:opened',
  rsvp: 'dmjfu:v1:rsvp',
  assignments: 'dmjfu:v1:assignments',
  dressRevealed: 'dmjfu:v1:dress-revealed',
} as const;
