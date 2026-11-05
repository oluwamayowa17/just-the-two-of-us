import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useEffect } from 'react';
import { STORAGE_KEYS } from './config/event';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAmbientMusic } from './hooks/useAmbientMusic';
import { Nav } from './components/ui/Nav';
import { MusicToggle } from './components/ui/MusicToggle';
import { Landing } from './components/sections/Landing';
import { Invitation } from './components/sections/Invitation';
import { Countdown } from './components/sections/Countdown';
import { Rsvp } from './components/sections/Rsvp';
import { DressCode } from './components/sections/DressCode';
import { Assignments } from './components/sections/Assignments';
import { Itinerary } from './components/sections/Itinerary';
import { Activities } from './components/sections/Activities';
import { SecretMessage } from './components/sections/SecretMessage';
import { Footer } from './components/sections/Footer';

export default function App() {
  const [opened, setOpened] = useLocalStorage<boolean>(STORAGE_KEYS.opened, false);
  const { playing, toggle } = useAmbientMusic();

  // Keep him on the envelope until it's opened.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
  }, [opened]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    window.setTimeout(() => {
      document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
    }, 2300);
  };

  return (
    <MotionConfig reducedMotion="user">
      {opened ? (
        <Nav playing={playing} onToggleMusic={toggle} />
      ) : (
        <div className="fixed right-4 top-4 z-40">
          <MusicToggle playing={playing} onToggle={toggle} />
        </div>
      )}

      <main>
        <Landing opened={opened} onOpen={open} />

        <AnimatePresence>
          {opened && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
              <Invitation />
              <Countdown />
              <Rsvp />
              <DressCode />
              <Assignments />
              <Itinerary />
              <Activities />
              <SecretMessage />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
