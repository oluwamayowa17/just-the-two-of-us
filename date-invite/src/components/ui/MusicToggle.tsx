import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

interface MusicToggleProps {
  playing: boolean;
  onToggle: () => void;
}

export function MusicToggle({ playing, onToggle }: MusicToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Turn background music off' : 'Turn background music on'}
      className="group inline-flex items-center gap-2 rounded-full border border-cocoa/15 bg-cream-light/80 px-3.5 py-2 text-xs text-cocoa-light backdrop-blur transition hover:border-burgundy/40 hover:text-burgundy"
    >
      {playing ? <Music className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{playing ? 'Music on' : 'Music off'}</span>
      {playing && (
        <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded bg-burgundy"
              animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </span>
      )}
    </button>
  );
}
