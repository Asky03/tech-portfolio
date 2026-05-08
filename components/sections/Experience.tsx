import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title={<>Where I&apos;ve <em className="italic gradient-text">put hands</em> on real work.</>}
        />

        <div className="relative max-w-3xl">
          {/* Timeline rail */}
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent" />

          <div className="space-y-8">
            {experience.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <div className="relative pl-10 sm:pl-12">
                  <span className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-ink-900 shadow-[0_0_0_4px_rgba(124,140,255,0.12)]" />

                  <div className="glass rounded-xl p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-white font-display text-xl">{item.role}</h3>
                      <span className="text-xs font-mono text-white/45">{item.period}</span>
                    </div>
                    <div className="text-sm text-accent mb-3">
                      {item.org}
                      {item.location ? ` · ${item.location}` : ''}
                    </div>
                    <ul className="space-y-2 text-sm text-white/75 leading-relaxed">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-accent mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/65 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/35 mt-6 max-w-2xl">
          ↑ Replace placeholder entries in <code className="font-mono text-white/55">data/experience.ts</code>{' '}
          with your real internships, club roles, or project leadership.
        </p>
      </div>
    </section>
  );
}
