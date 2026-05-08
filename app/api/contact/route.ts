import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

// ---------- super-simple in-memory rate limit (per-IP, per-process) ----------
// Good enough for a portfolio. For real abuse protection, swap for Upstash Ratelimit.
const HITS = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function rateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const cur = HITS.get(ip);
  if (!cur || now > cur.reset) {
    HITS.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { ok: true };
  }
  if (cur.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((cur.reset - now) / 1000) };
  }
  cur.count += 1;
  return { ok: true };
}

// ---------- validation ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: { name?: string; email?: string; message?: string; honeypot?: string }) {
  const errors: Record<string, string> = {};
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();

  if (name.length < 2 || name.length > 80) errors.name = 'Name must be 2–80 characters.';
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'Please enter a valid email.';
  if (message.length < 10 || message.length > 4000) {
    errors.message = 'Message must be 10–4000 characters.';
  }
  // honeypot: real users leave this empty; bots fill every field
  if (body.honeypot && body.honeypot.length > 0) errors._spam = 'spam';

  return { errors, name, email, message };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------- handler ----------
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
    }

    const { errors, name, email, message } = validate(body);
    if (Object.keys(errors).length) {
      // Spam honeypot: pretend it worked, drop silently.
      if (errors._spam) return NextResponse.json({ ok: true });
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    if (!apiKey || !to) {
      console.error('Contact API missing RESEND_API_KEY or CONTACT_TO_EMAIL');
      return NextResponse.json(
        { ok: false, error: 'Email service not configured.' },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0b0e1a;color:#e8ecf5;border-radius:12px">
          <h2 style="margin:0 0 16px;font-weight:600">New portfolio inquiry</h2>
          <p style="margin:4px 0;color:#9aa3bd"><strong style="color:#e8ecf5">From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <hr style="border:0;border-top:1px solid rgba(255,255,255,0.1);margin:16px 0" />
          <p style="white-space:pre-wrap;line-height:1.55">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Could not send the email. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Contact API exception:', e);
    return NextResponse.json({ ok: false, error: 'Server error.' }, { status: 500 });
  }
}
