'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X, Github, ExternalLink, Target, User as UserIcon, Sparkles,
  Trophy, Brain, Bug, ChevronRight, Eye,
} from 'lucide-react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = !!project;

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && ref.current) {
        const focusables = ref.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    setTimeout(() => ref.current?.querySelector<HTMLElement>('button, a')?.focus(), 50);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={ref}
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 12, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto glass-strong rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white transition"
            >
              <X size={18} />
            </button>

            {project.cover && (
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={project.cover}
                  alt={project.coverAlt || `${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <h2 id="modal-title" className="font-display text-3xl sm:text-4xl text-white leading-tight">
                {project.title}
              </h2>
              <p className="text-white/65 mt-2 text-base sm:text-lg">{project.tagline}</p>

              <div className="grid sm:grid-cols-2 gap-5 mt-7">
                <Detail icon={<Target size={14} />} label="Problem" body={project.problem} />
                <Detail icon={<UserIcon size={14} />} label="My role" body={project.role} />
              </div>

              <div className="mt-7">
                <h3 className="text-xs uppercase tracking-[0.18em] text-white/45 mb-3 inline-flex items-center gap-2">
                  <Sparkles size={12} /> Key features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                      <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deep-dive sections — only render for projects that have them */}
              {project.deepDive?.keyDecision && (
                <DeepBlock
                  icon={<Brain size={12} />}
                  label="Key technical decision"
                  title={project.deepDive.keyDecision.title}
                  body={project.deepDive.keyDecision.body}
                />
              )}

              {project.deepDive?.hardestProblem && (
                <DeepBlock
                  icon={<Bug size={12} />}
                  label="Hardest problem"
                  title={project.deepDive.hardestProblem.title}
                  body={project.deepDive.hardestProblem.body}
                />
              )}

              {(project.deepDive?.showableToday || project.deepDive?.nextMilestone) && (
                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  {project.deepDive.showableToday && (
                    <SmallBlock
                      icon={<Eye size={11} />}
                      label="Showable today"
                      body={project.deepDive.showableToday}
                    />
                  )}
                  {project.deepDive.nextMilestone && (
                    <SmallBlock
                      icon={<ChevronRight size={11} />}
                      label="Next milestone"
                      body={project.deepDive.nextMilestone}
                    />
                  )}
                </div>
              )}

              {project.impact && (
                <div className="mt-7 p-4 rounded-xl bg-emerald-400/[0.04] border border-emerald-400/15">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-2 inline-flex items-center gap-2">
                    <Trophy size={12} /> Impact
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">{project.impact}</p>
                </div>
              )}

              <div className="mt-7">
                <h3 className="text-xs uppercase tracking-[0.18em] text-white/45 mb-3">Tech stack</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/80 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-white/[0.06]">
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noopener" className="btn-primary">
                    <Github size={16} /> View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener" className="btn-ghost">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                <button onClick={onClose} className="btn-ghost ml-auto">Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Detail({ icon, label, body }: { icon: React.ReactNode; label: string; body: string }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2 inline-flex items-center gap-2">
        {icon} {label}
      </h3>
      <p className="text-white/80 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function DeepBlock({
  icon, label, title, body,
}: { icon: React.ReactNode; label: string; title: string; body: string }) {
  return (
    <div className="mt-7 p-5 rounded-xl bg-white/[0.02] border border-white/10">
      <h3 className="text-xs uppercase tracking-[0.18em] text-accent mb-2 inline-flex items-center gap-2">
        {icon} {label}
      </h3>
      <p className="text-white font-medium leading-snug">{title}</p>
      <p className="text-white/70 text-sm leading-relaxed mt-2">{body}</p>
    </div>
  );
}

function SmallBlock({
  icon, label, body,
}: { icon: React.ReactNode; label: string; body: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
      <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-1.5 inline-flex items-center gap-1.5">
        {icon} {label}
      </h4>
      <p className="text-white/75 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
