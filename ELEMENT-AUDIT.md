# Element Audit — All 3 Platforms

Every button / toast / notification / number, judged on: does it have real **logic**, what's its **intention/description**, and **why it exists** (Origin). Three platforms below: Subbie, Contractor, Super Admin.

Origin legend:
- **Brief** — your spec / feedback PDFs / SUBBIE-FLOWS / council decisions
- **Claude** — I invented it (demo wiring, mock data, plausible filler) with no explicit brief
- **Standard** — generic UI pattern, not specific to Tenderfy

---

# 1 · SUBBIE PORTAL

## Buttons

| Group | Logic? | Intention / description | Origin |
|---|---|---|---|
| Quote lifecycle: `qsSubmit`, `uqConfirm`/`uqShowWithdraw`, `qaOpen`/`qaRow`/`vrPick` (will respond / too busy / need info) | **Real** + cross-portal (sets deal status, logs event, reflects) | Respond to a request | **Brief** (SUBBIE-FLOWS 2 / 2.5 / 3) |
| Prepare quote: `addLineItem`/`removeLineItem`, `ieChipRemove`, `setQuoteMode`, `qRemoveFile` | **Real** (build the quote object) | Itemised / lump quote, i-e-a, attach | **Brief** |
| Capability builder: `cbBuild`, `cbRefine`, `cbUpdate`, `cbChip`, `cbNew`, `goStep`, `cbAddProject` | **Real** (wizard + creator→manager + Ray chips) | Build / edit capability statement | **Brief** (premium feedback) |
| Premium create: `plCreate` (URL/template/upload), `cdCreate` | **Real** (gated; Ray draft or upgrade) | Guided start for premium docs | **Brief** (premium feedback) |
| Profile: `pfOpen`/`pfSave`/`pfTab`/`pfTradeRm` | **Real** (edits + logs) | Complete business profile | **Brief** |
| External quote: `xqSet`, `nqPreview`/`nqpSave` | **Real** (status + log) | Outbound quotes to own client | **Brief** |
| Premium gating: `featLock`, `upOpen`/`upClose`, `payOpen`, `planChoose`, `backToPlans` | **Real** (bounce free users to upgrade / plan flow) | Free vs Premium wall | **Brief** (gate-at-output) |
| File manager: `fdxOpen` (upload/choose), `openFset`/`saveFset`/`clearFset`, `ddSave`/`ddClear`, `openDoc`, `openCard`/`cardSave` | **Real** (upload persists; expiry saved) | Manage files + due dates | **Brief** |
| Notifications: `ncOpen`/`ncFilter`/`ncReadAll` | **Real** (mark read, filter, navigate) | Read notifications | Brief + **Standard** |
| UI toggles: `toggleSection`, `togglePw`, `toggleFilters`, `toggleBd`, `pmTab`, `toggleSelectAll` | **Real** (local UI only) | Collapse / show-hide / tabs | **Standard** |
| Auth: `fpSend`/`fpBack` | Prepares UI only (no real auth) | Forgot password | Brief, backend **not in prototype** |
| **Placeholder toasts** (~60 `data-toast=` buttons) | **No action** — shows a message describing what it *would* do | Download / Upload / Delete / Opening preview / Opening document / Downloading invoice / Filter by (contractor/trade/status) / Copy link / Send message / Replace logo / Contact support / Privacy / Terms | **Claude** (demo stubs; the toast text *is* the intended action) |

## Toasts

| Type | Logic? | Intention | Origin |
|---|---|---|---|
| Triggered `showToast(...)` with context: validation errors, "Nudge sent", Ray revision counts ("2 free revisions left"), "Profile updated", "Saved" | **Real** (fired by a handler after an action) | Confirm a real action / error | Brief + Claude |
| Placeholder `data-toast="..."` (~60) | **No action**, hover/click shows the text | Stand-in for a backend action | **Claude** (deliberate demo filler) |

## Notifications

