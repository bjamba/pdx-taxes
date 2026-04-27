# User Journeys

All journeys assume the user lands on a phone first (mobile-first). Desktop is a stretch of mobile, not the other way around.

## Primary journeys

### J1 — "Tell me what taxes I owe" (the headline journey)

**Persona:** New Portland resident. First filing season. Knows federal/Oregon exists. Doesn't know there's a stack of local stuff.

```mermaid
flowchart TD
    Start([Lands on home page]) --> Choose{Individual or Business?}
    Choose -- Individual --> IndChecklist[Sees personalized starter checklist]
    Choose -- Business --> BizChecklist[Sees business starter checklist]
    IndChecklist --> Refine[Refine with 2 questions<br/>filing status, taxable income<br/>Portland residency assumed]
    BizChecklist --> Refine2[Optional: refine with yes/no questions<br/>gross receipts, location, activity<br/>(business view not yet shipped)]
    Refine --> List[Final list of taxes that likely apply]
    Refine2 --> List
    List --> Tap[Taps a tax to learn more]
    Tap --> TaxPage[Tax detail page<br/>summary, deadline, filing link]
```

**Success:** User sees the full list of separate-return taxes that may apply, with deadlines and direct filing links, in under 2 minutes.

**No-account, no-data design:** The "refinement" questions narrow the list using only the user's transient choices. Nothing is sent anywhere; nothing is stored unless they choose to keep checklist progress (localStorage).

### J2 — "Help me track my filings this year"

**Persona:** Returning user. Has a checklist from last year or wants to start one.

1. Lands on home → sees a "Resume your checklist" affordance if `localStorage` has prior state.
2. Or starts fresh: picks tax year (defaults to current).
3. For each tax: marks `not-started` / `in-progress` / `done` / `not-applicable`.
4. Progress bar at top of checklist.
5. Clear "Reset / start over" button.

### J3 — "Estimate what I'll owe"

**Persona:** Anyone trying to budget.

1. Tax detail page → "Estimate" section if calculator is enabled.
2. Plain inputs (e.g., "Your Multnomah County taxable income"). Each input has plain-language help text.
3. Output: a rough estimate, with a prominent **"This is an estimate, not tax advice"** notice and a link to the official rules.
4. Inputs are not stored unless user toggles "remember inputs."

### J4 — "Read it in my language"

**Persona:** Non-English-first speaker.

1. Language switcher visible on every page (top-right on desktop, top of header on mobile).
2. Choosing a language navigates to the same page in that language; selection persists in `localStorage` and the URL.
3. If a translation is missing for a specific page, the user sees a clear "Showing English — translation pending" banner and a link to file an issue.

### J5 — "Where do I actually file this?"

**Persona:** User is ready to file, just needs the right link.

1. Every tax page has a prominent **"File this tax"** call-to-action that links directly to the official filing site.
2. Below: a step-by-step plain-language list of what they'll need (e.g., "You'll need a Portland Revenue Online account. If you don't have one, request a PIN — note it can take 7–10 days to arrive by mail.").
3. Free-filing resources listed below the official CTA.

## Secondary journeys

### J6 — "I think this info is wrong" (community feedback)

1. Footer of every tax page: small "Report an issue with this page" link.
2. Opens a pre-filled GitHub Issue with the page slug, current `last_verified` date, and a template.
3. (No in-app form — issues live in GitHub, no PII collected.)

### J7 — "Browse the full tax landscape" (educational repository)

**Persona:** Curious resident, journalist, or new business owner who wants context, not a checklist.

1. From the home page or footer: "Reference: all local taxes" link.
2. Lists every tax — including ones that don't require separate returns (informational reference category).
3. Each entry is clearly labeled `Separate return required` / `Reported on your federal/state return` / `Informational only`.
4. Same per-tax page template, with `scope: informational` rendering a different CTA (no "File this" button — instead, "How this gets paid").

### J8 — "Search for a specific tax"

1. Search box on the home page.
2. Searches against `name`, `short_name`, common synonyms (e.g., "PFA" → Multnomah Preschool for All), and `summary`.
3. No backend — index is built into the static site.

## Cross-journey UX commitments

- **No modal interrupts.** No newsletter pop-ups, no cookie banners (we don't set cookies).
- **No login walls.** Every page is accessible without auth.
- **No dead-ends.** Every filing-related page has at least one outbound link to the official source.
- **No advice voice.** Copy is informational. Phrases like "you should..." or "it's best to..." are replaced with "the official rules say..." or "the deadline is...".
- **Disclaimer present, not in the way.** Footer-level on most pages; inline next to calculators.

## Things explicitly NOT in any journey

- Account creation
- Filling out tax forms in our UI
- Uploading documents
- Receiving notifications/emails
- Any flow that asks for income/SSN/EIN with intent to store it server-side
