# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Renamed action cards: "Tell me about your tax status" → "Tax Status"; "Save tax deadlines to calendar" → "Tax Calendar"
- Modal estimator now reuses the in-page Survey component verbatim — same card chrome, same layout, same color treatment as the first-time quiz
- Restored the "pdx taxes" wordmark next to the SVG home mark in the sticky header (hidden on screens ≤540 px)
- Hero h1 ("Don't miss a Portland tax this year.") forced to the topmost element on every state of the home page
- Survey simplified to two questions (filing status + income) — Portland residency assumed since the site is for PDX taxes
- Arts Tax exemption now derived from `income < $1000` instead of a separate user-facing checkbox
- Mobile sticky header: language switcher and status badges share one row again instead of stacking
- Action cards: `align-items: flex-start` so the icon/title/lead stack consistently regardless of lead-text length
- Detail and deadlines pages: removed redundant Disclaimer card (footer carries the disclaimer); added a "← All taxes" back link to deadlines pages

### Removed
- Six unused components: `Estimator.astro`, `Aggregate.astro`, `Result.astro`, `StatusPill.astro`, `TaxCard.astro`, `BrandMark.astro`
- Dead `.calc-exempt*` CSS block (~46 lines) in `global.css`
- Dead i18n keys: `calc.privacy`, `card_est.exempt`, `calc.arts_legend`, `calc.arts_exempt_label`, `calc.arts_exempt_hint`, `survey.q1_*` (residency variants) — EN and ES

## [v0.4.0] — Iteration 4 (2026-04-26)

### Added
- Sticky site header carrying live status: estimated total, progress bar, language switcher
- Deadlines page (`/deadlines`) with .ics download for filing dates and forms-arriving dates; per-row + bulk download
- "Tax Calendar" action card on the home page linking to `/deadlines`

### Changed
- Estimator converted from inline panel to dismissable modal/drawer
- Tax list converted to card-deck view with prev/next + dot pagination
- Calculators consolidated into a single shared `CalcPanel` modal driven by the unified profile
- Result banner removed; aggregate total now lives in the sticky header

## [v0.3.0] — Iteration 3 (2026-04-26)

### Added
- Per-card estimate slot showing live calculator output in each tax card
- Aggregate "estimated total" calculation across applicable taxes
- View toggle: "For me" (filtered by survey) vs. "All taxes"

### Changed
- Profile + calculator state merged into a single `pdx-taxes:profile:v2` localStorage key
- Survey trimmed to three inputs (later reduced again to two)
- Color palette and typography polish: warmer cream/moss/terracotta, Fraunces display face

### Fixed
- `showAll` no longer wipes the rest of the profile when toggled
- PFA rate display showed "1" instead of "1.5%" — content + render fixes
- View toggle visibility no longer disappears when activated

## [v0.2.0] — Iteration 2 (2026-04-26)

### Added
- Personalization survey + welcome card with state-machine driven UI (`data-state="loading|welcome|survey|result|skipped|done"`)
- Done-state celebration when all applicable taxes are checked off
- Inline calculators wired into per-tax cards
- Friendlier copy + voice pass across all UI strings
- English + Spanish wired end-to-end with i18n routing under `/es/`

## [v0.1.0] — M0 Foundation (2026-04-26)

### Added
- Hacky Hours framework scaffolded — IDEATION, PRODUCT_OVERVIEW, all 9 design docs (ARCHITECTURE, DATA_MODEL, USER_JOURNEYS, STYLE_GUIDE, ACCESSIBILITY, BUSINESS_LOGIC, SECURITY_PRIVACY, LICENSING, TESTING) plus RESEARCH_NOTES
- Three locked ADRs: static site generator (Astro 5), color palette (WCAG AA tested), schema validation (Astro Content Collections + Zod)
- ROADMAP with M0/MVP/V1/V2+ milestones
- MIT LICENSE at repo root; LICENSES.md clarifying code (MIT) vs. content (CC BY 4.0)
- README, CONTRIBUTING, SECURITY documentation
- Astro project bootstrap with i18n routing (English + Spanish, GitHub Pages base path)
- Three tax records authored bilingual: Portland Arts Tax, Multnomah Preschool For All, Metro Supportive Housing Services
- Home page with intro and tax cards; tax detail page template; language switcher; localStorage-backed checklist with progress bar; "clear my saved data" control
- Locked color palette + type system as CSS variables; mobile-first responsive layout
- Disclaimer component on every page; "unaffiliated" footer
- Astro telemetry **disabled**; tooling-telemetry audit policy added to SECURITY_PRIVACY.md
- GitHub Pages deploy on push to main

### Notes
- Zero tracking, zero analytics, zero accounts. Checklist state lives only in `localStorage`.
- All filing links validated manually against the official jurisdiction sources at `last_verified: 2026-04-26`.
- Preact integration listed in design docs but never adopted — vanilla `is:inline` IIFE used instead. Design docs amended in iteration 5.
