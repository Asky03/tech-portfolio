import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Home, Mail } from 'lucide-react';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: '404 — Page not found',
  description: `That page doesn't exist on ${site.name}'s portfolio. Try the home page or get in touch.`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 sm:px-8 py-24">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] text-accent border border-accent/20 bg-accent/5 mb-6">
          <span className="w-1 h-1 rounded-full bg-accent" />
          Error 404
        </div>

        <h1 className="font-display text-5xl sm:text-7xl leading-[1.02] text-white">
          You&apos;ve wandered <em className="italic gradient-text">off-route.</em>
        </h1>

        <p className="text-white/60 mt-5 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist — maybe a typo, maybe a stale link.
          The good stuff is back at the home page.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={15} /> Back to home
          </Link>
          <Link href="/#projects" className="btn-ghost">
            <Home size={15} /> See projects
          </Link>
          <a href={`mailto:${site.email}`} className="btn-ghost">
            <Mail size={15} /> Say hi
          </a>
        </div>

        <p className="text-xs text-white/30 font-mono mt-12">
          path · not · found
        </p>
      </div>
    </main>
  );
}
