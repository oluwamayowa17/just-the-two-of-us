import { motion } from 'framer-motion';
import { ITINERARY } from '../../data/content';
import { EVENT } from '../../config/event';
import { SectionHeading } from '../ui/SectionHeading';

export function Itinerary() {
  return (
    <section id="itinerary" className="relative scroll-mt-16 px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow={`${EVENT.dateLabel} · ${EVENT.location}`}
        title="What's in store for us?"
        subtitle="No meetings. No rushing. Just a slow, lovely day in little chapters."
      />

      <div className="relative mx-auto mt-16 max-w-4xl">
        {/* the thread */}
        <div className="absolute bottom-6 left-[1.3rem] top-6 w-px bg-gradient-to-b from-gold via-rouge/50 to-gold md:left-1/2" />

        <ol className="space-y-8 md:space-y-4">
          {ITINERARY.map((item, i) => {
            const left = i % 2 === 0;
            const last = i === ITINERARY.length - 1;
            const Icon = item.icon;
            return (
              <motion.li
                key={item.time}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[2.6rem_1fr] gap-4 md:grid-cols-[1fr_3.5rem_1fr] md:gap-6"
              >
                {/* node */}
                <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                  <span
                    className={`flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full border shadow-paper ${
                      last ? 'border-burgundy bg-burgundy text-cream' : 'border-gold/50 bg-cream-light text-burgundy'
                    }`}
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
                  </span>
                </div>

                <motion.div
                  whileHover={{ y: -4, rotate: left ? -0.4 : 0.4 }}
                  className={`paper hairline p-5 sm:p-6 md:row-start-1 ${
                    left ? 'md:col-start-1 md:text-right' : 'md:col-start-3'
                  } ${last ? '!bg-burgundy text-cream' : ''}`}
                >
                  <p className={`font-script text-xl ${last ? 'text-gold-light' : 'text-rouge'}`}>{item.time}</p>
                  <h3 className={`mt-0.5 font-display text-2xl ${last ? 'text-cream' : 'text-burgundy'}`}>{item.title}</h3>
                  {item.note && (
                    <p className={`mt-2 font-serif text-[1.08rem] italic leading-relaxed ${last ? 'text-cream/80' : 'text-cocoa-light'}`}>
                      {item.note}
                    </p>
                  )}
                  {last && <p className="mt-2 font-hand text-xs leading-loose text-blush">…but not goodbye x</p>}
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
