'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { certifications } from '@/data/certifications';

export default function Certifications() {
  return (
    <section id="certifications" aria-label="Certifications" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Certifications"
          title={<>Receipts for the <em className="italic gradient-text">homework.</em></>}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glow-border glass rounded-2xl p-5 group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
                  <Award size={16} />
                </div>
                <span className="text-[10px] font-mono text-white/40">{c.year}</span>
              </div>
              <h3 className="text-white font-display text-lg leading-snug">{c.title}</h3>
              <p className="text-xs text-white/50 mt-1">{c.issuer}</p>

              <div className="flex flex-wrap gap-1 mt-4">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/60 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 size={11} /> {c.status}
                </span>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    className="text-white/45 hover:text-white transition"
                    aria-label={`Verify ${c.title}`}
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
