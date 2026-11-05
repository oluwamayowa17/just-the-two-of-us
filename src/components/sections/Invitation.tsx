import { motion } from 'framer-motion';
import { CalendarHeart, Clock, MapPin } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { Flourish } from '../ui/Flourish';
import { EVENT } from '../../config/event';

export function Invitation() {
  return (
    <section id="invitation" className="relative scroll-mt-16 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow">The official part</p>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-[1.65rem] leading-snug text-cocoa sm:text-4xl">
            You have officially been invited to spend an <em className="text-burgundy">entire day</em> with me.
          </p>
          <p className="mt-5 font-script text-2xl text-rouge sm:text-3xl">
            And yes, I have put a ridiculous amount of thought into this.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <motion.article
            whileHover={{ rotate: 0, y: -4 }}
            initial={{ rotate: -1.2 }}
            className="paper relative mx-auto max-w-xl p-2 shadow-lift"
          >
            <div className="rounded-xl border border-gold/50 p-1.5">
              <div className="rounded-lg border border-gold/30 px-6 py-10 text-center sm:px-12 sm:py-14">
                <p className="eyebrow">Admit one · my favourite person</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-burgundy sm:text-5xl">
                  {EVENT.title}
                </h2>
                <p className="mt-3 font-serif text-lg italic text-cocoa-light">{EVENT.subtitle}</p>
                <Flourish className="mx-auto my-8 h-3 w-24 text-gold" />

                <dl className="grid gap-6 text-left sm:grid-cols-3 sm:text-center">
                  {[
                    { icon: CalendarHeart, label: 'When', value: EVENT.dateLabel },
                    { icon: Clock, label: 'Time', value: EVENT.timeLabel },
                    { icon: MapPin, label: 'Where', value: EVENT.location },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 sm:flex-col sm:items-center sm:gap-2">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
                      <div>
                        <dt className="text-[0.65rem] uppercase tracking-[0.25em] text-cocoa-muted">{label}</dt>
                        <dd className="mt-1 font-serif text-lg leading-snug text-cocoa">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <p className="mt-10 font-hand text-sm text-burgundy">please arrive by {EVENT.arrivalLabel} sharp x</p>
              </div>
            </div>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}
