'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="status"
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="glass-strong rounded-xl px-4 py-3 flex items-start gap-3 shadow-2xl">
            {type === 'success' ? (
              <CheckCircle2 className="text-emerald-400 mt-0.5 shrink-0" size={18} />
            ) : (
              <AlertCircle className="text-rose-400 mt-0.5 shrink-0" size={18} />
            )}
            <p className="text-sm text-white/90 leading-relaxed flex-1">{message}</p>
            <button onClick={onClose} aria-label="Close" className="text-white/40 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
