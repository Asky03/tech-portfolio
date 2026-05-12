# Deployment Walkthrough — Step by Step

This is the **exact** sequence to get your portfolio live. Do these in order.

## ⚙️ Before you start

You need accounts at:
- [GitHub](https://github.com) — you have this
- [Vercel](https://vercel.com) — sign up with your GitHub account (1 click)
- [Resend](https://resend.com) — sign up with email (free, 3000 sends/month)

## 1. Get your Resend API key (5 min)

1. Go to https://resend.com → Sign up → verify email
2. Once logged in: left sidebar → **API Keys** → **Create API Key**
3. Name it: `portfolio-prod` · Permission: **Sending access** · Domain: **All domains**
4. **Copy the key now** (starts with `re_`). It's only shown once. Paste it somewhere safe — Notion, Apple Notes, anywhere private.

> 💡 For the FROM address, you can use `onboarding@resend.dev` for testing. For production, you'll verify your own domain (covered later).

## 2. Local test — does the contact form actually work? (10 min)

In your project folder:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:
```env
RESEND_API_KEY=re_your_actual_key_here
CONTACT_TO_EMAIL=Ashushekhar2442@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then:

```bash
npm run dev
```

Open `http://localhost:3000` → scroll to Connect → fill the form → submit. You should:
- See a success toast
- Get an email in your inbox within ~30 seconds

If it errors, check the terminal where `npm run dev` is running. Most common issue: typo in `RESEND_API_KEY`.

## 3. Push to GitHub (5 min)

If your project isn't already on GitHub:

```bash
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
```

Create a new repo at https://github.com/new — name it `portfolio` (or whatever) — make it **public** (so recruiters can read your code if they want).

DO NOT initialize with a README; you already have one.

Then:

```bash
git remote add origin git@github.com:Asky03/portfolio.git
git push -u origin main
```

**Critical:** make sure `.env.local` is NOT in your commit. Run `git status` first to verify. The `.gitignore` I included excludes it, but always double-check before pushing secrets.

## 4. Deploy to Vercel (5 min)

1. Go to https://vercel.com/new
2. **Import Git Repository** → find your `portfolio` repo → click **Import**
3. Vercel auto-detects Next.js. Don't change build settings.
4. Expand **Environment Variables** section. Add four entries:
   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | `re_your_actual_key_here` |
   | `CONTACT_TO_EMAIL` | `Ashushekhar2442@gmail.com` |
   | `CONTACT_FROM_EMAIL` | `onboarding@resend.dev` |
   | `NEXT_PUBLIC_SITE_URL` | `https://ashutoshs.vercel.app` (or your custom domain) |
5. Click **Deploy**. Takes ~2 minutes.

You'll get a URL like `ashutosh-portfolio.vercel.app`. Open it. It should work.

## 5. Test in production (5 min)

On the live URL, click every CTA:
- [ ] Resume button → downloads PDF (or 404 if you haven't uploaded one yet)
- [ ] GitHub button → opens your profile
- [ ] LinkedIn button → opens your profile
- [ ] Each project's "View Code" → opens correct repo
- [ ] Contact form → submit a test message, confirm email arrives
- [ ] Cmd+K → opens command menu, every option works
- [ ] Click each project card → modal opens, ESC closes it
- [ ] Resize browser to mobile width → hamburger menu works

If any of these fail, fix and `git push` — Vercel auto-redeploys.

## 6. Optional: custom domain (15 min + DNS wait)

Recommended providers in India: **Namecheap** (₹800-1500/yr) or **Porkbun** (cheaper).

1. Buy `ashutosh.dev` (or whatever's available)
2. On Vercel: Project → **Settings** → **Domains** → Add → enter your domain
3. Vercel shows you DNS records to add. Copy them.
4. On your domain registrar: DNS settings → add the records Vercel showed
5. Wait 5-30 min for DNS to propagate
6. Vercel auto-issues an SSL certificate
7. Update `NEXT_PUBLIC_SITE_URL` env var to `https://ashutosh.dev`
8. Trigger a redeploy (Vercel dashboard → Deployments → ... → Redeploy)

## 7. Verify domain in Resend (for production email)

While `onboarding@resend.dev` works for testing, real production emails should come from your own domain. Otherwise:
- Gmail may mark them as spam
- "Reply" goes to a Resend address instead of you

Once you have a custom domain:
1. Resend → **Domains** → **Add Domain** → enter `ashutosh.dev`
2. Resend shows DNS records (SPF, DKIM, DMARC). Add them at your registrar.
3. Wait ~10 minutes. Resend will mark the domain "verified."
4. Update Vercel env var: `CONTACT_FROM_EMAIL=hello@ashutosh.dev`
5. Redeploy.

## 8. Set up GitHub Search Console (optional, do later)

1. https://search.google.com/search-console → Add property → Enter your domain
2. Verify via DNS TXT record (same registrar, same flow)
3. Submit sitemap: `https://ashutosh.dev/sitemap.xml`
4. Google will start indexing within a few days

## ⚠️ Things that go wrong

| Symptom | Fix |
|---|---|
| Build fails on Vercel | Run `npm run build` locally first. Fix whatever errors locally, push again. |
| Contact form returns 500 | Env vars not set on Vercel, or `RESEND_API_KEY` has a typo. |
| Form succeeds but no email arrives | Check spam folder. If still nothing, check Resend dashboard → Emails for delivery status. |
| Custom domain shows "Invalid Configuration" | DNS records aren't propagated yet. Wait, or verify the records match exactly. |
| `next/font` fails to load | Local network issue. Doesn't happen on Vercel. |
| Pictures don't show | Make sure files are in `/public/`, paths start with `/` (not `./` or `public/`). |

## 🎯 Phase 1 completion checklist

When all of these are ✅, you're done with Phase 1:

- [ ] Site loads at production URL (custom or vercel.app)
- [ ] About paragraph is in your voice (no TODO)
- [ ] Experience entries are real (or section is removed)
- [ ] CrowdShield has real case-study content
- [ ] `resume.pdf` downloads
- [ ] `og.png` shows correctly when link is shared on LinkedIn
- [ ] Favicon shows in browser tab
- [ ] All project repos open correctly
- [ ] Contact form sends real emails to your inbox
- [ ] Tested on mobile (real phone, not just browser DevTools)
- [ ] Lighthouse score 85+ on Performance, 95+ on Accessibility & SEO

Once these are ticked, Phase 1 is done — and you can start Phase 2 (case study pages, real blog post, live demo) without guilt.
