# Code overview

A walkthrough of how the codebase fits together, written for someone who's just cloned the repo and is wondering "where does X live and why is it shaped this way."

For *why* we made each architectural decision, see the design docs under [`hacky-hours/02-design/`](../hacky-hours/02-design/) and the ADRs under [`hacky-hours/02-design/decisions/`](../hacky-hours/02-design/decisions/).

---

## The 5-minute mental model

1. **Static site.** Astro builds HTML at build time. There is no backend, no API, no server-side rendering at runtime.
2. **Tax content lives in YAML.** Each tax is one file under `src/content/taxes/<lang>/<id>.yaml`. The structure is enforced by a Zod schema in `src/content.config.ts`. If a YAML field is wrong, the build fails. If a `filing_url` is wrong, link-check CI flags it (TODO).
3. **The home page is the deck.** A card-at-a-time view of taxes, navigated by Previous / Next / dot indicators / arrow keys. Each card carries everything to act on (status, calculator, file button) without leaving the page. The detail page (`/[slug]`) exists for depth.
4. **Personalization is a 2-question survey.** Filing status (single/joint) and taxable income. Optional, fully client-side. Portland residency is assumed because the site is "PDX taxes". Answers live in `localStorage` only as `pdx-taxes:profile:v2`. The survey filters the deck to taxes that likely apply.
5. **Estimator is a single shared modal.** The "Tax Status" action card on the home page opens a modal that reuses the same `<Survey>` component as the first-time quiz. Each tax card shows a per-card live estimate. The aggregate total lives in the sticky header.
6. **Calendar reminders are `.ics` downloads** built in the browser, not on a server. RFC 5545 compliant. They include 14-day and 1-day pre-event alarms.
7. **i18n is explicit.** Two locales currently — `en` (default, no URL prefix) and `es` (under `/es/`). Every UI string is in `src/i18n/ui.ts`. Every tax exists as two YAML files (one per language). Adding a third language is a content task, not an architecture task.
8. **GitHub Pages with a base path.** Production URL is `https://bjamba.github.io/pdx-taxes/`. The base path `/pdx-taxes` is prefixed to every internal link by the `url()`, `localeHome()`, and `taxUrl()` helpers in `src/i18n/ui.ts`.

---

## File-by-file tour

### Configuration

| File | What it does |
|------|--------------|
| `astro.config.mjs` | Astro config: `site` + `base` for GH Pages, i18n routing (en, es), trailing-slash policy |
| `tsconfig.json` | TS strict mode, extends Astro's strict config |
| `package.json` | Scripts: `dev`, `build`, `preview`, `check`. Dependencies: Astro, @fontsource/fraunces |
| `.github/workflows/deploy.yml` | On push to main → install → telemetry disable → build → deploy to GH Pages |

### Content (the source of truth)

```
src/content/taxes/
├── en/
│   ├── arts-tax.yaml
│   ├── multnomah-pfa.yaml
│   └── metro-shs.yaml
└── es/
    ├── arts-tax.yaml             ← mirrors en/arts-tax.yaml
    ├── multnomah-pfa.yaml
    └── metro-shs.yaml
src/content.config.ts             ← Zod schema for the above
```

Each YAML file is one tax in one language. The schema (`src/content.config.ts`) is the single source of truth for shape — TypeScript types are derived from it, and the build fails if any YAML doesn't conform.

**Key decision:** two collections (`taxes-en`, `taxes-es`) rather than one collection with translations embedded. This keeps each language self-contained and makes adding a third language a matter of "add another folder + another collection."

### Internationalization

```
src/i18n/ui.ts
```

A single file containing:

- `languages` — locale code → display name in its own language
- `ui` — every translatable UI string, keyed by a stable identifier, per locale
- `t(lang, key)` — translation lookup with English fallback
- `url(path)` — prepends the GH Pages base path
- `localeHome(lang)` — `/` (en) or `/es` (es), with base prefix
- `taxUrl(lang, slug)` — `/<slug>` (en) or `/<lang>/<slug>` (es), with base prefix

Server-rendered Astro components import `t`, `url`, etc. directly. Client-side scripts get the base path via a `data-base` attribute set at render time (see `LanguageSwitcher.astro`).

