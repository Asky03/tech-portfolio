'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Folder, User, Wrench, Briefcase, Award, Github, Linkedin, Mail, FileText,
  Search, BookOpen, Sparkles, Hammer,
} from 'lucide-react';
import { site } from '@/lib/site';

interface Item {
  id: string;
  label: string;
  icon: React.ReactNode;
  group: string;
  action: () => void;
  keywords?: string[];
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onCustom = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-cmdk', onCustom);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-cmdk', onCustom);
    };
  }, []);

  const goTo = (hash: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const openExt = (url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener');
  };

  const items: Item[] = [
    { id: 'about', label: 'About', icon: <User size={16} />, group: 'Navigate', action: () => goTo('#about') },
    { id: 'skills', label: 'Skills', icon: <Wrench size={16} />, group: 'Navigate', action: () => goTo('#skills') },
    { id: 'projects', label: 'Projects', icon: <Folder size={16} />, group: 'Navigate', action: () => goTo('#projects') },
    { id: 'building', label: 'Currently Building', icon: <Hammer size={16} />, group: 'Navigate', action: () => goTo('#building'), keywords: ['crowdshield', 'wip'] },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} />, group: 'Navigate', action: () => goTo('#experience') },
    { id: 'certs', label: 'Certifications', icon: <Award size={16} />, group: 'Navigate', action: () => goTo('#certifications') },
    { id: 'notes', label: 'Notes & Learning', icon: <BookOpen size={16} />, group: 'Navigate', action: () => goTo('#notes') },
    { id: 'connect', label: 'Connect', icon: <Sparkles size={16} />, group: 'Navigate', action: () => goTo('#connect') },

    { id: 'resume', label: 'Download Resume', icon: <FileText size={16} />, group: 'Actions', action: () => openExt(site.resumeUrl) },
    { id: 'email', label: `Email — ${site.email}`, icon: <Mail size={16} />, group: 'Actions', action: () => openExt(`mailto:${site.email}`), keywords: ['contact', 'mail'] },
    { id: 'github', label: 'GitHub Profile', icon: <Github size={16} />, group: 'Actions', action: () => openExt(site.github) },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={16} />, group: 'Actions', action: () => openExt(site.linkedin) },
  ];

  const groups = Array.from(new Set(items.map((i) => i.group)));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[18vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -8, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command Menu">
              <div className="flex items-center gap-3 px-4 border-b border-white/10">
                <Search size={16} className="text-white/40" />
                <Command.Input placeholder="Type to search…" autoFocus />
                <kbd className="text-[10px] text-white/40 border border-white/15 rounded px-1.5 py-0.5">ESC</kbd>
              </div>
              <Command.List>
                <Command.Empty>No results.</Command.Empty>
                {groups.map((group) => (
                  <Command.Group key={group} heading={group}>
                    {items
                      .filter((i) => i.group === group)
                      .map((i) => (
                        <Command.Item key={i.id} value={`${i.label} ${i.keywords?.join(' ') || ''}`} onSelect={i.action}>
                          {i.icon}
                          <span>{i.label}</span>
                        </Command.Item>
                      ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
