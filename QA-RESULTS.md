# Prototype QA — 3-Portal Flow Test — Results

Tested by: Claude QA2 · Date: 2026-10-10 · Target: http://localhost:3000 · Build: subbies-v1.2 @ 3b5918c
Harness: Demo panel + `window.TF`. No backend (auth/email/CSV/metrics mocked).

## Results

| ID | Area | Flow | Status | Notes |
|---|---|---|---|---|
| CON-01 | Contractor | Subcontractors list render (tiles 14/6/9/2d, tabs, persona caps) | Pass | Returning persona caps to 4 active rows |
| CON-02 | Contractor | Roster search (name/trade) | Pass | D-01 fixed: `csSearch` now filters by name + trade, overrides persona cap, clears back |
| CON-03 | Contractor | Open Requests reflect the deal | Pass | Velocity shows Ridgeline; invited = 1 received / 3 awaiting (correct on load) |
| CON-04 | Contractor | Add Subcontractor validation | Mock gap | D-02: accepts invalid email + bad ABN, no validation (backend not in prototype) |
| CON-05 | Contractor | Compare — all status columns | Pass | 8 columns, lowest badge, pending / declined / withdrawn states |
| CON-06 | Contractor | Compare accept -> award | Pass | submitted -> awarded, button flips to Awarded |
| CON-07 | Contractor | Active tab badge vs visible rows | Cosmetic | D-03: badge "09" vs 4 capped rows / footer "1–4 of 4" |
| SUB-01 | Subbie | Dashboard status badge (Opened / Submitted / Awarded) | Pass | Flips with deal state |
| SUB-02 | Subbie | Quick reply — Too busy | Pass | -> Declined, event logged |
| SUB-03 | Subbie | Submit quote | Pass | invited -> submitted, event logged, -> confirmation |
| SUB-04 | Subbie | Awarded Work includes live deal | Pass | 4 cards, live deal first |
| SUB-05 | Subbie | Mobile 390px | Pass | No horizontal scroll; pills + tabs + cards reflow |
| SUB-06 | Subbie | Console errors | Pass | None on dashboard / list / compare / profile |
| SA-01 | Super Admin | Subcontractors deal rows (per status) | Pass | 8 rows; live row tracks status |
| SA-02 | Super Admin | view-subbie #i=rc live activity | Pass | "Submitted a quote bundle" at top of Activity feed |
| SA-03 | Super Admin | Activity feed privacy | Pass | Event titles only, no prices / content / last-login |
| SA-04 | Super Admin | Platform metric tiles | Pass | 248/176/52/58/$12.4M render; persona scales 3 of 5 (Premium + Awarded-value tiles are static — Mock metric, not a computed sum) |
| SA-05 | Super Admin | Value column | Pass | Live $19k + mock $11k alongside base awarded values |
| SA-06 | Super Admin | Filters + sort + search | Pass | Invited/Registered filters, value sort, name search all work (search works here, unlike contractor D-01); deal rows pin above the sort (overlay) |
| SA-07 | Super Admin | Onboarding steps vs real state | Pass | Invited = in progress (4 steps); Active/awarded = "Onboarding complete" |
| SA-08 | Super Admin | Empty activity feed | Pass | Viewed subbie (Coastline) shows "No platform activity yet" |
| SA-09 | Super Admin | Per-status profile resolve (#d=) | Pass | #d=invited -> Clearview with invite in its feed; #i=3 / #i=rc resolve correctly |
| PREM-01 | Subbie | Free -> Premium gating | Pass | Guided create -> upgrade dialog; locks shown |
| PREM-02 | Subbie | Files Manager nav (All Files + locked areas) | Pass | Group header + All Files sub (free) + 3 locked |
| XP-01 | Cross-portal | Lifecycle invited -> submitted -> awarded | Pass | Reflects on subbie + contractor + super admin at each status |

## Defects

| ID | Sev | Portal | Flow | Repro | Retest | Note |
|---|---|---|---|---|---|---|
| D-01 | Medium | Contractor | CON-02 | /contractor/subbies.html -> type "ironbark" in "Search by name or trade" -> list unchanged | **Fixed** | `scTab` now composes the search term (name/trade), overrides the persona cap while searching |
| D-02 | Low (Mock) | Contractor | CON-04 | Add Subcontractor -> email "not-an-email", ABN "123" -> Add -> dialog closes | Open | No client validation; real validation is backend (not in prototype) |
| D-03 | Cosmetic | Contractor | CON-07 | /contractor/subbies.html (returning persona) | Open | "Active 09" badge disagrees with 4 visible rows |

## Summary

- Checks: 25 · **Pass 23** · Fail 0 · Mock-gap 1 · Cosmetic 1  (D-01 fixed this run)
- High-severity: none
- Blocked: none (no auth / passwords in the prototype, so no hand-offs)
- Cross-portal reflection (the point of the wiring): Pass at every status
- Out of scope (mocked, not pass/fail of real logic): email, CSV import backend, ABN/duplicate validation, metrics, real auth

## Evidence
- CON — Subcontractors list (contractor/subbies.html)
- CON — Compare, 8 status columns, Ridgeline Awarded (contractor/compare.html)
- SA — view-subbie #i=rc, live activity (superadmin/view-subbie.html#i=rc)
- SUB — Dashboard at 390px mobile (subbies/dashboard.html)
