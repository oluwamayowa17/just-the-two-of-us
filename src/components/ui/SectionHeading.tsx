import { Reveal } from './Reveal';
import { Flourish } from './Flourish';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', tone = 'light' }: SectionHeadingProps) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-[2.1rem] leading-[1.08] sm:text-5xl ${
          dark ? 'text-cream' : 'text-burgundy'
        }`}
      >
        {title}
      </h2>
      <Flourish className={`mt-5 h-3 w-28 ${centered ? 'mx-auto' : ''} ${dark ? 'text-gold-light' : 'text-gold'}`} />
      {subtitle && (
        <p className={`mt-5 font-serif text-xl italic leading-relaxed ${dark ? 'text-cream/80' : 'text-cocoa-light'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
