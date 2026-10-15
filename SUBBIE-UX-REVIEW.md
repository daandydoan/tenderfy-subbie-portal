# Subbie Portal — Usability Review

Walked the portal as a subcontractor / supply-chain owner (brand-new and mid-job, desktop + mobile).
Focus: can a tradie get set up and respond to a quote without help, and what's missing.

## Works well
- **View Request leads with the right action** — "Respond with a quote" is the clear primary, with quick replies (Will respond / Too busy / Need info) right there for low-effort answers.
- **Quote screen keeps the total + actions pinned** at the bottom (Preview / Save draft / Cancel) — the number is always visible.
- **Empty state explains itself** — "No requests yet" with what-happens-next copy and two CTAs.
- **Free vs Premium is honest** — premium areas are shown but locked, not hidden.
- **Nav is labelled** with tooltips (collapses to icons on narrow widths).

## Issues — fix first

| # | Sev | Where | Problem | Suggested fix |
|---|---|---|---|---|
| 1 | **High** | dashboard-empty | The pills say "12 requests received · 3 action needed · 7 submitted" while the body says **"No requests yet."** A brand-new subbie sees fake activity and a contradiction. | Zero the pills in the empty state (0 / 0 / 0). |
| 2 | **High** | prepare-quote (mobile) | The **itemised pricing table doesn't reflow** on a phone — columns are cramped, no headers, qty/unit/rate show as dashes far from their label. Entering a quote on mobile (where tradies are) is hard. | Stack each line item into a mobile card (label + fields vertical). |
| 3 | Med | first run | **No single "start here."** A new subbie with an invite meets three competing nudges at once — verify email, "profile 90% complete," and a Capability Statement promo — with no guided order (verify -> finish profile -> respond). | One checklist / next-step banner driving the first response. |
| 4 | Med | dashboard-empty | CTAs lead with **"Create a quote to send"** (outbound), but a new subbie's job is **inbound** (receive + respond). | Lead with "Requests will appear here"; make send the secondary. |

## Issues — polish

| # | Where | Problem |
|---|---|---|
| 5 | Header | Notification badges (bell 03, chat 02) are **static** — a brand-new user with nothing still sees "3". |
| 6 | Nav | Lots of empty areas surfaced up front (Awarded Work, Quote Settings, Company Documents) before the subbie has any data — could progressively reveal. |
| 7 | prepare-quote | Per-line **itemised vs lump-sum** toggle is powerful but adds first-timer load; a sensible default (lump sum) would ease the first quote. |
| 8 | Demo panel | On mobile the Demo panel overlaps the quote fields (dev-only, not a real-product issue, but noted). |

## Missing — as a subcontractor / supply-chain owner

| Gap | Why it matters |
|---|---|
| **No messages hub** | Chat lives only inside each request. A subbie juggling several contractors has no single inbox; messages are easy to miss. |
| **No search** | No way to search across requests / tenders / documents once there are more than a screenful. |
| **No "what's due" view** | Quotes have due dates, but there's no deadlines/calendar view beyond the "awaiting" count — easy to miss a closing date. |
| **Can't see the contractor** | The subbie sees only the contractor's name — no contractor profile, history, or rating. Trust is one-way (the contractor vets the subbie, not the reverse). |
| **No team / multi-user** | One login (Jordan Stones). A supply-chain owner can't add staff, assign a quote to an estimator, or set roles — the contractor side has Staff/Role management, the subbie side doesn't. |
| **Nothing after winning** | Awarded Work is read-only; no next step (accept terms, delivery / job tracking). May be out of scope, but the flow dead-ends at "won". |

## Priority
1. Fix the empty-dashboard contradiction (#1) — quick, and it's the first thing a new user sees.
2. Make the mobile quote builder usable (#2) — it's the core task on the core device.
3. Add a first-run "next step" (#3/#4) so a new subbie knows the path.
4. Consider a messages hub and a deadlines view (biggest missing pieces for a working subbie).
