'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

export default function AvailabilityBadge() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.a
      href="#connect"
      initial={{ y: 80, opacity: 0 }}
      animate={shown ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="hidden sm:flex fixed bottom-6 left-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-full glass-strong text-sm text-white/85 hover:text-white shadow-2xl group"
      aria-label="Currently available"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span className="font-medium">{site.availability}</span>
      <span className="text-white/30 group-hover:text-white/60 transition">→</span>
    </motion.a>
  );
}
