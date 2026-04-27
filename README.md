# pdx taxes

A free, frictionless guide to local taxes in Portland, Multnomah County, and Metro.

**Live site:** [bjamba.github.io/pdx-taxes](https://bjamba.github.io/pdx-taxes/)

> This is an **unofficial community resource**. It is not affiliated with the City of Portland, Multnomah County, or Metro. The information here is provided for general guidance only and is **not legal, tax, or financial advice**.

---

## What this is

Portland-area taxpayers file up to three local taxes that are *separate* from federal and Oregon state — Arts Tax, Multnomah Preschool For All (PFA), and Metro Supportive Housing Services (SHS) — each with its own website, account system, and PIN-by-paper-mail process. It's confusing, and it's especially burdensome for new arrivals, low-income, and non-English-first residents.

**This site is a navigational layer.** We don't file taxes for you. We help you:

- Identify which local taxes likely apply to you (a 3-question survey, optional, fully client-side)
- Know what's owed, when, and how to file (each tax in its own card, with a direct link to the official filing site)
- Estimate amounts (per-tax calculators with a running aggregate total)
- Add deadlines to your calendar (downloadable `.ics` files with reminders)
- Track your progress through the season (a checklist that lives only in your browser)
- Read it in the language you're most comfortable with (English and Spanish to start, more to come)

## Trust contract with users

This product exists to be useful to vulnerable populations. The architecture honors that:

- **Zero data collection.** No accounts. No analytics. No cookies. No third-party trackers. No telemetry from build tools (we audit on every dependency add — see [`hacky-hours/02-design/SECURITY_PRIVACY.md`](./hacky-hours/02-design/SECURITY_PRIVACY.md)).
- **Static-only.** The site is built once and served as plain HTML/CSS/JS from GitHub Pages. There is no server. There is no database. There is no API.
- **All state lives in your browser.** Your survey answers, checklist, and calculator inputs are in `localStorage`. They never leave your device. We can't see them, can't subpoena them, can't lose them in a breach.
- **Calendar files are generated client-side.** When you "add to calendar," your browser builds the `.ics` and downloads it. Nothing is uploaded.
- **Open source under permissive licenses.** Code under MIT (LICENSE), content under CC BY 4.0 (see LICENSES.md).

---

## Quick start (for developers)

```bash
git clone https://github.com/bjamba/pdx-taxes
cd pdx-taxes
npm install
npm run dev
```

Open <http://localhost:4321/pdx-taxes/> for the English site, <http://localhost:4321/pdx-taxes/es> for Spanish.

The base path `/pdx-taxes/` matches the GitHub Pages production deploy. To run without it locally, edit `astro.config.mjs` and set `base: ''` temporarily — but don't commit that change.

### Other commands

```bash
npm run build      # production build into dist/
npm run preview    # preview the production build
npm run check      # TypeScript + Astro diagnostics
```

---

## Where things live

```
pdx-taxes/
├── src/
│   ├── content/taxes/              # Tax content as YAML (the source of truth)
│   │   ├── en/                     # English content
│   │   │   ├── arts-tax.yaml
│   │   │   ├── multnomah-pfa.yaml
│   │   │   └── metro-shs.yaml
│   │   └── es/                     # Spanish translations (mirror of en/)
│   ├── content.config.ts           # Zod schema for the tax YAML files
│   ├── i18n/ui.ts                  # UI strings + url helpers
│   ├── lib/
│   │   ├── calculators.ts          # Pure tax-estimation functions
│   │   └── calendar.ts             # .ics generation
│   ├── styles/global.css           # Design system + components
│   ├── components/                 # Astro components — see CODE_OVERVIEW.md
│   ├── layouts/BaseLayout.astro
│   └── pages/                      # File-based routing
│       ├── index.astro             # English home (deck of taxes)
│       ├── [slug].astro            # English tax detail
│       ├── deadlines.astro         # Deadlines + forms-arriving page
│       └── es/                     # Spanish mirror of all the above
├── hacky-hours/                    # Design + planning docs (read these!)
│   ├── 01-ideate/PRODUCT_OVERVIEW.md
│   ├── 02-design/                  # ARCHITECTURE, DATA_MODEL, USER_JOURNEYS, etc.
│   │   └── decisions/              # Locked architectural decisions (ADRs)
│   ├── 03-roadmap/ROADMAP.md
│   └── 04-build/{BACKLOG,CHANGELOG}.md
├── docs/
│   └── CODE_OVERVIEW.md            # How the code fits together
├── .github/workflows/deploy.yml    # GitHub Pages auto-deploy
├── CONTRIBUTING.md                 # How to contribute
├── SECURITY.md                     # How to report a security issue
├── LICENSE                         # MIT (code)
├── LICENSES.md                     # MIT (code) + CC BY 4.0 (content)
└── astro.config.mjs                # site + base path for GH Pages
```

For a deeper code walkthrough, read [`docs/CODE_OVERVIEW.md`](./docs/CODE_OVERVIEW.md).

For *why* the code is shaped this way, read [`hacky-hours/02-design/`](./hacky-hours/02-design/) — the design docs predate the code and explain the reasoning.

---

## Contributing

Welcome! This is a community resource and we'd love help. The most useful things you can do:

1. **Tell us if a tax fact is out of date.** Open an issue using the "Report an issue" template — we'll ship a fix.
2. **Improve a translation.** Spanish was machine-drafted and human-edited; native speakers improving phrasing is gold. The translations live in `src/content/taxes/es/` and `src/i18n/ui.ts`.
3. **Add a language.** See `CONTRIBUTING.md` for the step-by-step.
4. **Add a missing tax** (especially business taxes — Portland BLT, MCBIT, Metro SHS Business — and lighter-coverage ones like Heavy Vehicle Use Tax). See `CONTRIBUTING.md`.
5. **Improve the calculators.** PFA progressive math is verified against official rules but corner cases are appreciated.
6. **Make the site more accessible.** Real-device testing, screen-reader feedback, plain-language copy edits.

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a PR.

---

## What this is *not*

- A filing system — we never receive, store, or transmit your personal financial data.
- A CMS — content is in version control. Edits go through pull requests, which is intentional: it's a public, auditable trail.
- Personalized — there are no accounts. The "checklist" is browser-local state, scoped to a browser.
- Authoritative — we summarize and link out. The official jurisdictions are the source of truth. We help you find them.

---

## License

Two-license model:

- **Code** under [MIT](./LICENSE)
- **Content** (tax descriptions, translations, prose under `src/content/` and `src/i18n/`) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — see [`LICENSES.md`](./LICENSES.md)

Inbound = outbound. No CLA. Contributors retain copyright in their contributions but agree to license them under these licenses.

---

## Acknowledgements

The site exists because the Portland Revenue Division, Multnomah County, and Metro publish solid official information that's nonetheless scattered across many pages. We summarize and link out — never replace.

The framework that shaped this project ([Hacky Hours](https://github.com/empathetech/hacky-hours-docs)) drove the discipline of designing before coding, and the documentation under `hacky-hours/` is the result.
