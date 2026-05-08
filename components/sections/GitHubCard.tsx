'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export default function GitHubCard() {
  return (
    <section id="github" aria-label="GitHub activity" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="GitHub"
          title={<>Public commits, <em className="italic gradient-text">no curation.</em></>}
          description="What I'm pushing publicly. Stats and contribution graph live-pulled from GitHub."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                <Github size={20} className="text-white" />
              </div>
              <div>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener"
                  className="font-display text-xl text-white hover:text-accent transition inline-flex items-center gap-1.5"
                >
                  @{site.handle} <ExternalLink size={14} />
                </a>
                <p className="text-xs text-white/45 font-mono mt-0.5">github.com/{site.handle}</p>
              </div>
            </div>
            <a href={site.github} target="_blank" rel="noopener" className="btn-ghost text-sm">
              <Github size={14} /> Visit profile
            </a>
          </div>

          {/* Contribution graph (third-party SVG service — single image, no API key) */}
          <div className="rounded-xl bg-ink-950/60 border border-white/[0.06] p-3 sm:p-4 overflow-x-auto">
            <Image
              src={`https://ghchart.rshah.org/7c8cff/${site.handle}`}
              alt={`${site.name} GitHub contribution chart`}
              width={720}
              height={112}
              className="w-full h-auto min-w-[600px]"
              unoptimized
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="rounded-xl bg-ink-950/60 border border-white/[0.06] p-2 overflow-hidden">
              <Image
                src={`https://github-readme-stats.vercel.app/api?username=${site.handle}&show_icons=true&theme=transparent&hide_border=true&title_color=7c8cff&text_color=9aa3bd&icon_color=7c8cff`}
                alt={`${site.name} GitHub stats`}
                width={500}
                height={195}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            <div className="rounded-xl bg-ink-950/60 border border-white/[0.06] p-2 overflow-hidden">
              <Image
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${site.handle}&layout=compact&theme=transparent&hide_border=true&title_color=7c8cff&text_color=9aa3bd`}
                alt={`${site.name} top languages`}
                width={500}
                height={195}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
