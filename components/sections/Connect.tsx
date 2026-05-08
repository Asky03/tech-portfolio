'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Calendar, Send, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Toast from '@/components/ui/Toast';
import { site } from '@/lib/site';

interface FormState {
  name: string;
  email: string;
  message: string;
  honeypot: string; // bot trap
}

const initial: FormState = { name: '', email: '', message: '', honeypot: '' };

export default function Connect() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error'; show: boolean }>({
    msg: '',
    type: 'success',
    show: false,
  });

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name as keyof FormState]: undefined }));
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) e.message = 'A few more words, please (10+ chars).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setForm(initial);
        setToast({ msg: 'Message sent — I’ll get back to you soon.', type: 'success', show: true });
      } else if (res.status === 429) {
        setToast({ msg: 'Too many messages. Please wait a moment.', type: 'error', show: true });
      } else if (data.errors) {
        setErrors(data.errors);
        setToast({ msg: 'Please fix the highlighted fields.', type: 'error', show: true });
      } else {
        setToast({
          msg: data.error || 'Something went wrong sending the message.',
          type: 'error',
          show: true,
        });
      }
    } catch {
      setToast({
        msg: 'Network error. Please try again or email me directly.',
        type: 'error',
        show: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="connect" aria-label="Connect" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Connect"
          title={<>Let&apos;s <em className="italic gradient-text">talk shop.</em></>}
          description="Open to internships, collabs, and interesting problems. The fastest path is the form — I read every message."
        />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="glass-strong rounded-2xl p-6 sm:p-8"
            noValidate
          >
            {/* honeypot — hidden from users */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={update}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={update}
                error={errors.name}
                placeholder="Your name"
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                error={errors.email}
                placeholder="you@domain.com"
                autoComplete="email"
              />
            </div>

            <div className="mt-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-white/55">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  rows={5}
                  placeholder="What are you working on / what's the role / what do you need from me?"
                  className={`mt-2 w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder:text-white/35 outline-none transition resize-y ${
                    errors.message ? 'border-rose-400/50 focus:border-rose-400' : 'border-white/10 focus:border-accent/50'
                  }`}
                />
                {errors.message && <span className="text-xs text-rose-300 mt-1 block">{errors.message}</span>}
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-5 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={15} /> Send message
                </>
              )}
            </button>
          </motion.form>

          {/* SIDE QUICK LINKS */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <QuickLink href={`mailto:${site.email}`} icon={<Mail size={16} />} label="Email" sub={site.email} />
            <QuickLink href={site.linkedin} icon={<Linkedin size={16} />} label="LinkedIn" sub="ashutoshs27" external />
            <QuickLink href={site.github} icon={<Github size={16} />} label="GitHub" sub={`@${site.handle}`} external />
            <QuickLink href={site.resumeUrl} icon={<FileText size={16} />} label="Resume" sub="PDF · 1 page" external />
            <QuickLink
              href="https://calendar.google.com/calendar/u/0/r/eventedit?text=Connect+with+Ashutosh&details=Hi+Ashu,+I%27d+like+to+connect+about+an+internship/opportunity.&location=Google+Meet"
              icon={<Calendar size={16} />}
              label="Book a call"
              sub="Google Meet"
              external
            />
          </motion.aside>
        </div>
      </div>

      <Toast
        message={toast.msg}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-white/55">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`mt-2 w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder:text-white/35 outline-none transition ${
          error ? 'border-rose-400/50 focus:border-rose-400' : 'border-white/10 focus:border-accent/50'
        }`}
      />
      {error && <span className="text-xs text-rose-300 mt-1 block">{error}</span>}
    </label>
  );
}

function QuickLink({
  href,
  icon,
  label,
  sub,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/[0.06] hover:border-white/20 transition group"
    >
      <span className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm text-white">{label}</span>
        <span className="block text-xs text-white/45 truncate font-mono">{sub}</span>
      </span>
      <span className="text-white/25 group-hover:text-white/70 transition">→</span>
    </a>
  );
}
