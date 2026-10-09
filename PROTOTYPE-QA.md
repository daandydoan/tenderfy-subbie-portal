# Prototype QA — 3-Portal Flow Test

Adapted from the staging regression runner for the **static prototype**. No backend:
auth, email, CSV validation and metrics are mocked, so this verifies UI + cross-portal
reflection, not server behaviour.

## Role and goal
QA the Tenderfy Subbies 3-portal prototype end to end. Drive real clicks + the Demo panel,
confirm every subbie action reflects on the contractor and super admin per SUBBIE-FLOWS.md.
Work through without stopping. No password hand-offs (there is no real auth).

## Environment (one origin, three portals, no accounts)
- Base: http://localhost:3000  (or https://daandydoan.github.io/subbies-v1.2/)
- Subbie: /subbies/dashboard.html · Contractor: /contractor/subbies.html · Super Admin: /superadmin/subcontractors.html
- Harness instead of logins:
  - Demo panel (right edge): Persona (New/Returning/Frequent), Plan (Free/Premium), deal status, portal switch. Portal-specific.
  - Shared store `window.TF`: `TF.deal()`, `TF.set({status})`, `TF.deals()` (one subbie per status, this is the "second subbie" for Compare), `TF.events()`, `TF.reset()`.
- Browser: built-in browser pane.

## Not applicable (dropped from the staging version)
- Password hand-offs — auth screens are static UI states only.
- Gmail / real emails — static templates in /emails/ (01-04).
- Real CSV import, ABN-checksum / duplicate-email validation — Import is a mock dialog.
- Staging tracker + D-01..D-28 + previous evidence page — different build.
- QA2 prefixes / Test-data sheet — data is ephemeral; reset with `TF.reset()`.

## Pre-approved
Everything. Static demo, nothing leaves the machine. Reset between flows with `TF.reset()`.

## Coverage (in order)
1. **Contractor** — subbies list: search, filters, tabs, column sort, persona row counts + summary tiles; Open Requests (deal reflected); nudge; new-request (invite -> deal `invited`); tender-detail quotes (deal spliced in); compare (all status columns, accept -> award); view-subbie (names deal subbie + live row).
2. **Subbie lifecycle** — dashboard tabs/pills (pills follow tab, not clickable); view-request quick replies (Will respond / Too busy / Need info) -> prepare-quote (itemised + lump, GST on/off, decimals, 0, negative, large) -> quote-summary -> submit -> confirmation; save draft/resume; update; withdraw. Status reflects each step.
3. **Super Admin** — subcontractors list (deal rows per status, search/filter/persona, tiles); view-subbie `#i=rc` (live TF.events) and `#d=<status>` (mock subbies), Onboarding/Activity tabs, Block/Verify, empty feed, activity privacy (no prices/content).
4. **Premium** — Files Manager (All Files sub + locked premium areas); Capability creator -> manager + Ray chips; Company Documents guided start; Project Library URL/template/upload create; Free vs Premium gating (`tf_plan`), output gate (build free, download/edit locked).
5. **Cross-portal reflection (the point)** — run invited -> submitted -> awarded and confirm all three portals agree at each status; also declined / withdrawn / responding / info. Check documents, notifications, awarded work, external quotes.
6. **Cross-cutting** — mobile 390px (subbie), back/refresh mid-flow, double-click submit, console errors, copy/terminology (Declined vs Not awarded/Unsuccessful), each Persona x Plan, demo-panel state persistence across pages.

## Evidence
Screenshot per proven step (built-in browser), named `<area>-<step>`; record the URL + the deal/persona/plan state. For a Fail, capture the broken state.

## Deliverables
1. New prototype test tracker (.xlsx): Area / Flow / Step / Status / Notes / Evidence + Summary counts.
2. Defects D-01..: severity, portal, flow, repro (deal state + steps).
3. Evidence artifact page: one card per flow, screenshot + URL per step, filter by status + portal.
4. Summary: counts by status, High-severity issues, anything blocked.

## Rule
Where the prototype fakes behaviour (validation, email, CSV, metrics), record "Mock — UI only",
not a Pass/Fail of real logic. Real pass/fail applies to UI state and cross-portal reflection.
