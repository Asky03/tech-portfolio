'use client';

import { motion } from 'framer-motion';
import { Hammer, Github, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';

export default function CurrentlyBuilding() {
  const building = projects.filter((p) => p.status === 'building');
  if (!building.length) return null;

  return (
    <section id="building" aria-label="Currently building" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Currently Building"
          title={<>Live work — <em className="italic gradient-text">unfinished</em>, on purpose.</>}
          description="Real projects in active development. Honest progress beats polished demos."
        />

        <div className="space-y-5">
          {building.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 grid md:grid-cols-[1.5fr_1fr] gap-6 items-start glow-border"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] uppercase tracking-[0.14em]">
                  <Hammer size={11} />
                  <span className="relative flex items-center">
                    Active
                    <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse-soft" />
                  </span>
                </div>

                <h3 className="font-display text-3xl text-white mt-3 leading-tight">{p.title}</h3>
                <p className="text-white/60 mt-2 leading-relaxed">{p.tagline}</p>

                <p className="text-sm text-white/70 mt-5 leading-relaxed">
                  {p.problem}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/75 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.18em] text-accent">Progress</h4>
                <ul className="space-y-2.5 text-sm text-white/80">
                  {p.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex gap-3">
                      <ArrowRight size={14} className="text-accent mt-1 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.codeUrl && (
                  <a href={p.codeUrl} target="_blank" rel="noopener" className="btn-ghost mt-3 text-sm">
                    <Github size={14} /> Repo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
