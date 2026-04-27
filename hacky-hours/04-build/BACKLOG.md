# Backlog

Queued tasks for the **current milestone**. Tasks are added during planning and removed when their PR is merged. Completed work goes to `CHANGELOG.md`.

**Current milestone: V1 — "Useful enough to recommend"**

M0 (Foundation) and MVP ("Find my taxes") shipped. A chunk of V1 has shipped already too: personal-tax calculators, sticky header total/progress, deadlines page with .ics download, modal estimator, deck/card view, view toggle, English + Spanish. See `CHANGELOG.md`.

---

## V1 — remaining

Roughly priority-ordered. See `../03-roadmap/ROADMAP.md` §V1 for source-of-truth scope.

### Static info pages (quick wins)
- [ ] `/about` page — what this is, who built it, kitchen-table tone
- [ ] `/privacy` page — zero-data-collection statement, localStorage-only model, third-party hosting note
- [ ] `/methodology` page — how each calculator works, where the thresholds come from, "verified on" cadence

### Calculator math correctness
- [ ] ADR: PFA bracket math interpretation (write before any business calculator ships)
- [ ] Vitest test cases for `estimateArtsTax`, `estimatePFA`, `estimateMetroSHS` against official examples
- [ ] Eliminate duplication: `ChecklistScript.astro` `computeArts/PFA/SHS` should consume `src/lib/calculators.ts` (currently duplicated because of `is:inline`)

### Reference catalog
- [ ] Add `scope: 'informational'` to schema; render an "informational" affordance on cards
- [ ] Author records: federal income tax, Oregon state income tax, HVT, CES, CET, Portland lodging, cannabis
- [ ] Disclaimer language tuned for informational records

### Business view
- [ ] Three tax records: Portland BLT, Multnomah MCBIT, Metro SHS Business
- [ ] Three calculators (after PFA-math ADR + tests pattern is established)
- [ ] Individual / Business / Reference view toggle (extends current toggle)
- [ ] Business-flavored survey questions (sole prop vs. partnership vs. S-corp; gross receipts; etc.) — design before implement

### Vietnamese translation
- [ ] ADR: translation review workflow (who reviews, on what cadence, fallback handling)
- [ ] Add `vi` to `astro.config` i18n locales and `src/i18n/ui.ts`
- [ ] Author `src/content/taxes/vi/*.yaml` for the 3 personal taxes
- [ ] UI string translations for `vi`

### Search
- [ ] Add Pagefind (or similar static client-side search) to build pipeline
- [ ] Search UI in header — debounced, keyboard-first, no-network

### Annual review
- [ ] Document playbook: year-end checklist for refreshing thresholds, deadlines, filing URLs
- [ ] Run the playbook end-to-end before TY 2026 filing season

### V1 "definition of done" checks
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility = 100 (capture before/after)
- [ ] Manual non-tech tester pass ("kitchen-table check")
- [ ] All `last_verified` dates refreshed for TY 2026

---

## Backlog (no milestone — promote when ready)

- [ ] CI: schema validation + lychee link check on PR
- [ ] CI: axe-core via Playwright on built pages
- [ ] Dark mode palette (per `STYLE_GUIDE.md` placeholder)
- [ ] Issue template wiring (`/.github/ISSUE_TEMPLATE/report-page.yml`) — link from footer
- [ ] Open Graph + Twitter card images per page

---

## Notes

- New backlog items: append, don't insert. Order reflects priority within milestone.
- Each item should be small enough to ship in one PR. If it isn't, split it.
- Items linked to GitHub Issues will get a `#<number>` annotation after `/hacky-hours update 2`.
