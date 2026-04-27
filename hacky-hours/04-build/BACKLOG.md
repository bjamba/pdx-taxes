# Backlog

Queued tasks for the **current milestone**. Tasks are added during planning and removed when their PR is merged. Completed work goes to `CHANGELOG.md`.

**Current milestone: M0 — Foundation**

---

## M0 — Foundation

### Repo setup
- [ ] Initialize `git` and create the GitHub repo (private until M0 ships, then public)
- [ ] Add `LICENSE` (MIT) at repo root
- [ ] Add `LICENSES.md` clarifying code (MIT) vs. content (CC BY 4.0)
- [ ] Add `README.md` — what this is, the disclaimer, how to contribute, link to `hacky-hours/`
- [ ] Add `SECURITY.md` per `SECURITY_PRIVACY.md`
- [ ] Add `CONTRIBUTING.md` (inbound = outbound, no CLA, plain-language voice rules)
- [ ] Add `.gitignore` (Node, OS, build output)
- [ ] Add `CODE_OF_CONDUCT.md` (Contributor Covenant)
- [ ] Configure branch protection on `main` (require PR review, require checks)
- [ ] Configure Dependabot (security + minor updates)

### Astro project bootstrap
- [ ] `npm create astro@latest` with TypeScript strict
- [ ] Add Preact integration (for calculator islands later)
- [ ] Configure `astro.config.ts` with i18n routing (`en` default, locale list pulled from a config)
- [ ] Configure GitHub Pages adapter
- [ ] Project layout matches `ARCHITECTURE.md` (`src/`, `content/`, `i18n/`, `public/`, `tests/`)

### Content collections + schema
- [ ] Define `taxes` collection in `src/content/config.ts` with the Zod schema from the schema ADR
- [ ] Define `jurisdictions` reference collection
- [ ] Define `tax-years` reference collection
- [ ] Generate JSON Schema export to `schemas/tax.schema.json` for YAML editor autocomplete

### Layout & design system
- [ ] CSS variables for the locked palette (paper, surface, ink, moss, terracotta, semantic)
- [ ] Typography scale per `STYLE_GUIDE.md` (mobile-first, +1 step on ≥768px)
- [ ] Spacing scale (`--space-1` through `--space-8`)
- [ ] Layout component (`<BaseLayout>`) — header, main, footer, semantic landmarks
- [ ] Header component (wordmark, view tabs placeholder, language switcher placeholder)
- [ ] Footer component (disclaimer, About/Privacy/Methodology/Source links, last-updated)
- [ ] Button primitives (primary, secondary) per `STYLE_GUIDE.md`
- [ ] Status pill primitive (icon + word + color) — used in MVP
- [ ] Disclaimer callout primitive

### CI guardrails
- [ ] GitHub Actions workflow: install, build, test on every PR
- [ ] Schema validation runs in CI; build fails on any invalid tax record
- [ ] External link allowlist + link checker (lychee) — fail on broken `filing_url`
- [ ] Contrast check script (`scripts/check-contrast.ts`) runs on palette CSS changes
- [ ] axe-core via Playwright on built pages — fail on serious/critical
- [ ] HTML validation in CI
- [ ] Lighthouse CI on home page (Performance ≥ 95, Accessibility = 100)

### Deploy
- [ ] GitHub Pages deploy workflow on push to `main`
- [ ] First successful deploy of the empty shell to `*.github.io`
- [ ] HTTPS verified; security headers (CSP via `<meta>` per `SECURITY_PRIVACY.md`)

### "Report an issue" wiring
- [ ] GitHub Issue template `report-page.yml` with page slug, current `last_verified`, expected fields
- [ ] Footer link generates a pre-filled URL to the template

### M0 done
- [ ] Pre-merge checklist passes (`hacky-hours/02-design/TESTING.md`)
- [ ] Tag `v0.1.0` and run `/hacky-hours review 1` then `/hacky-hours update 1`

---

## MVP — "Find my taxes" (queued — not yet active)

The full MVP backlog is documented in `ROADMAP.md`. It activates once M0 ships. Top-level items, ordered:

1. Author tax record YAML for **Arts Tax**, **Multnomah PFA**, **Metro SHS personal** (one PR each, schema-valid, sources cited, `last_verified` set)
2. Home page (`/`) — intro, three tax cards, "what is this site"
3. Tax detail page template (`/[view]/[slug]`)
4. Checklist component with `localStorage` persistence, "Clear my saved data" button, schema-validated reads
5. Friendly callout component (Terracotta variant)
6. `last_verified` rendering with relative-time ("Verified 12 days ago") + absolute date on hover
7. Mobile real-device pass + VoiceOver smoke
8. MVP launch checklist (per `ROADMAP.md`)

---

## Notes

- New backlog items: append, don't insert. Order reflects priority within milestone.
- Each item should be small enough to ship in one PR. If it isn't, split it.
- Items linked to GitHub Issues will get a `#<number>` annotation after `/hacky-hours update 2`.
