# Roadmap

> **North star:** A Portland resident can use this site to identify, track, and complete every local **separate-return** tax they owe for **TY 2026**, by filing season early 2027.

Milestones are **outcome-based** ("a user can do X"), not task-based. Tasks live in `BACKLOG.md`.

---

## M0 — Foundation

**Outcome:** The repo is real. A blank shell of the site is live on GitHub Pages, with all guardrails in place. No tax content yet.

This milestone ships the scaffolding so feature work after this is small, fast, and safe.

- Astro 5.x + TypeScript + Preact configured per [SSG ADR](../02-design/decisions/2026-04-26-static-site-generator.md)
- Content Collections + Zod schemas per [Schema ADR](../02-design/decisions/2026-04-26-schema-validation.md)
- Color palette + type system as CSS variables per [Palette ADR](../02-design/decisions/2026-04-26-color-palette-wcag-aa.md)
- Layout shell: header (lowercase wordmark, view tabs, language switcher placeholder), footer (disclaimer + nav)
- Disclaimer component + canonical wording per `SECURITY_PRIVACY.md`
- "Report an issue" link wired to a GitHub Issue template
- GitHub Pages deploy via Actions (build → deploy on merge to `main`)
- CI: schema validation, link allowlist, contrast check on palette CSS, axe-core smoke
- `LICENSE` (MIT), `LICENSES.md` (content under CC BY 4.0), `README.md`, `SECURITY.md`, `CONTRIBUTING.md`
- `.gitignore`, dependabot, branch protection on `main`

**Why this is a separate milestone:** Without it, every feature PR carries half a foundation with it. Spending 1–2 weeks here saves chaos later.

---

## MVP — "Find my taxes" (English, individual, no calculators)

**Outcome:** A Portland resident, on their phone, in English, can land on the site and see every local separate-return personal-income tax they likely owe, with a deadline, a filing link, and a checkbox they can check off as they file. Nothing more.

### What's in MVP

- **Three tax records, fully filled:** Arts Tax, Multnomah PFA, Metro SHS personal
- **Home page** with intro, the three tax cards, and a clear "what is this site" section
- **Tax detail page** for each (summary, who owes, rate, deadline, filing link, free-filing resources, sources, `last_verified`)
- **Friendly callouts** (the ☼ Terracotta variant) where they help — e.g., the "request your PIN early" note
- **Checklist persistence** — `localStorage` only, per `DATA_MODEL.md`. Mark each tax as Not started / In progress / Done / Not applicable.
- **Mobile-first responsive** — works on a 360px viewport without zoom
- **Accessibility** — WCAG AA pass; axe-core CI green; manual keyboard + VoiceOver smoke before release
- **Disclaimer** on every page footer, plus inline on tax detail
- **`last_verified` surfaced** on every tax page
- **Report-issue link** on every tax page

### What's explicitly NOT in MVP (and why)

| Deferred | To | Reason |
|----------|-----|--------|
| Calculators | V1 | Checklist + filing link alone proves the core value. Calculator UX is its own design pass. |
| Business view (BLT, MCBIT, Metro SHS Business) | V1 | Three more tax records and a view-toggle UX double the surface area. Personal taxes cover the largest audience. |
| Multilingual (Spanish, Vietnamese, Chinese, Russian, …) | V1 | i18n **routing infrastructure** is in M0/MVP; **content translations** wait. Adding a second language is then a content task, not an architectural one. |
| Reference catalog (federal, OR state, niche business taxes) | V1 | Educational repository is part of the long-term vision, not the headline value. |
| Refinement questions ("Do you live in Multnomah County?") | V1 | Default-to-include is fine for three taxes; only worth the UX when there are 6+. |
| Search | V2 | At three or six items there's nothing to search. |
| Dark mode | V2 | Needs its own contrast ADR and visual review. Not blocking value. |
| Custom domain | V2 | `*.github.io` works fine. |

### MVP "definition of done"

- [ ] All three tax records pass schema validation; `last_verified` within 30 days of release
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility = 100
- [ ] Manual keyboard + VoiceOver smoke on home + 1 tax detail
- [ ] All external links pass the allowlist + link-checker
- [ ] Disclaimer visible on every page
- [ ] First public URL works end-to-end on a real low-end phone

