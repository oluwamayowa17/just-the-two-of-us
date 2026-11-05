import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { EVENT } from '../../config/event';

export function Footer() {
  return (
    <footer className="px-5 py-16 text-center">
      <motion.div
        animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
        className="mx-auto w-fit"
      >
        <Heart className="h-5 w-5 fill-rouge text-rouge" />
      </motion.div>
      <p className="mt-4 font-serif text-xl italic text-cocoa">Made with an unreasonable amount of love and intention.</p>
      <p className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] text-cocoa-muted">
        {EVENT.dateLabel} · {EVENT.location}
      </p>
    </footer>
  );
}
