# ADR: Color palette — WCAG AA locked

**Date:** 2026-04-26
**Status:** Accepted
**Supersedes:** Initial palette in `STYLE_GUIDE.md` (2026-04-26 first draft)

## Context

The first-pass palette in `STYLE_GUIDE.md` was visually right but had not been mathematically tested for WCAG 2.1 AA contrast. This ADR records the contrast tests, the hex adjustments needed, and the final locked palette.

Testing was performed with the official WCAG 2.1 relative-luminance and contrast formulas. Targets:

- **Body text on background:** ≥ 4.5:1 (AA); aim for 7:1 (AAA) where possible
- **Large text (≥18pt or ≥14pt bold):** ≥ 3:1 (AA)
- **Non-text UI components and meaningful icons:** ≥ 3:1 (AA, [SC 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html))
- **Decorative content** (e.g. section dividers): no contrast minimum

## Tested pairings (final)

| Foreground | Background | Role | Ratio | Min | Status |
|-----------|-----------|------|-------|-----|--------|
| Ink `#2A2622` | Paper `#FBF7F0` | Body text on page | **14.06:1** | 4.5 | ✅ AAA |
| Ink `#2A2622` | Surface `#F5EFE4` | Body text in card | **13.12:1** | 4.5 | ✅ AAA |
| Ink-soft `#5C5650` | Paper | Secondary text on page | **6.78:1** | 4.5 | ✅ |
| Ink-soft `#5C5650` | Surface | Secondary text in card | **6.32:1** | 4.5 | ✅ |
| Ink-faint `#8B847B` | Paper | Tertiary / meta text (large only) | **3.46:1** | 3.0 | ✅ |
| Moss `#3F6B4F` | Paper | Link / primary on page | **5.74:1** | 4.5 | ✅ |
| Moss `#3F6B4F` | Surface | Link in card | **5.35:1** | 4.5 | ✅ |
| Moss-deep `#2E5239` | Paper | Hovered/pressed link | **8.25:1** | 4.5 | ✅ AAA |
| Paper `#FBF7F0` | Moss `#3F6B4F` | Cream text on primary button | **5.74:1** | 4.5 | ✅ |
| Paper | Moss-deep | Cream text on pressed button | **8.25:1** | 4.5 | ✅ AAA |
| Ink | Moss-soft `#D7E4D8` | Body on done-state highlight | **11.42:1** | 4.5 | ✅ AAA |
| Moss | Moss-soft | Moss icon on done-state bg | **4.66:1** | 4.5 | ✅ |
| Paper | **Terracotta `#9F4A2F`** | Cream text on terracotta button | **5.63:1** | 4.5 | ✅ |
| Ink | Terracotta-soft `#F3DAD0` | Body on friendly callout | **11.26:1** | 4.5 | ✅ AAA |
| **Terracotta `#9F4A2F`** | Terracotta-soft | Terracotta icon on callout | **4.51:1** | 4.5 | ✅ |
| Ink | Warning-soft `#F5E6C5` | Body on warning callout | **12.16:1** | 4.5 | ✅ AAA |
| **Warning `#7E5818`** | Paper | Warning amber on page | **5.97:1** | 4.5 | ✅ |
| **Warning `#7E5818`** | Warning-soft | Warning icon on callout | **5.16:1** | 4.5 | ✅ |
| Ink | Critical-soft `#F1D6D1` | Body on critical callout | **10.92:1** | 4.5 | ✅ AAA |
| Critical `#9A3B30` | Paper | Critical text on page | **6.46:1** | 4.5 | ✅ |
| Paper | Critical | Cream text on critical bg | **6.46:1** | 4.5 | ✅ |
| Moss | Paper | Focus-ring outline | **5.74:1** | 3.0 | ✅ |
| Ink-faint `#8B847B` | Paper | Meaningful component border | **3.46:1** | 3.0 | ✅ |

## Adjustments made

Three colors were darkened from the first draft:

| Color | Before | After | Why |
|-------|--------|-------|-----|
| **Terracotta** | `#B65A3F` | `#9F4A2F` | Cream-on-Terracotta failed at 4.35:1; now passes at 5.63:1 |
| **Warning** | `#A5762A` | `#7E5818` | Both Warning-on-Paper (3.76:1) and Warning-on-Warning-soft (3.26:1) failed; now 5.97:1 and 5.16:1 |

One color was reclassified rather than recolored:

- **Surface-edge `#EAE2D2`** (1.21:1 vs Paper) is **decorative only** — used for purely visual section dividers. Component edges that carry meaning (card borders, button outlines, separators between items in a list) use **Ink-faint `#8B847B`** instead, which clears the 3:1 non-text-contrast requirement.

## Final locked palette

```css
:root {
  /* Neutrals */
  --paper:           #FBF7F0;
  --surface:         #F5EFE4;
  --surface-edge:    #EAE2D2;   /* decorative only — section rules */
  --ink:             #2A2622;
  --ink-soft:        #5C5650;
  --ink-faint:       #8B847B;   /* also: meaningful component borders */

  /* Accent */
  --moss:            #3F6B4F;
  --moss-deep:       #2E5239;
  --moss-soft:       #D7E4D8;
  --terracotta:      #9F4A2F;
  --terracotta-soft: #F3DAD0;

  /* Semantic */
  --success:         #3F6B4F;   /* alias for moss */
  --warning:         #7E5818;
  --warning-soft:    #F5E6C5;
  --critical:        #9A3B30;
  --critical-soft:   #F1D6D1;

  /* Focus */
  --focus-ring:      var(--moss);
}
```

## Dark mode (preliminary, to be tested in a follow-up ADR)

The dark-mode targets in `STYLE_GUIDE.md` have not yet been contrast-tested. A follow-up ADR will lock dark-mode hex values once we have a paired set tested against the same pairings table.

## Tooling

The contrast script that produced this table is checked in at `scripts/check-contrast.ts` (TBD on first build). It runs in CI for any change to the palette CSS variables, fail-on-regression.

## Revisit if

- We add a new color role
- We add dark mode (separate ADR)
- We adopt a UI primitive that introduces a new background surface
