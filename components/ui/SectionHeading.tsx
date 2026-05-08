import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/20 bg-accent/5">
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse-soft" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.1] text-white">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-white/60 mt-3 text-base sm:text-lg leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
