'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { notes } from '@/data/notes';

const TOPIC_TONE: Record<string, string> = {
  Cloud: 'text-sky-300 border-sky-300/20 bg-sky-300/5',
  DevOps: 'text-amber-300 border-amber-300/20 bg-amber-300/5',
  Backend: 'text-emerald-300 border-emerald-300/20 bg-emerald-300/5',
  'AI/ML': 'text-violet-300 border-violet-300/20 bg-violet-300/5',
  Security: 'text-rose-300 border-rose-300/20 bg-rose-300/5',
};

export default function Notes() {
  return (
    <section id="notes" aria-label="Notes and learning" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Notes"
          title={<>What I&apos;m <em className="italic gradient-text">learning</em> right now.</>}
          description="Short writeups on cloud, DevOps, backend, and the things that broke in the middle of the night."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((n, i) => {
            const Card = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group glass rounded-2xl p-5 h-full flex flex-col glow-border"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${TOPIC_TONE[n.topic] ?? 'text-white/60 border-white/10 bg-white/[0.04]'}`}>
                    {n.topic}
                  </span>
                  {n.url ? (
                    <ArrowUpRight size={16} className="text-white/30 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/35 inline-flex items-center gap-1">
                      <BookOpen size={10} /> Draft
                    </span>
                  )}
                </div>

                <h3 className="text-white font-display text-lg leading-snug">{n.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed flex-1">{n.excerpt}</p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06] text-xs text-white/45 font-mono">
                  <span>{n.date}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={11} /> {n.readTime}
                  </span>
                </div>
              </motion.div>
            );
            return n.url ? (
              <a key={n.id} href={n.url} target="_blank" rel="noopener" className="block">
                {Card}
              </a>
            ) : (
              <div key={n.id}>{Card}</div>
            );
          })}
        </div>

        <p className="text-xs text-white/35 mt-6">
          ↑ Edit <code className="font-mono text-white/55">data/notes.ts</code> — add a{' '}
          <code className="font-mono text-white/55">url</code> when you publish on Hashnode / Medium / dev.to.
        </p>
      </div>
    </section>
  );
}
