# Ottawa Weekly — Website Requirements Document

**Version:** 1.0
**Date:** March 20, 2026
**Status:** Draft for Review

---

## Context

The operator runs "Ottawa Weekly" (working title: "This Week in the Capital"), a curated Thursday newsletter celebrating the best of Ottawa. No public website currently exists — only a newsletter preview mockup (`ottawa-newsletter-preview.html`) that establishes the brand identity. The website needs to make the brand feel real and credible, grow the subscriber list, and serve as an archive of past issues. The brand identity is already well-defined in the preview file; this document formalizes requirements for a full website built around that identity.

---

## 1. Project Overview

### Goals
1. **Convert visitors into subscribers** — primary action on every page
2. **Establish credibility and voice** — warm, editorial, genuinely local
3. **Host a browsable archive** — past issues shareable and discoverable

### Target Audience
- Ottawa residents 25–55 seeking curated weekly event discovery
- Newcomers, students, recent transplants looking for a trusted local guide
- People referred via a shared issue link

### Design Philosophy
Speed to market over perfection. Buildable in a weekend, maintainable without a developer, fast enough to look polished on first impression.

---

## 2. Pages & Routing

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Brand showcase + primary subscriber capture |
| `/archive` | Archive | Reverse-chronological index of all issues |
| `/issues/[YYYY-MM-DD]` | Issue View | Full issue rendered as a web page |
| `/thank-you` | Thank You | Shown after form submit (noindex) |
| `/confirm` | Confirmed | Destination from ESP confirmation email (noindex) |
| `/about` | About | Mission, voice, human face on the newsletter |
| `404` | Not Found | Branded 404 page |

---

## 3. Feature Requirements

### Homepage

- **Hero:** Brand name, tagline, 2–3 sentence description, inline email capture form, social proof line ("Join X readers every Thursday"), maple leaf logo mark
- **Value Strip:** 3 icon-accompanied benefit statements — curated weekly / only the good stuff / every Thursday, free
- **Sample Issue Preview:** Truncated most-recent issue showing Featured Event + 2–3 Highlight cards, ending with a subscribe CTA — this is the primary conversion section
- **Archive Teaser:** Row of 3–4 recent issue cards with dates and themes, "Browse all issues" link
- **Footer CTA:** Repeat email form with short copy ("Don't miss next Thursday's edition")

### Archive Page

- Reverse-chronological issue cards: date, title/theme, 1–2 sentence summary, optional image
- Pagination (10–12 per page) — preferred over infinite scroll for SEO
- Month/year filter deferred until 12+ issues exist

### Individual Issue View (`/issues/[slug]`)

- Full structured content: Featured Event, Weekly Highlights (4 cards), Family Corner (3 items)
- Each event card: title, date/time, location, description, source/ticket link
- Issue metadata: publish date, issue number
- In-page subscribe prompt (mid-page inline form): "Getting this from a friend? Subscribe free."
- Social share: copy link + Facebook/Instagram — no full widget suite
- Previous/Next issue navigation
- Open Graph tags per issue for clean link previews
- JSON-LD structured data (`Article` schema)

### Global Components

- **Nav:** Logo + brand name | Archive | About | Subscribe (gold button) — sticky, mobile-hamburger
- **Footer:** Brand name, tagline, Archive/About/Privacy links, copyright, Instagram link
- **Cookie banner:** Omitted if using privacy-respecting analytics (Plausible/Fathom) — no tracking cookies

---

## 4. Subscriber Capture

### Form
- Fields: Email (required), First name (optional)
- Client-side validation; redirect to `/thank-you` on success
- Must function without JavaScript (use ESP embed or server-rendered form action)
- No CAPTCHA initially

### Placement (minimum 3 locations)
1. Homepage hero (above fold)
2. Homepage footer
3. Inline within individual issue pages

### Confirmation Flow (CASL double opt-in required)
1. Submit → `/thank-you` ("Check your inbox to confirm")
2. ESP sends confirmation email automatically
3. Click confirmation link → `/confirm` ("You're in. See you Thursday.") with link to `/archive`

### ESP Recommendation
**Beehiiv** — newsletter-native, generous free tier, has built-in web hosting that could replace a custom archive if visual constraints allow. Evaluate Beehiiv's native web view before building a custom archive.

---

## 5. Design & Branding

### Color Tokens
| Token | Hex | Usage |
|---|---|---|
| `--color-forest` | `#0f2218` | Primary background, nav, dark sections |
| `--color-gold` | `#c8922a` | CTA buttons, accents, highlights |
| `--color-gold-light` | `#e8b84b` | Hover states, secondary accents |
| `--color-cream` | `#fdfaf4` | Page background, card backgrounds |
| `--color-text-primary` | `#1a1a1a` | Body text on light backgrounds |
| `--color-text-muted` | `#6b6b6b` | Captions, metadata |

