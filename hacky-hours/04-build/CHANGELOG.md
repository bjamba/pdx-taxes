# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Hacky Hours framework scaffolded — IDEATION, PRODUCT_OVERVIEW, all 9 design docs (ARCHITECTURE, DATA_MODEL, USER_JOURNEYS, STYLE_GUIDE, ACCESSIBILITY, BUSINESS_LOGIC, SECURITY_PRIVACY, LICENSING, TESTING) plus RESEARCH_NOTES
- Three locked ADRs: static site generator (Astro 5 + Preact), color palette (WCAG AA tested), schema validation (Astro Content Collections + Zod)
- ROADMAP with M0/MVP/V1/V2+ milestones and BACKLOG seeded for M0
- MIT LICENSE at repo root; LICENSES.md clarifying code (MIT) vs. content (CC BY 4.0)
- Astro project bootstrap with i18n routing (English + Spanish)
- Three tax records authored bilingual: Portland Arts Tax, Multnomah Preschool For All, Metro Supportive Housing Services
- Home page with intro, lead, and tax cards; tax detail page template; language switcher; localStorage-backed checklist with progress bar; "clear my saved data" control
- Locked color palette + type system as CSS variables; mobile-first responsive layout; warm cream/moss/terracotta visual language per STYLE_GUIDE
- Disclaimer component on every page; "unaffiliated" footer
- Astro telemetry **disabled**; tooling-telemetry audit policy added to SECURITY_PRIVACY.md

### Notes
- Zero tracking, zero analytics, zero accounts. Checklist state lives only in `localStorage`.
- All filing links validated manually against the official jurisdiction sources at `last_verified: 2026-04-26`.