### Layouts and pages

```
src/layouts/BaseLayout.astro      # html shell, header, main, footer, ChecklistScript
src/pages/
├── index.astro                   # English home (deck of taxes)
├── [slug].astro                  # English tax detail
├── deadlines.astro               # Forms-arriving + filing deadlines, with .ics buttons
└── es/
    ├── index.astro
    ├── [slug].astro
    └── deadlines.astro
```

`[slug].astro` uses Astro's `getStaticPaths()` to pre-render one HTML file per tax at build time.

### Components

```
src/components/
├── BrandMark.astro               # Three-circles SVG (one per jurisdiction)
├── Header.astro                  # Wordmark + nav + LanguageSwitcher
├── Footer.astro                  # Disclaimer + links
├── LanguageSwitcher.astro        # <select> dropdown; rewrites window.location on change
├── Welcome.astro                 # First-visit greeting card
├── Survey.astro                  # 3-question form (residency, filing, income)
├── Result.astro                  # "Looks like N of M apply" banner + edit/show-all
├── TaxDeck.astro                 # The card deck — pulls SegmentedStatus + Estimator
├── TaxCard.astro                 # Older list-style card (no longer used on home, but kept for reference)
├── SegmentedStatus.astro         # 4-option status control (not yet / doing / done / doesn't apply)
├── Estimator.astro               # Collapsible <details> calculator block
├── Aggregate.astro               # Live total across visible estimators
├── Celebration.astro             # All-handled state replacing the progress bar
├── Disclaimer.astro              # The canonical "this is not tax advice" callout
└── ChecklistScript.astro         # The brain — see "The big script" below
```

### Libraries

```
src/lib/
├── calculators.ts                # Pure tax-estimation functions (typed, exported)
└── calendar.ts                   # .ics generation (RFC 5545)
```

These are also inlined in `ChecklistScript.astro` because that script runs as `is:inline` (no module bundling). The .ts files document and export the same logic in a way TypeScript / unit tests can reach.

### Styles

```
src/styles/global.css
```

One stylesheet. Custom properties for the locked palette (see [the palette ADR](../hacky-hours/02-design/decisions/2026-04-26-color-palette-wcag-aa.md)), spacing scale, type scale, radii, shadows. BEM-ish class naming.

The CSS also implements the **state machine** for the home page via attribute selectors:

```css
[data-state="welcome"] .js-survey, [data-state="welcome"] .js-deck { display: none; }
[data-state="result"]  .js-welcome, [data-state="result"]  .js-survey { display: none; }
/* ...etc */
```

---

## The big script: `ChecklistScript.astro`

This is the single client-side script that powers the interactive parts. It's an `is:inline` IIFE so it runs immediately, before any module hydration, to avoid a visible state flash.

It does five things:

### 1) Persist the user's profile and progress

Two `localStorage` keys, both versioned:

- `pdx-taxes:profile:v1` — the survey answers, or `{ showAll: true }` if they skipped
- `pdx-taxes:checklist:v1` — `{ items: { <taxId>: { status, updated_at } } }`

Schema-validated on read. Corrupt data is silently dropped, not crashed on.

### 2) Drive the home-page state machine

The `data-state` attribute on the `[data-page="home"]` div is set to one of:

- `welcome` — first visit, show Welcome card
- `survey` — answering the survey
- `result` — has profile, show personalized result + filtered deck
- `skipped` — explicitly chose to skip, show full deck + a "want a personalized list?" banner
- `done` — all visible items handled, show Celebration card

CSS hides/shows everything else based on this single attribute.

### 3) Apply applicability logic

Conservative: when in doubt, INCLUDE.

```js
function appliesTo(taxId, profile) {
  if (!profile || profile.showAll) return true;
  switch (taxId) {
    case 'arts-tax':       return ['portland', 'unsure'].includes(profile.residency);
    case 'multnomah-pfa':  return inMultnomah && overThreshold;
    case 'metro-shs':      return inMetro && overThreshold;
    default:               return true;  // unknown taxes always show
  }
}
```

