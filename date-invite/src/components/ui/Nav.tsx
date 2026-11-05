import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MusicToggle } from './MusicToggle';

const LINKS = [
  { href: '#invitation', label: 'Invitation' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#dress-code', label: 'Dress code' },
  { href: '#assignments', label: 'Assignments' },
  { href: '#itinerary', label: 'The day' },
  { href: '#together', label: 'Together' },
  { href: '#secret', label: 'A secret' },
];

interface NavProps {
  playing: boolean;
  onToggleMusic: () => void;
}

export function Nav({ playing, onToggleMusic }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-cocoa/10 bg-cream/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-display text-lg italic text-burgundy">
            <Heart className="h-4 w-4 fill-burgundy" strokeWidth={0} />
            <span>just for us</span>
          </a>
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-[0.8rem] tracking-wide text-cocoa-light transition hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-burgundy after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <MusicToggle playing={playing} onToggle={onToggleMusic} />
            <button
              type="button"
              className="rounded-full p-2 text-burgundy lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-lg italic text-burgundy">just for us</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-burgundy">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-burgundy"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="pb-10 text-center font-script text-xl text-gold">see you Wednesday</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
