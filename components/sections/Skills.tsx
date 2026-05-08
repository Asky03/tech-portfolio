'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { skillGroups } from '@/data/skills';
import { motion } from 'framer-motion';

export default function Skills() {
  // Flatten for the marquee strip
  const allSkills = skillGroups.flatMap((g) => g.items);

  return (
    <section id="skills" aria-label="Skills" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Skills"
          title={<>Tools I <em className="italic gradient-text">actually</em> use.</>}
          description="Categorized by where they live in a stack. Bold ones are what I reach for first."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-xs uppercase tracking-[0.18em] text-accent mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/80 font-mono hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <Reveal delay={0.2} className="mt-10 overflow-hidden mask-fade">
          <div className="marquee-track gap-3 py-2">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="shrink-0 text-sm font-mono text-white/40 px-4 py-1.5 rounded-full border border-white/[0.06]"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .mask-fade {
          mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
        }
      `}</style>
    </section>
  );
}