### Typography
- **Display/Headlines:** Playfair Display (serif) — newsletter name, section headers, event titles
- **Body/UI:** Source Sans 3 (sans-serif) — body copy, nav, forms, metadata
- Loaded via Google Fonts with `display=swap` and preconnect headers

### Component Standards
- Cards: 8–12px border-radius, subtle shadow, cream bg, hover lift (`translateY(-2px)`)
- Buttons (Primary): gold bg, forest text, 6–8px border-radius, hover darkens to `#b07d22`
- Spacing: 8px base unit; 80–120px section padding desktop, 48–64px mobile
- Motion: 200–300ms ease; respect `prefers-reduced-motion`
- Logo mark: SVG maple leaf only (no raster) — must work at 32px (favicon), 48px (nav), 120px+ (hero)

---

## 6. Content Requirements

### Per-Issue Data Structure
```
Issue
  ├── slug (YYYY-MM-DD)
  ├── title / theme
  ├── publish_date
  ├── issue_number (optional)
  ├── summary (1–2 sentences, for archive cards)
  ├── featured_event { title, date_time, location, description, image?, source_url }
  ├── highlights[] (4 events, same fields)
  └── family_corner[] (3 items, same fields)
```

### Content Management (recommended: Markdown files)
- Each issue = one `.md` file with frontmatter in the repo
- Zero cost, works perfectly with Astro
- Alternative: Beehiiv as CMS if the operator prefers a GUI

### Static Content
- Homepage hero copy, about page, privacy policy (CASL-required boilerplate)
- No user-generated content, no advertiser content in v1

---

## 7. Technical Requirements

### Recommended Stack
- **Framework:** Astro — zero JS by default, first-class Markdown support, excellent SEO, fast builds
- **Styling:** Tailwind CSS with custom theme mapped to design tokens above
- **Hosting:** Cloudflare Pages (preferred) or Vercel — both free at this scale, deploy from Git
- **Domain:** `ottawaweekly.ca` via Canadian registrar — `.ca` TLD reinforces local credibility
- **ESP:** Beehiiv embed for forms — no custom backend for email capture
- **Analytics:** Plausible or Fathom — privacy-respecting, no cookie banner required, < 1KB

### Performance Targets
- Lighthouse 90+ on Performance, Accessibility, SEO, Best Practices
- FCP < 1.5s on simulated 4G
- Images: WebP/AVIF with width/height attributes set
- No third-party scripts except ESP embed + analytics (both async)

### SEO Requirements
- Unique `<title>` + `<meta description>` on every page
- Open Graph + Twitter Card tags on all issue pages
- Canonical URLs set correctly
- `sitemap.xml` auto-generated by Astro
- `robots.txt` excluding `/thank-you` and `/confirm`

### Accessibility
- All images have `alt` text; form inputs have `<label>` elements
- WCAG AA color contrast throughout
- Fully keyboard-navigable; visible focus states

---

## 8. Out of Scope (v1)

- User accounts, saved issues, preferences
- Comments or community features
- Paid subscriptions / paywalled content
- Advertiser/sponsor management
- Public event submission form
- Search (defer until 30+ issues)
- RSS feed (easy Astro add-in v1.1)
- Dark mode
- French language version
- Automated social posting

---

## 9. Success Metrics

| Metric | 30-Day Target | 90-Day Target |
|---|---|---|
| Confirmed subscribers | 100 | 500 |
| Homepage conversion rate | 3–5% | 5–8% |
| Weekly new subscribers | 20–30 | 50–100 |
| Double opt-in confirm rate | 70%+ | 70%+ |

**The site is working if**, 90 days post-launch: the list grows week over week, Lighthouse scores stay above 90, and the operator can publish a new issue by adding one Markdown file — without touching any other code.

---

## 10. Critical Files to Create (When Building)

| File | Purpose |
|---|---|
| `src/pages/index.astro` | Homepage |
| `src/pages/archive.astro` | Archive index |
| `src/pages/issues/[slug].astro` | Dynamic issue route |
| `src/pages/about.astro` | About page |
| `src/pages/thank-you.astro` | Post-signup page |
| `src/pages/confirm.astro` | Post-confirmation page |
| `src/content/issues/*.md` | One file per newsletter issue |
| `src/content/config.ts` | Astro content collection schema |
| `tailwind.config.js` | Design token configuration |
| `public/logo.svg` | Maple leaf logo mark |
