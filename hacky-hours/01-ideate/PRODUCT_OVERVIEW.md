# Product Overview

A free, public, frictionless web resource that helps Portland-area taxpayers (individuals and businesses) understand and complete every local tax they're required to file each year.

## Who

Anyone required to pay local taxes in the City of Portland, Metro, or Multnomah County — including residents, non-resident workers, and businesses operating in the area.

The user we are most accountable to: **non-technical, potentially low-income, potentially non-English-speaking taxpayers** who are currently underserved by official sources. If the experience works well for them, it works well for everyone.

The site offers two top-level views: **Individual** and **Business**.

## What

A static, multilingual website that, for each applicable local tax:

- Lists what the tax is and who owes it
- Explains what's needed to file (forms, deadlines, account/ID requirements)
- Provides simple **estimator calculators** (rough estimates only — explicitly not tax advice)
- Links directly to the official filing site or contact
- Points to free filing resources (explicitly **not** TurboTax or paid prep services)
- Lets the user track personal progress with a checklist (client-side, no accounts)

The site is **explicitly not legal, tax, or financial advice**. Disclaimers are visible without becoming friction.

## Where

- **Platform:** Responsive static website. Works on phone and desktop.
- **Hosting:** GitHub Pages (free, version-controlled, no server to operate).
- **Languages:** Match the language coverage offered by official Portland / Metro / Multnomah County tax documentation, so the resource is reachable by the same population the official sites are required to serve.

## When

- **Target:** Usable end-to-end for **Tax Year 2026** filings (filing season early 2027).
- **Definition of success at one year:** A Portland resident can use this site to identify, track, and complete every local tax they owe for TY 2026 without missing one.

## Why

Local taxes in the Portland area are itemized across multiple jurisdictions (City of Portland, Metro, Multnomah County) rather than rolled into a single filing. Each has its own website, account system, ID/PIN process (often gated by a paper letter), forms, and deadlines.

The result: it is easy to lose track of what you owe, painful to navigate, and especially burdensome for people who are new to the area, low-income, or non-English-speaking. The information exists — it is fragmented and unfriendly.

This product is a **navigational layer**, not a replacement for filing. We do not file taxes for users. We help them know what to file, where to file it, and when.

## Constraints & Values (confirmed)

### Licensing

- **Code:** **MIT License**.
- **Content:** **CC BY 4.0** for tax descriptions and translations.
- Detailed in `02-design/LICENSING.md`.

### Privacy

- **Zero data collection.** No accounts, no analytics, no third-party trackers, no cookies.
- Checklist progress and calculator inputs live in the user's browser (`localStorage`) only — they never leave the device.
- Detailed in `02-design/SECURITY_PRIVACY.md`.

### Infrastructure

- **Hosting:** GitHub Pages. No backend. Zero servers to operate.
- Detailed in `02-design/ARCHITECTURE.md`.

### Content maintenance

- Tax content lives as **structured, version-controlled YAML files** (one per tax). Each carries a `last_verified` date that surfaces in the UI.
- Annual review process; automated link-checking in CI.
- Schema and update rules in `02-design/DATA_MODEL.md` and `02-design/BUSINESS_LOGIC.md`.

### Languages

- Match the language coverage offered by official Portland Revenue Division materials, **as closely as possible**: Spanish, Vietnamese, Chinese, Russian, Arabic, Somali, Ukrainian, Romanian, Japanese, Laotian.
- MVP starts with a subset (English + the largest non-English communities), with the rest added incrementally.
- Tax content is never machine-translated unreviewed. UI strings can be machine-translated as a starting point.

### Accessibility

- WCAG 2.1 AA floor. Plain language target: 8th-grade reading level or lower.
- Detailed in `02-design/ACCESSIBILITY.md`.

## Scope (confirmed)

**Primary focus:** Taxes that require a **separate return** beyond the federal and Oregon state returns — Arts Tax, Multnomah PFA, Metro SHS (personal and business), Portland BLT, MCBIT, plus niche business taxes (HVT, CES, CET, lodging, cannabis).

**Secondary scope (educational repository):** A reference catalog of **all** taxes in the Portland landscape — including federal and Oregon state — labeled clearly so users understand which require separate filings vs. which are reported on existing returns vs. which are informational only.

This makes the site simultaneously:
- A **checklist tool** (separate-return taxes, the active workflow)
- An **educational resource** (full landscape, the reference catalog)
- A **navigational layer** (links out to every official filing source)

---

## Open questions for Step 2 (Design)

1. Static site generator: Astro vs. Eleventy vs. plain HTML?
2. i18n approach: which languages, sourced from where, who reviews translations?
3. Content authoring: Markdown + YAML frontmatter vs. structured YAML/JSON per-tax?
4. Disclaimer placement and wording — visible but not friction-inducing.
5. Checklist UX: progress indicator on the home page? Per-tax page? Both?
6. Keeping content current: schedule + responsible-party model.
