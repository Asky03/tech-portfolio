'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('seenPreloader')) {
      setVisible(false);
      return;
    }

    let p = 0;
    let raf = 0;
    let done = false;

    const tick = () => {
      if (done) return;
      p += Math.max(0.6, (94 - p) * 0.04);
      if (p > 94) p = 94;
      setPct(Math.round(p));
      if (p < 94) raf = requestAnimationFrame(tick);
    };
    tick();

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      let v = p;
      const anim = () => {
        v += (100 - v) * 0.22;
        if (v > 99.7) v = 100;
        setPct(Math.round(v));
        if (v < 100) requestAnimationFrame(anim);
        else {
          setTimeout(() => {
            sessionStorage.setItem('seenPreloader', '1');
            setVisible(false);
          }, 220);
        }
      };
      anim();
    };

    const t = setTimeout(finish, 1600);
    window.addEventListener('load', finish);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', finish);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
        >
          <div className="w-full max-w-sm px-8 text-center">
            <div className="flex items-center justify-center gap-2 text-white/90 font-display text-2xl mb-8">
              <Code2 size={22} className="text-accent" />
              <span>ashutosh<span className="text-accent">.dev</span></span>
            </div>

            <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-accent-violet to-accent-mint"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />
            </div>

            <div className="mt-3 flex justify-between text-[11px] tracking-[0.18em] uppercase text-white/40">
              <span>Routing traffic</span>
              <span className="font-mono text-white/70">{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
