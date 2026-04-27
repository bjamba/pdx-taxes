# Business Logic

This is the brain of the site: applicability rules, calculator math, and content-maintenance rules. Everything here is **estimation only**. The output is never tax advice.

## Disclaimer (canonical wording)

Every calculator and applicability output displays a version of:

> This is an estimate based on publicly available rules for tax year &lt;YEAR&gt;. It is not legal, tax, or financial advice. Verify with the official source before filing.

This is non-removable from any output. It's part of the component.

## Applicability rules

The "starter checklist" comes from running per-tax applicability rules against the user's transient survey answers. As of v0.5, the survey is two questions — filing status (single/joint) and taxable income — and Portland residency is **assumed** because the site is named "PDX taxes". Applicability for the three personal taxes is hardcoded in `src/components/ChecklistScript.astro`'s `appliesTo()` function (not in YAML), and the canonical math lives in `src/lib/calculators.ts`. The Arts Tax exemption is **derived** from `income < $1,000` rather than a separate user-facing checkbox.

### Logic

For each tax:
- If **no** `applies_to` records match → hide from checklist.
- If **at least one** matches → include with status "May apply."
- If the record is `scope: separate-return` → it goes in the active checklist by default.
- If the record is `scope: included-elsewhere` or `scope: informational` → it goes in the reference list.

The user can always toggle items they think don't apply to "Not applicable," and toggle reference items into their active checklist if they want to track them.

**Default to including, not excluding.** A user surprised by a missed tax is far worse than a user who manually dismisses one that doesn't apply.

## Calculator types

Each calculator is just a function: `(inputs) → estimate`. We define a small set of calculator types in shared code; each tax file picks one and supplies its parameters.

### Type: `flat-with-eligibility`

Used by: Arts Tax.

```ts
function flatWithEligibility({
  hasIncomeOverThreshold,    // boolean — user's income ≥ $1,000
  aboveFederalPovertyLevel,  // boolean — household income above FPL
  rateAmount,                // from rate.amount_usd
}): Estimate {
  if (!hasIncomeOverThreshold || !aboveFederalPovertyLevel) {
    return { amount: 0, owes: false, reason: "Below threshold or below federal poverty level" };
  }
  return { amount: rateAmount, owes: true };
}
```

### Type: `single-rate-percent-with-threshold`

Used by: Metro SHS personal.

```ts
function singleRatePercent({
  filingStatus,              // 'single' | 'joint'
  taxableIncome,             // number — what the user enters as Metro taxable income
  rate,                      // 0.01 (=1%)
  thresholdSingle,
  thresholdJoint,
}): Estimate {
  const threshold = filingStatus === 'joint' ? thresholdJoint : thresholdSingle;
  const taxable = Math.max(0, taxableIncome - threshold);
  return { amount: taxable * rate, owes: taxable > 0 };
}
```

### Type: `progressive-brackets`

Used by: Multnomah PFA.

```ts
function progressiveBrackets({
  filingStatus,
  taxableIncome,
  brackets,                  // each: { rate_pct, single_min_usd, joint_min_usd }
}): Estimate {
  let owed = 0;
  let prevMin = 0;
  for (const bracket of brackets) {
    const min = filingStatus === 'joint' ? bracket.joint_min_usd : bracket.single_min_usd;
    if (taxableIncome <= min) break;
    const inThisBracket = Math.min(taxableIncome, /* next bracket min OR ∞ */) - min;
    // simplified — see actual implementation for cumulative-rate handling
    owed += inThisBracket * bracket.rate_pct / 100;
    prevMin = min;
  }
  return { amount: owed, owes: owed > 0 };
}
```

(The exact semantics of PFA brackets — whether the second bracket replaces or stacks on the first — must be verified against the official rules and locked in via an ADR before shipping. PFA in particular has been the source of ambiguity in third-party guides.)

### Type: `net-business-income-percent`

Used by: MCBIT, Metro SHS business.

```ts
function netBusinessIncomePercent({
  netBusinessIncome,
  rate,
  grossReceiptsThreshold,    // optional — Metro SHS Business has $5M
  grossReceipts,
}): Estimate {
  if (grossReceiptsThreshold && grossReceipts < grossReceiptsThreshold) {
    return { amount: 0, owes: false, reason: "Below gross receipts threshold" };
  }
  return { amount: netBusinessIncome * rate, owes: netBusinessIncome > 0 };
}
```

## Rounding

Always round **up** for displayed estimates (so users don't underbudget). Display whole dollars with thousands separators in the user's locale: `$1,250` (en-US) / `$1.250` (es-419 — depends on locale).

## Out-of-range / weird inputs

If an input is negative, NaN, or wildly improbable (e.g., $1B income), the calculator returns an explanatory message rather than computing. **Don't crash. Don't compute garbage and present it confidently.**

## Content authoring rules

When writing `summary` for a tax:

- Lead with **who owes it**, then **how much**, then **when**.
- Every claim that has a number (rate, threshold, deadline) must be cross-referenced to a `sources` URL.
- Don't quote official prose verbatim — summarize.
- Keep summary ≤ 80 words. Long detail goes in `description_md`.

## Maintenance rules

The site has a real obligation to keep content fresh. Rules:

1. **Annual review** of every active tax file before December 1 each year.
2. **`last_verified` must be ≤ 365 days old** at build time, or CI emits a warning. Older than 540 days fails the build.
3. **Inflation indices** (Metro SHS thresholds, etc.) update each year — these go in `content/reference/tax-years.yml` and are pulled into per-tax records by reference.
4. **When jurisdiction copy changes**, update the affected tax files **and** mark all translations of those files as `needs-review`.
5. **Translations are never machine-translated unreviewed for tax content.** UI strings and navigation can use machine translation as a starting point. Tax copy must be human-reviewed by someone fluent in the target language.

## Two-view toggle (Individual / Business)

A single global toggle. State persisted in `localStorage` and the URL (`?view=business`). Default: Individual. The view affects:
- Which tax files are listed
- Which calculator inputs are shown
- The default checklist contents

Changing view does **not** clear the user's checklist — checklists are scoped per view, both stored.
