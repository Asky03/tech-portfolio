# Ashutosh Shekhar — Portfolio

Premium dark-themed developer portfolio built with Next.js 14. Animated, accessible, SEO-ready, and recruiter-friendly.

**Live:** https://ashutosh.dev (update after deploy)

## ✨ Features

- **Hero** with animated gradient headline and floating "highlights" card
- **Cmd+K command menu** for fast navigation (`⌘K` / `Ctrl+K`)
- **Project case-study modals** with focus trap + keyboard nav
- **Currently Building** section showing live WIP work (CrowdShield)
- **Categorized skills** with animated marquee
- **Experience timeline** (placeholder — fill with real entries)
- **Certifications** grid
- **GitHub contribution card** (live SVGs from ghchart + readme-stats)
- **Notes / blog** scaffolding for cloud, DevOps, backend writeups
- **Contact form** wired to Resend via Next.js API route, with rate limit + honeypot
- **Floating availability badge** ("Open to internships / software roles")
- **Preloader** (once per browser session)
- **Reduced-motion** support, **focus-visible** outlines, semantic HTML
- **JSON-LD Person schema**, sitemap, robots, OG/Twitter metadata

## 🧱 Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React · cmdk · Resend (email)

## 📁 Folder structure

```
portfolio/
├─ app/
│  ├─ api/contact/route.ts     # Contact form → Resend
│  ├─ globals.css
│  ├─ layout.tsx               # Root layout, fonts, metadata, JSON-LD
│  ├─ page.tsx                 # Composes all sections
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ CommandMenu.tsx          # Cmd+K
│  ├─ Footer.tsx
│  ├─ Navbar.tsx
│  ├─ Preloader.tsx
│  ├─ sections/
│  │  ├─ About.tsx
│  │  ├─ Certifications.tsx
│  │  ├─ Connect.tsx
│  │  ├─ CurrentlyBuilding.tsx
│  │  ├─ Experience.tsx
│  │  ├─ GitHubCard.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Notes.tsx
│  │  ├─ Projects.tsx
│  │  └─ Skills.tsx
│  └─ ui/
│     ├─ AvailabilityBadge.tsx
│     ├─ ProjectCard.tsx
│     ├─ ProjectModal.tsx
│     ├─ Reveal.tsx
│     ├─ SectionHeading.tsx
│     └─ Toast.tsx
├─ data/
│  ├─ certifications.ts
│  ├─ experience.ts            # ⚠ has placeholders — fill in
│  ├─ notes.ts                 # ⚠ has starter notes — replace
│  ├─ projects.ts              # All real project data lives here
│  └─ skills.ts
├─ lib/
│  └─ site.ts                  # Name, links, email, copy
├─ public/                     # ⚠ add resume.pdf, og.png, favicons
├─ .env.example
├─ .gitignore
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## 🚀 Local setup

```bash
# 1. install
npm install

# 2. environment
cp .env.example .env.local
# Then open .env.local and fill in RESEND_API_KEY + CONTACT_TO_EMAIL

# 3. dev
npm run dev
# open http://localhost:3000
```

## 🔐 Environment variables

| Key | Required | Purpose |
|-----|----------|---------|
| `RESEND_API_KEY` | yes (for contact form) | Get free at https://resend.com — 3,000 emails/month free |
| `CONTACT_TO_EMAIL` | yes | Where messages are delivered (your inbox) |
| `CONTACT_FROM_EMAIL` | optional | Defaults to `onboarding@resend.dev`. Use a verified domain in production. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Your live URL (used for sitemap + canonical). No trailing slash. |

The app builds and runs without a Resend key — only the contact API will fail until you add one. Everything else works.

## 📝 Things you must fill in manually

- [ ] **Replace placeholder text in `data/experience.ts`** with your real internships / roles
- [ ] **Replace starter posts in `data/notes.ts`** with real blog links (or delete the section if you don't blog yet)
- [ ] **Edit the About paragraph** in `components/sections/About.tsx` (search for `TODO`)
- [ ] **Add `public/resume.pdf`** so the resume button works
- [ ] **Add `public/og.png`** (1200×630) for social sharing previews — see `public/og.svg` for the template
- [ ] **Add favicons** to `public/` (favicon.ico, apple-touch-icon.png, etc.) — see `public/favicon.svg`
- [ ] **Update `NEXT_PUBLIC_SITE_URL`** in `.env.local` to your real domain
- [ ] **Verify your domain in Resend** and update `CONTACT_FROM_EMAIL` to `noreply@yourdomain.com` for production deliverability
- [ ] **Add the CrowdShield repo URL** in `data/projects.ts` once it's public
- [ ] **Verify your repo URLs** in `data/projects.ts` (especially `Kiranawala-` — confirm the trailing dash is intentional)

## 🎨 Project case-study modal — the `deepDive` field

Each project in `data/projects.ts` can include an optional `deepDive` object for a richer case study:

```ts
deepDive: {
  keyDecision:    { title: 'Why X over Y', body: '...' },  // your biggest tech choice + why
  hardestProblem: { title: 'What broke',   body: '...' },  // the gnarly part you solved
  nextMilestone:  'What you\'re building next',
  showableToday:  'What works right now that you could demo',
}
```

Only flagship projects need this. Smaller projects look fine with just the basic fields. The modal automatically hides any section you don't fill in.

## 🚀 Deployment

For step-by-step Vercel + Resend setup, see [`DEPLOY.md`](./DEPLOY.md) — it has everything from env vars to custom domain DNS to verifying email deliverability.

## ☁️ Deploy to Vercel

1. Push to GitHub:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Import the repo at https://vercel.com/new

3. **Set environment variables** in Vercel dashboard → Settings → Environment Variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (after verifying your domain)
   - `NEXT_PUBLIC_SITE_URL`

4. Deploy. Done.

5. (Optional) Point your custom domain → Vercel → Domains.

## 🧪 Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # production server (after build)
npm run lint     # ESLint
```

## 🎨 Customizing

- **Colors / theme** — `app/globals.css` has CSS variables at the top. Tailwind tokens are in `tailwind.config.ts`.
- **Copy / links / email** — single source of truth at `lib/site.ts`.
- **Sections shown** — comment out a section import in `app/page.tsx` to hide it temporarily.

## 📜 License

All rights reserved © Ashutosh Shekhar.

---

**Contact:** Ashushekhar2442@gmail.com · [GitHub](https://github.com/Asky03) · [LinkedIn](https://www.linkedin.com/in/ashutoshs27/)