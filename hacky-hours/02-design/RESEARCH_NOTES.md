# Research Notes — Portland Local Tax Landscape

Initial research into the local taxes in scope. **This is a working document** to inform design — not authoritative content for the site itself. All tax content for the site must be verified against official jurisdiction sources before publishing, and must include `last_verified` dates.

_Last researched: 2026-04-26_

---

## Individual Taxes

### 1. Portland Arts Tax
- **Jurisdiction:** City of Portland
- **Rate:** Flat **$35/year** per adult resident
- **Who owes:** Portland residents age 18+ with $1,000+ annual income (any source) AND household income above the federal poverty level
- **Exemptions:** Permanent low-income exemption available (Form ARTS PFE)
- **Deadline:** April 15
- **Late penalty:** +$15 starting April 16; +$20 more after 6 months
- **Filing:** [portland.gov/revenue/pay-arts-tax](https://www.portland.gov/revenue/pay-arts-tax)

### 2. Multnomah County Preschool for All (PFA) Personal Income Tax
- **Jurisdiction:** Multnomah County
- **Rate:**
  - 1.5% on Multnomah County taxable income above $125,000 (single) / $200,000 (joint)
  - Additional 1.5% on income above $250,000 (single) / $400,000 (joint)
- **TY 2026 note:** A scheduled 0.8pp rate increase was delayed from 2026-01-01 to 2027-01-02 by county ordinance — TY 2026 stays at 1.5%
- **Who owes:** Multnomah County residents (and non-residents with Multnomah-source income)
- **Deadline:** April 15
- **Filing:** [multco.us/info/multnomah-county-preschool-all-personal-income-tax](https://multco.us/info/multnomah-county-preschool-all-personal-income-tax) (administered by Portland Revenue Division)

### 3. Metro Supportive Housing Services (SHS) Personal Income Tax
- **Jurisdiction:** Metro (regional government covering parts of Multnomah, Washington, Clackamas counties)
- **Rate:** **1%** of Metro taxable income
- **Thresholds (TY 2025):** Above $125,000 (single) / $200,000 (joint)
- **Thresholds (TY 2026):** ~$128,000 (single) / ~$205,000 (joint) — **inflation-adjusted annually starting TY 2026**
- **Quarterly estimates threshold:** Increased to $5,000 for TY 2026 (was $1,000)
- **Deadline:** April 15
- **Filing:** Administered by Portland Revenue Division

---

## Business Taxes

Portland-area businesses can face up to **6 layers** of local tax depending on activity, location, and size.

### 1. Portland Business License Tax (BLT)
- **Jurisdiction:** City of Portland
- **What:** Net income tax on business activity in Portland (includes residential/commercial rental income)
- **TY 2026 update:** BLT exemption threshold increased (specifics to verify against portland.gov)
- **Filing:** [portland.gov/revenue/business-tax](https://www.portland.gov/revenue/business-tax)

### 2. Multnomah County Business Income Tax (MCBIT)
- **Jurisdiction:** Multnomah County
- **Rate:** **2% of net business income**
- **Use of revenue:** County General Fund — libraries, law enforcement, jails, juvenile justice, bridges, social services, health
- **Filing:** [multco.us/info/multnomah-county-business-income-tax-mcbit](https://multco.us/info/multnomah-county-business-income-tax-mcbit) (administered by Portland Revenue Division)

### 3. Metro SHS Business Income Tax
- **Jurisdiction:** Metro
- **Rate:** **1% on net income**, only for businesses with **gross receipts > $5 million**
- **TY 2026 update:** Quarterly estimated payment threshold raised to $5,000 (was $1,000)

### 4. Other potential business obligations to research
- Heavy Vehicle Use Tax (HVT) — City of Portland
- Clean Energy Surcharge (CES) — City of Portland, large retailers
- Lodging taxes (if hospitality)
- Multnomah County Lodging Tax
- Marijuana taxes (if applicable)
- Construction Excise Tax (CET) — Metro / Portland (school construction funding)

These need a follow-up research pass before design freezes.

---

## Cross-Cutting Observations

1. **Portland Revenue Division administers most of these** — Arts Tax, BLT, MCBIT, PFA, Metro SHS personal and business. This is good news: a single account at Portland Revenue Online (PRO) handles many of them.

2. **Account creation friction (the user's pain point) is real.** PRO requires a PIN/letter for some flows. We should document this clearly and warn users to start the account-creation step early (weeks before deadline).

3. **All deadlines align with April 15.** Estimated payment deadlines (quarterly) follow IRS schedule.

4. **Inflation adjustments start TY 2026** — content must be updated annually. Reinforces the need for structured, version-controlled tax data.

---

## Language Coverage (informs i18n scope)

The Portland Revenue Division publishes Arts Tax forms in: **Spanish, Arabic, Chinese, Japanese, Laotian, Romanian, Russian, Somali, Ukrainian, Vietnamese**. Phone interpretation: 503-823-5157.

This is the **floor** for our language coverage if we want to match official availability. Practically, MVP probably starts with English + Spanish + Vietnamese + Chinese + Russian (the largest non-English communities in Multnomah County), with the rest added incrementally.

Translation workflow is a real design question — we will need either volunteer translators, machine translation with human review, or a hybrid. **Never machine-translate tax content without review.**

---

## Sources

- [Portland Arts Tax](https://www.portland.gov/revenue/arts-tax)
- [Portland Personal Income Tax](https://www.portland.gov/revenue/personal-tax)
- [Multnomah County PFA](https://multco.us/info/multnomah-county-preschool-all-personal-income-tax)
- [Multnomah County MCBIT](https://multco.us/info/multnomah-county-business-income-tax-mcbit)
- [Portland Business Tax](https://www.portland.gov/revenue/business-tax)
- [Portland Revenue Division Forms](https://www.portland.gov/revenue/forms)
- [Bridgetown Bookkeeping — 2026 Portland Business Tax Guide](https://bridgetownbookkeeping.com/2026/03/06/portland-business-tax-guide-2026-2/)
- [Bridgetown Bookkeeping — 2026 PFA Guide](https://bridgetownbookkeeping.com/2026/02/12/multnomah-county-preschool-for-all-tax-guide-2026/)
- [LegalClarity — Portland Income Tax overview](https://legalclarity.org/does-portland-have-income-tax-local-rates-and-deadlines/)

---

## Open follow-ups before Step 3

1. Verify TY 2026 BLT exemption threshold against portland.gov directly
2. Enumerate the full set of niche business taxes (HVT, CES, CET, lodging, cannabis)
3. Confirm Metro SHS TY 2026 inflation-adjusted thresholds against Metro's official site
4. Confirm whether non-resident workers in Multnomah/Metro owe PFA / SHS based on workplace location
