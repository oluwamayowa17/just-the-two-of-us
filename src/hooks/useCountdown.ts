import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function compute(target: number): CountdownParts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

/** Live countdown to an ISO timestamp (include the UTC offset for accuracy). */
export function useCountdown(isoTarget: string): CountdownParts {
  const target = new Date(isoTarget).getTime();
  const [parts, setParts] = useState(() => compute(target));

  useEffect(() => {
    setParts(compute(target));
    const id = window.setInterval(() => {
      const next = compute(target);
      setParts(next);
      if (next.done) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}
