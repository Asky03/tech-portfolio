'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { projects, categories, type Project, type ProjectCategory } from '@/data/projects';

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== 'All' && p.category !== filter) return false;
      if (!q) return true;
      const hay = [p.title, p.tagline, p.problem, ...p.tech, ...p.badges]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  return (
    <section id="projects" aria-label="Featured projects" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Projects"
          title={<>Things I&apos;ve <em className="italic gradient-text">shipped</em> or am shipping.</>}
          description="Click any card for the full case study — problem, role, stack, key decisions."
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search by name, tech, problem…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm text-white placeholder:text-white/35 focus:border-accent/40 outline-none transition"
              aria-label="Search projects"
            />
          </div>
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium transition ${
                  filter === c
                    ? 'bg-white text-ink-950'
                    : 'bg-white/[0.04] border border-white/10 text-white/65 hover:text-white hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpen(p)} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-white/45 text-sm">
            No projects match those filters.
          </div>
        )}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
