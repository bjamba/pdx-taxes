/**
 * Tax estimators — pure functions, never tax advice.
 * All returns include `applies` so the caller knows whether to include
 * the amount in an aggregate.
 */

export type FilingStatus = 'single' | 'joint' | 'unsure';

export interface Estimate {
  applies: boolean;
  amount: number;       // dollars (0 if doesn't apply)
  reason?: string;
}

/** Portland Arts Tax — flat $35 if you qualify. */
export function estimateArtsTax(opts: {
  qualifies: boolean;
}): Estimate {
  if (!opts.qualifies) {
    return { applies: false, amount: 0, reason: 'You don\'t meet the Arts Tax qualifications.' };
  }
  return { applies: true, amount: 35 };
}

/** Multnomah PFA — progressive brackets. */
export function estimatePFA(opts: {
  filing: FilingStatus;
  income: number;
}): Estimate {
  const isJoint = opts.filing === 'joint';
  const t1 = isJoint ? 200_000 : 125_000;
  const t2 = isJoint ? 400_000 : 250_000;
  const inc = Math.max(0, opts.income);
  if (inc <= t1) {
    return { applies: false, amount: 0, reason: `Below the ${isJoint ? '$200k joint' : '$125k single'} threshold.` };
  }
  // 1.5% on income above t1; additional 1.5% on income above t2 (so 3% on top bracket)
  const band1 = Math.min(inc, t2) - t1;
  const band2 = Math.max(0, inc - t2);
  const owed = band1 * 0.015 + band2 * 0.030;
  return { applies: true, amount: owed };
}

/** Metro SHS Personal — 1% above threshold. */
export function estimateMetroSHS(opts: {
  filing: FilingStatus;
  income: number;
}): Estimate {
  // TY 2026 thresholds (inflation-adjusted)
  const isJoint = opts.filing === 'joint';
  const threshold = isJoint ? 205_000 : 128_000;
  const taxable = Math.max(0, opts.income - threshold);
  if (taxable === 0) {
    return { applies: false, amount: 0, reason: `Below the ${isJoint ? '$205k joint' : '$128k single'} threshold.` };
  }
  return { applies: true, amount: taxable * 0.01 };
}

export function fmtUSD(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function fmtUSDes(amount: number): string {
  // ES locale doesn't really matter for display since we want USD; keep grouping consistent.
  return amount.toLocaleString('es-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
