'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail, Github, Sparkles, Bolt } from 'lucide-react';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 px-5 sm:px-8"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(124,140,255,0.45), transparent)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-12 w-[480px] h-[480px] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(167,139,250,0.4), transparent)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/20 bg-accent/5"
          >
            <Sparkles size={11} /> {site.name} · {site.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02] mt-5 text-white"
          >
            I build <em className="italic gradient-text">secure, scalable,</em>
            <br />
            cloud-ready software.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base sm:text-lg text-white/65 mt-5 max-w-xl leading-relaxed"
          >
            Software developer focused on full-stack systems, cloud infrastructure, and applied
            GenAI. I care about clean APIs, thoughtful UX, and code that holds up under load.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <a href="#projects" className="btn-primary">
              <Bolt size={16} /> See Projects <ArrowRight size={14} />
            </a>
            <a href={site.resumeUrl} target="_blank" rel="noopener" className="btn-ghost">
              <FileText size={16} /> Resume
            </a>
            <a href="#connect" className="btn-ghost">
              <Mail size={16} /> Contact
            </a>
            <a href={site.github} target="_blank" rel="noopener" className="btn-ghost">
              <Github size={16} /> GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap gap-2 mt-10 text-xs"
          >
            {[
              { k: '6+', v: 'Projects' },
              { k: '4+', v: 'Certifications' },
              { k: 'AWS', v: 'Cloud' },
              { k: 'GenAI', v: 'RAG / LLM' },
            ].map((p) => (
              <div
                key={p.v}
                className="glass px-3 py-1.5 rounded-full inline-flex items-center gap-2 text-white/75"
              >
                <span className="font-mono text-accent">{p.k}</span>
                <span className="text-white/50">{p.v}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating code-style card */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="hidden lg:block glass-strong rounded-2xl p-5 relative animate-float-slow"
          aria-label="What I'm working on"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-xs text-white/40 font-mono">~/highlights.md</span>
          </div>

          <ul className="space-y-3 text-sm font-mono text-white/80">
            <li className="flex gap-2">
              <span className="text-accent shrink-0">›</span>
              <span>Building <strong className="text-white">CrowdShield</strong> — AI crowd monitoring on AWS</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-violet shrink-0">›</span>
              <span>Hands-on with <strong className="text-white">Firebase, AWS, Docker</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-mint shrink-0">›</span>
              <span>Improving <strong className="text-white">system design</strong> through real builds</span>
            </li>
          </ul>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
            <span className="font-mono">v1.0 · live</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" /> shipping
            </span>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