**Realistic scope for one focused builder:** ~3–5 weeks after M0 lands.

---

## V1 — "Useful enough to recommend"

**Outcome:** The site is genuinely the first thing a Portlander should open during filing season. Calculators, two languages, business view, and the educational reference catalog are all live.

- **Calculators** for the 6 separate-return taxes (Arts, PFA, Metro SHS personal, Portland BLT, MCBIT, Metro SHS Business). Per [BUSINESS_LOGIC.md](../02-design/BUSINESS_LOGIC.md). PFA bracket math locked in an ADR before that calculator ships.
- **Business view** — view toggle (Individual / Business / Reference), three additional tax records, business-flavored UX adjustments where needed
- **Translations live for: Spanish + Vietnamese** (the largest non-English communities in Multnomah County). Translation review workflow ADR before the first non-English content merges.
- **Reference catalog** — federal income tax, Oregon state income tax, and the niche business taxes (HVT, CES, CET, lodging, cannabis) as `scope: informational` records. Each clearly labeled.
- **Refinement questions** on the home page: residency + filing-status + income-range, narrowing the active checklist
- **`/privacy`, `/about`, `/methodology`** static pages
- **Search** (Pagefind or similar — static, client-side, zero backend)
- **Annual-review playbook** — documented process for the late-2026 verification pass before TY 2026 filing season

### V1 "definition of done"

- [ ] All 6 separate-return calculators pass official-example test cases
- [ ] Spanish and Vietnamese pages render cleanly, no fallback banners on core flows
- [ ] Reference catalog labels are unambiguous — `scope` rendering tested with real users (informal)
- [ ] Manual review by at least one non-tech tester (the "kitchen-table" check)
- [ ] Annual-review playbook executed once, end-to-end, with all `last_verified` dates refreshed

**Target:** ship by **mid-October 2026**, leaving 6+ months of buffer + iteration before TY 2026 filing season closes April 2027.

---

## V2+ — "Full vision"

No fixed order. Picked up based on usage, feedback, and capacity after V1.

- **Full multilingual coverage** matching official Portland Revenue Division: Chinese, Russian, Arabic (RTL), Somali, Ukrainian, Romanian, Japanese, Laotian
- **Translation contributor workflow** — public process for community translators
- **Dark mode** (needs contrast ADR)
- **Custom domain**
- **Advanced calculator features** — multiple tax-year support, side-by-side comparison, "what-if" scenarios
- **Annual-review automation** — scripted reminders, link-checker dashboards, machine-assisted change detection on jurisdiction sites
- **Resident scenario walkthroughs** (e.g., "I just moved to Portland in October — what do I owe?")
- **Plain-language explainers** beyond per-tax pages — "what is Metro?", "why are these separate?"
- **Print-friendly checklist** (PDF generation, client-side)
- **Accessibility re-audit** by a paid auditor, ideally someone working with the actual audience
- **Privacy-respecting analytics** decision (default still: none)

---

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Tax rules change between MVP and TY 2026 filing | High | High | `last_verified` discipline; CI link checking; annual review playbook |
| Translation quality issues damage trust | Medium | High | Never ship machine-translated tax content unreviewed; flag per-doc translation status |
| MVP scope creeps into V1 territory | High | Medium | This roadmap. Push back hard. The MVP is small for a reason. |
| PFA bracket math interpretation is wrong | Medium | High | ADR + verification against official rules before PFA calculator ships in V1 |
| Single-maintainer burnout / capacity | High | Medium | Repo + design docs designed so others can pick up; framework + ADRs document why, not just what |
| Jurisdictions object to summarized content | Low | Medium | Content under CC BY; never copy verbatim; clear "unaffiliated" disclaimer; takedown-friendly process |
| GitHub Pages outage during filing week | Low | High | Acceptable risk for free hosting; revisit only if it happens |

---

## Sequencing principle

**Ship M0 → MVP → V1 in order.** Don't start V1 features until MVP is publicly live, even if M0 + MVP feel "almost done." Feedback from a real shipped MVP changes V1 priorities.
