'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Wrench } from 'lucide-react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  onOpen: () => void;
  index?: number;
}

export default function ProjectCard({ project, onOpen, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="glow-border group relative flex flex-col p-6 rounded-2xl glass cursor-pointer"
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
      role="button"
      tabIndex={0}
      aria-label={`Open case study for ${project.title}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
            {project.category}
          </span>
          {project.status === 'building' && (
            <span className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 inline-flex items-center gap-1">
              <Wrench size={9} /> Building
            </span>
          )}
        </div>
        <ArrowUpRight
          size={18}
          className="text-white/30 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
        />
      </div>

      <h3 className="font-display text-2xl text-white leading-tight">{project.title}</h3>
      <p className="text-sm text-white/55 mt-2 leading-relaxed flex-1">{project.tagline}</p>

      <div className="flex flex-wrap gap-1.5 mt-5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/70 font-mono"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-[11px] px-2 py-1 rounded-md text-white/40 font-mono">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/[0.06] text-xs">
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="text-white/55 hover:text-white inline-flex items-center gap-1.5"
          >
            <Github size={13} /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="text-white/55 hover:text-white inline-flex items-center gap-1.5"
          >
            <ExternalLink size={13} /> Live
          </a>
        )}
        <span className="ml-auto text-white/40 group-hover:text-accent transition">Case study →</span>
      </div>
    </motion.article>
  );
}