| Element | Logic? | Intention | Origin | Flag |
|---|---|---|---|---|
| Subbie notifications feed [notifications.html] — 12 static items | Display only | Sample inbox (new request, message, quote accepted, licence expiring, not awarded) | **Claude** (sample content) | Static, not event-driven |
| + live `TF.events()` prepended to the feed | **Real** (shows this session's cross-portal events) | Surface contractor actions (invite/nudge/award) | **Claude** (my wiring, brief-aligned) | — |
| `ncUnread "(3)"` count | **Real** — `ncCount()` recomputes from unread items | Unread badge | Standard | — |
| Header bell `ndot "03"`, chat `cdot "02"/"03"`, `msg-unread "03"` | **No logic** — hardcoded | Looks like unread activity | **Claude** | Flag: static numbers, do not reflect real unread |

## Numbers

| Group | Logic? | Intention | Origin | Flag |
|---|---|---|---|---|
| Dashboard tiles (Requests received / Action needed / Quotes submitted / Accepted / Awaiting) | **Real** — `refreshCounts()` counts rendered rows, scaled by persona | Pipeline summary | **Claude** (logic mine; row data invented) | Values are sample data |
| Dashboard tab counts (`.ct`) | **Real** — computed from `TAB_STATUS` | Per-status counts | Claude | — |
| Contractor tiles (14 / 6 / 9 / 2d) | **Real** — persona-scaled | Supply-chain summary | **Claude** | Invented numbers |
| Admin tiles — 248 / 176 / 52 | **Real** — persona-scaled | Platform funnel | **Claude** | Invented |
| Admin tiles — 58 Premium, $12.4M Awarded value | **No logic** — static | Platform scale | **Claude** | Flag: not computed, won't reconcile with rows |
| Quote amounts: $11,290 / $19,019 / line items / subtotals / GST | Hardcoded sample (GST math is real where shown) | Realistic AU civil quotes | **Claude** (brief-plausible) | Fixed sample |
| Compliance dates, ABNs, response rates (84/91%), win rate 58%, turnaround "2.4 days" | Hardcoded | Make profiles look real | **Claude** | Invented plausible data |
| Awarded Work: $278,500 total, 3 contracts, per-contract PO/value | Hardcoded (+ live deal prepended) | Won-work record | **Claude** | Sample |
| ABN checksum (Add form) | **Real** — ATO algorithm | Validate ABN | Brief (QA) + Claude | — |

---

---

# 2 · CONTRACTOR PORTAL

## Buttons

| Group | Logic? | Intention / description | Origin |
|---|---|---|---|
| Quote request: `cqSend` (create + invite -> deal `invited`), `addRecipient`/`removeRecipient`/`inviteRecipient`, `cqToggle`, `attAdd`/`attPickQ`/`attOpen` (attach docs, scoped to one tender) | **Real** + cross-portal | Send a quote request to subbies | **Brief** + Claude (wiring) |
| Compare: `cmpAccept` (award -> deal `awarded`), `openCompare` | **Real** + cross-portal | Compare quotes, award | **Brief** |
| Requests: `vrNudgeSend`, `vrWithdrawConfirm`, `vrResendNewSend`, `qaPick`, `pkOpen`, `ndOpen`/`ndSend`/`ndToggle` (nudge), `reqDocsOpen`/`rdSend` (request docs), `vrDlgClose` | **Real** (+ nudge logs to subbie) | Manage responses | **Brief** + Claude (wiring) |
| Directory: `asubOpen`/`asubSubmit` (add + email/ABN validation), `csSearch`+`scTab`/`scSort` (search/sort), `esOpen`/`esDeactivate`/`esSave` (deactivate flow), `perfFilter` | **Real** | Subcontractor directory | **Brief** |
| Build Tender: `pgAddRay`/`pgWinStep`/`pageStep`/`pgJump`/`pgClear`, `btPreview`, `tnFolder`/`tnView`/`tnTab`/`tnSec` | **Real** (page builder UI) | Assemble the tender pack | **Brief** |
| CSV import: `impOpen`/`impNext`/`impPick`/`impDone`/`impReset`/`impDownloadTemplate`/`impToggle` | **Real** (wizard UI; parsing/validation is mock) | Import subbies | **Brief**, backend **not in prototype** |
| Notification settings: `nsChan`/`nsTest`/`nsSave` | **Real** (UI) | Nudge / email settings | **Brief** |
| **Sidebar nav stubs** (~16 `data-toast`: Contractor dashboard, Cover Pages, Table of Contents, Responses, File manager, Resumes, Case Studies, Policies, Insurances, Certifications, Organisation Chart, Staff Management, Role Management, Notifications) | **No action** | Mirror the real Business Admin sidebar | **Claude** (decorative — makes it look like the full product) |
| Ray FAB "Open Ray" | `data-toast` stub | AI co-pilot entry | Claude / Brief |
| Row / doc stubs (`data-toast`): Download quote, Download accepted quote, Approve quote, Message subcontractor, Send note, Open document, Update tender, Folder/Tender options, Filter by file type | **No action** | Intended per-row actions | **Claude** |

## Numbers (Contractor)

| Group | Logic? | Intention | Origin | Flag |
|---|---|---|---|---|
| Dashboard / supply tiles (14 / 6 / 9 / 2d) | **Real** — persona-scaled | Supply summary | **Claude** | Invented |
| Open-requests counts (N subbies / quotes received / awaiting) | **Real** — `orRender()` computes, reflects the deal | Request progress | **Claude** (data) | — |
| Roster: response rate % (91/84/78), avg turnaround, last-request | Hardcoded | Make rows look real | **Claude** | Invented |
| Compare amounts / subtotals / GST | From `QUOTES` + live deal; GST math real | Quote comparison | **Claude** (brief-plausible) | Fixed sample |
| Tender values, due dates | Hardcoded | Tenders look real | **Claude** | Invented |
| Chat badge `cdot "02"` (every page) | **No logic** — static | "2 new messages" | **Claude** | Flag: static |

---

# 3 · SUPER ADMIN PORTAL

## Buttons

| Group | Logic? | Intention / description | Origin |
|---|---|---|---|
| List: `setFilter`/`setSort`/`scTab`/`openSearch`, `bulkAct` (bulk resend / message / export / verify / block), `toggleRow`/`toggleAll`/`clearSel` | **Real** | Manage the subbie list | **Brief** |
| Per-subbie: `saSuspend`/`toggleBlock` (block / restore), `saVerify` (run verification), `saResend` (resend invite), `saAddNote` (audit note + reason), `saTab` (Onboarding / Activity) | **Real** + audit trail | Admin actions on a subbie | **Brief** (council: confirm-with-reason + audit) |
| AI usage: `saSaveUsage`/`saResetUsage`/`saResetLimit` | **Real** (edit per-subbie limits) | Manage AI / token limits | **Brief** |
| Plans / billing: `saChangePlan`/`saGrant`/`saMoveFree`/`saInvoices`, `createPlan`/`editPlan`/`delPlan` | **Real** (plan admin) | Subscription management | **Brief** |
| Deal rows + per-status profiles (`#d=`, `#i=rc`), live activity feed | **Real** — the cross-portal overlay | Observe subbie activity | **Claude** (demo wiring) |
| **Sidebar nav stubs** (`data-toast`: Settings, Notifications, Manage Files, Informative Pages, AI Usage) | **No action** | Match the production SA sidebar | **Claude** (decorative; per-subbie AI-usage controls *are* real) |
| Action stubs (`data-toast`): Impersonate (read-only), Export CSV, Message, Invite expired, Brand kit flagged, Re-extract, Requested missing documents, Convert to custom plan, Register a new company | **No action** | Intended admin actions | **Claude** |

## Numbers (Super Admin)

| Group | Logic? | Intention | Origin | Flag |
|---|---|---|---|---|
| Tiles 248 / 176 / 52 | **Real** — persona-scaled | Platform funnel | **Claude** | Invented |
| Tiles 58 Premium, $12.4M Awarded value | **No logic** — static | Platform headline | **Claude** | Flag: not computed |
| Value column ($19k / $11k live+mock, base awarded) | Mixed (live computed, base hardcoded) | Awarded value per subbie | **Claude** | — |
| AI usage (142/500 tokens, 18/50 uploads, 9/25 docs) | Hardcoded per subbie | Usage vs limit | **Claude** | Invented |
| Plan prices ($99 / $119), invoices | Hardcoded | Pricing | **Claude** (brief-aligned) | — |
| Compliance / profile data (ABN, dates, response/turnaround) | Hardcoded | Realistic profiles | **Claude** | Invented |

---

## What this means (all 3)

- **Structure, flows, gating and admin actions are brief-driven** and have real logic: the quote lifecycle, compare/award, nudge/resend/withdraw, directory + validation, block/verify/audit, AI limits and plan management.
- **Almost every specific *number* is Claude-invented demo data.** Counting logic is real (persona-scaled, `refreshCounts`/`orRender`), but it runs on invented rows; the pure-static ones are admin **$12.4M / 58 Premium**, all **AI-usage figures**, and the **notification badges** (bell 03, chat 02).
- **The two sidebars are the biggest "not built" surface:** ~16 contractor + 5 super-admin nav items are `data-toast` stubs that only show their own name. They exist to mirror the real Business Admin / Super Admin products, not because those areas are built.
- **~100 `data-toast` buttons total** across the 3 portals are intentional placeholders — each names its intended action but does nothing (downloads/PDF, upload/replace/delete, filters, copy-link, impersonate, export, support/legal).

## Items worth your call

1. **Sidebars** — decide which contractor/admin nav items are in-scope to build vs stay decorative.
2. **Static numbers** — admin $12.4M / 58 Premium, AI-usage figures, notification badges (bell 03, chat 02): compute them or keep as headline/decorative.
3. **Placeholder actions (~100)** — triage which need real logic for a real build (PDF downloads, filters, delete/replace, copy-link, CSV import, impersonate) vs "demo is fine".
4. **Invented sample figures** — any number that should match a real target you have in mind, tell me and I'll set it.
