import { site } from '@/lib/site';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/[0.06] py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-display text-lg">
            <span className="text-white">ashutosh</span>
            <span className="text-accent">.dev</span>
          </div>
          <p className="text-sm text-white/50 mt-1">
            © {new Date().getFullYear()} {site.name}. Built with Next.js & Framer Motion.
          </p>
        </div>
        <div className="flex items-center gap-3 text-white/60">
          <a href={`mailto:${site.email}`} aria-label="Email" className="p-2 rounded-full hover:text-white hover:bg-white/[0.06] transition">
            <Mail size={18} />
          </a>
          <a href={site.github} target="_blank" rel="noopener" aria-label="GitHub" className="p-2 rounded-full hover:text-white hover:bg-white/[0.06] transition">
            <Github size={18} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="p-2 rounded-full hover:text-white hover:bg-white/[0.06] transition">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