When you add a tax, **update this function** or the new tax will be filtered to never appear under personalization.

### 4) Run the inline calculators

`computeArts()`, `computePFA()`, `computeSHS()` — pure JS ports of the typed `src/lib/calculators.ts`. Listening to input events updates the visible result and the running aggregate total. Filing-status defaults are pulled from the survey when available.

### 5) Generate `.ics` calendar files

`buildICS(events)` and `downloadICS(filename, events)` — vanilla string-builder + Blob + anchor click. No dependencies. Each event includes 14-day and 1-day VALARMs.

The single `bindCalendar()` function wires three button types:

- Per-card "Add deadline to calendar" (`.js-calendar-add`)
- Aggregate "Add every deadline" on the home page (`.js-calendar-add-all`)
- Per-row buttons on the `/deadlines` page (`.js-calendar-add-deadline`)

---

## How a single user-flow works (worked example)

User lands on `/pdx-taxes/`:

1. `index.astro` renders all states (welcome, survey, result, deck, celebration, etc.) but they're all hidden via `data-state="loading"`.
2. `ChecklistScript.astro` runs immediately (inline IIFE).
3. Reads `localStorage` → no profile found → sets `data-state="welcome"` on the home root div.
4. CSS `[data-state="welcome"] .js-survey { display: none; }` etc. — only the Welcome card is now visible.
5. User clicks "Let's do it" → JS sets `data-state="survey"`.
6. CSS reveals the Survey form.
7. User submits → JS writes profile to `localStorage`, sets `data-state="result"`.
8. JS computes which taxes apply, sets `data-applies` on each deck card, hides non-applicable ones via CSS, updates the Result banner copy.
9. User opens an Estimator on a card → input events fire → `computeXxx()` runs → result rendered → Aggregate banner updates.
10. User clicks "Add deadline to calendar" → `buildICS()` produces a string → Blob URL → anchor click → file downloads.

No network requests at any point.

---

## How to make a small change

### "Update the Arts Tax fee from $35 to $40"

Edit `src/content/taxes/en/arts-tax.yaml` and `src/content/taxes/es/arts-tax.yaml`:

```yaml
rate:
  type: flat
  amount_usd: 40            # was 35
rate_summary: A flat $40 per person, per year.
last_verified: "2026-XX-XX" # update this!
```

Then update the inline calculator in `src/components/ChecklistScript.astro`:

```js
function computeArts(qualifies) {
  return qualifies ? { applies: true, amount: 40 } : ...  // was 35
}
```

And the typed version in `src/lib/calculators.ts` to match. Open a PR.

### "Add a calculator coming-soon notice for PFA"

Already done — see `Estimator.astro` for the pattern. PFA's progressive math is implemented; the comment is here as a placeholder for when we want to defer something.

### "Add a Vietnamese language"

See [`CONTRIBUTING.md`](../CONTRIBUTING.md) → "Add a new language."

---

## What this code is intentionally *not* doing

- Server-side rendering at request time
- Any kind of API call (no `fetch`, no `XHR`)
- Any kind of analytics
- Any third-party JS at all (Astro CLI telemetry is disabled in CI)
- Any tracking pixels, social embeds, video embeds
- Any cookies — the site sets none
- Any framework hydration on most pages — only the home page has interactive bits, and they're inline JS, not hydrated components

These are intentional. Don't add any of them without an issue + ADR first.

---

## Where to learn more

- [`README.md`](../README.md) — what this project is
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — how to contribute
- [`SECURITY.md`](../SECURITY.md) — how to report security issues
- [`hacky-hours/01-ideate/PRODUCT_OVERVIEW.md`](../hacky-hours/01-ideate/PRODUCT_OVERVIEW.md) — *what* and *why*
- [`hacky-hours/02-design/`](../hacky-hours/02-design/) — *how* (architecture, data model, accessibility, security, etc.)
- [`hacky-hours/02-design/decisions/`](../hacky-hours/02-design/decisions/) — locked architectural decisions with reasoning
- [`hacky-hours/03-roadmap/ROADMAP.md`](../hacky-hours/03-roadmap/ROADMAP.md) — what's coming next
