import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Background music, OFF by default.
 * - If VITE_MUSIC_URL is set, that file loops quietly.
 * - Otherwise a soft, slow chord progression is generated with the
 *   Web Audio API, so the toggle always works with zero assets.
 */
const MUSIC_URL = (import.meta.env.VITE_MUSIC_URL as string | undefined)?.trim();

// Gentle Fmaj7 – Em7 – Dm7 – Cmaj7 progression (Hz)
const CHORDS: number[][] = [
  [174.61, 220.0, 261.63, 329.63],
  [164.81, 196.0, 246.94, 293.66],
  [146.83, 174.61, 220.0, 261.63],
  [130.81, 164.81, 196.0, 246.94],
];
const CHORD_SECONDS = 4;

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const chordIdx = useRef(0);

  const playChord = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    const chord = CHORDS[chordIdx.current % CHORDS.length];
    chordIdx.current += 1;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = (Math.random() - 0.5) * 6;
      const start = now + i * 0.18; // softly arpeggiated
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.05, start + 1.2);
      gain.gain.linearRampToValueAtTime(0.0001, start + CHORD_SECONDS + 1.5);
      osc.connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + CHORD_SECONDS + 1.6);
    });
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    audioRef.current?.pause();
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      window.setTimeout(() => ctx.suspend().catch(() => {}), 900);
    }
    setPlaying(false);
  }, []);

  const start = useCallback(async () => {
    try {
      if (MUSIC_URL) {
        if (!audioRef.current) {
          audioRef.current = new Audio(MUSIC_URL);
          audioRef.current.loop = true;
          audioRef.current.volume = 0.35;
        }
        await audioRef.current.play();
        setPlaying(true);
        return;
      }
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      if (!ctxRef.current) {
        const ctx = new Ctx();
        const master = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1400;
        master.gain.value = 0;
        master.connect(filter).connect(ctx.destination);
        ctxRef.current = ctx;
        masterRef.current = master;
      }
      const ctx = ctxRef.current;
      await ctx.resume();
      masterRef.current!.gain.cancelScheduledValues(ctx.currentTime);
      masterRef.current!.gain.setTargetAtTime(0.9, ctx.currentTime, 0.8);
      playChord();
      timerRef.current = window.setInterval(playChord, CHORD_SECONDS * 1000);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [playChord]);

  const toggle = useCallback(() => (playing ? stop() : void start()), [playing, start, stop]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      audioRef.current?.pause();
      ctxRef.current?.close().catch(() => {});
    },
    [],
  );

  return { playing, toggle };
}
