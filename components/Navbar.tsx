'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText, Command } from 'lucide-react';
import { navItems, site } from '@/lib/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => !!el);

    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${(e.target as HTMLElement).id}`);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="Primary"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 backdrop-blur-xl bg-ink-900/60' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-display text-xl">
          <span className="text-white">ashutosh</span>
          <span className="text-accent">.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm rounded-full transition-colors ${
                active === item.href
                  ? 'text-white bg-white/[0.06]'
                  : 'text-white/65 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-cmdk'))}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/60 rounded-md border border-white/10 hover:text-white hover:border-white/20 transition"
            aria-label="Open command menu"
          >
            <Command size={12} />
            <span>K</span>
          </button>
          <a href={site.resumeUrl} target="_blank" rel="noopener" className="btn-ghost !py-1.5 !px-3 text-sm">
            <FileText size={14} /> Resume
          </a>
          <a href={site.github} target="_blank" rel="noopener" aria-label="GitHub" className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition">
            <Github size={18} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition">
            <Linkedin size={18} />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`px-3 py-2.5 rounded-lg text-sm ${
                    active === item.href ? 'text-white bg-white/[0.06]' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-2 pt-3 mt-2 border-t border-white/10">
                <a href={site.resumeUrl} target="_blank" rel="noopener" onClick={close} className="btn-ghost !py-2 !px-3 text-sm flex-1 justify-center">
                  <FileText size={14} /> Resume
                </a>
                <a href={site.github} target="_blank" rel="noopener" onClick={close} className="btn-ghost !py-2 !px-3 text-sm">
                  <Github size={16} />
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener" onClick={close} className="btn-ghost !py-2 !px-3 text-sm">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
