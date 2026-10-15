% Tenderfy Business Admin (Contractor Portal)
%% User stories
What a main contractor can do in the Business Admin portal, as built in the prototype (branch main, commit 9160217). Every screen state is covered by a story or listed as not-a-story. Sizes and priorities are proposed until the owner confirms them.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | The contractor-facing portal: subcontractor supply chain, tenders, quote requests, compare and award, notification settings. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 18 frames |
| Related | {{doc:usecases\|Use Cases}}, {{doc:spec\|Screen Specification}}, {{doc:guide\|Usage Guide}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# How to read this
Stories use **As a / I want / so that**. Acceptance criteria use **Given / When / Then / And** and are true in the prototype. On-screen text is quoted exactly.

- ID `BA-nn`, never renumbered.
- Size: S (under a day), M (a few days), L (split before a sprint).
- Priority: Must / Should / Could.
- **BLOCKED** means the story depends on a capability the prototype only fakes (see Open questions).
- Size and priority are proposed until the owner confirms.

## Roles
| Role | Who |
|---|---|
| Main contractor | The head contractor sourcing and awarding subcontractor work. |
| Estimator | A contractor-side user preparing tenders and comparing quotes. |

## Glossary
| Term | Meaning |
|---|---|
| Main contractor | The head contractor using this portal. |
| Subcontractor (subbie) | A trade business the contractor invites to quote. |
| Tender | A project the contractor is bidding on or delivering, broken into tasks. |
| Quote request | A task sent to one or more subbies asking them to price it. |
| Compare | Viewing subbie quotes side by side to pick one. |
| Award | Accepting a subbie's quote; the subbie wins the work. |
| Nudge | A reminder sent to an awaiting subbie, capped per request. |
| Supply chain | The contractor's directory of subcontractors. |
| Build Tender | Assembling the tender document pack. |
| Sample numbers | Dashboard tiles, response rates, quote amounts and tender values are invented demo data; the GST math on quotes is real. |

# Epic 1. Manage the supply chain
## BA-01 See my subcontractors and open requests
@story **As a** main contractor, **I want** one home for my subbies and open requests, **so that** I can run sourcing from one place.
- **Given** the Subcontractors home (H01), **When** it loads, **Then** it shows the subbie directory, summary tiles and open quote requests.
- **When** I search the roster, **Then** the list filters by name, trade or row text.
- **When** I open a subbie, **Then** their profile (H07) opens.
@meta **Size** M | **Priority** Must
[[shots: H01, H07]]

## BA-02 Add a subcontractor
@story **As a** main contractor, **I want** to add a subbie, **so that** I can invite them to quote.
- **Given** the Add Subcontractor dialog (E06), **When** I enter company, email, ABN and trades, **Then** I can submit.
- **When** the email is invalid, **Then** I see "Enter a valid email address".
- **When** the ABN fails its checksum, **Then** I see "That ABN is not valid - check the number"; the ABN is optional.
@meta **Size** M | **Priority** Must | **BLOCKED** by OQ-4
[[shots: E06]]

## BA-03 Import subcontractors from CSV
@story **As a** main contractor, **I want** to import subbies from a CSV, **so that** I can onboard many at once.
- **Given** the Import CSV dialog (E07), **When** I upload a file and map columns, **Then** I can import.
- **When** rows are malformed, **Then** they are flagged per row.
@meta **Size** L | **Priority** Should | **BLOCKED** by OQ-3
[[shots: E07]]

## BA-04 View a subcontractor profile
@story **As a** main contractor, **I want** a subbie's profile, **so that** I can judge capability and compliance.
- **Given** the View Sub-contractor screen (H07), **When** it loads, **Then** it shows capability, compliance and request history.
@meta **Size** S | **Priority** Should
[[shots: H07]]

# Epic 2. Run tenders
## BA-05 See my tenders
@story **As a** main contractor, **I want** my tenders in one list, **so that** I can manage what I am bidding on.
- **Given** the Tenders list (H02), **When** it loads, **Then** tenders are shown, foldered by sector.
- **When** I open one, **Then** the Tender Detail (H03) opens.
@meta **Size** M | **Priority** Must
[[shots: H02, H03]]

## BA-06 See a tender's quotes
@story **As a** main contractor, **I want** a tender's subbie quotes in one view, **so that** I can see coverage.
- **Given** Tender Detail (H03), **When** it loads, **Then** it shows information, documentation, notes and the subbie quotes ("Out for Quote" and accepted).
@meta **Size** M | **Priority** Should
[[shots: H03]]

## BA-07 Build a tender pack
@story **As a** main contractor, **I want** to assemble a tender pack, **so that** I can send a complete package.
- **Given** Build Tender (H04), **When** it loads, **Then** I can assemble pages, attachments and a preview.
@meta **Size** L | **Priority** Could | **BLOCKED** by OQ-7
[[shots: H04]]

# Epic 3. Request quotes
## BA-08 Send a quote request
@story **As a** main contractor, **I want** to send a quote request to subbies, **so that** I can get priced responses.
- **Given** New Quote Request (H05), **When** I enter the task, due date, documents and recipients, **Then** I can send it.
- **And** inclusions and exclusions use chips: **Enter** adds a chip, **Escape** closes the editor.
@meta **Size** L | **Priority** Must | **BLOCKED** by OQ-2
[[shots: H05]]

# Epic 4. Chase, compare and award
## BA-09 Track a request and the subbie's response
@story **As a** main contractor, **I want** to see where each request stands, **so that** I know who has responded.
- **Given** View Request (H08), **When** it loads, **Then** it shows the status and the subbie's response.
- **And** the status reflects "Will respond" (E01), "Quote submitted" (E02), awarded (E03), unsuccessful (E04) or declined (E05).
@meta **Size** M | **Priority** Must | **BLOCKED** by OQ-5
[[shots: H08, E01, E02, E03, E04, E05]]

## BA-10 Nudge an awaiting subbie
@story **As a** main contractor, **I want** to nudge a subbie who has not responded, **so that** I get quotes in on time.
- **Given** the Nudge dialog (E08), **When** I nudge an awaiting subbie, **Then** a reminder is queued.
- **When** the subbie is at the per-request cap, **Then** I see "Nudge limit reached".
@meta **Size** M | **Priority** Should | **BLOCKED** by OQ-6
[[shots: E08]]

## BA-11 Open a request from an open-request row
@story **As a** main contractor, **I want** to pick which subbie's request to open, **so that** I can act on one from a group.
- **Given** the Pick subbie dialog (E09), **When** I choose a subbie, **Then** their request opens (H08).
@meta **Size** S | **Priority** Could
[[shots: E09]]

## BA-12 Compare quotes and award one
@story **As a** main contractor, **I want** to compare subbie quotes side by side, **so that** I can award the best one.
- **Given** Compare Quotes (H06), **When** it loads, **Then** it shows price, inclusions, exclusions and assumptions side by side.
- **When** I accept one, **Then** that subbie is awarded.
@meta **Size** L | **Priority** Must | **BLOCKED** by OQ-5
[[shots: H06]]

# Epic 5. Settings
## BA-13 Set sender and nudge rules
@story **As a** main contractor, **I want** notification and nudge settings, **so that** chasing runs the way I want.
- **Given** Notification Settings (H09), **When** it loads, **Then** I can set the sender, nudge timing and email template.
@meta **Size** M | **Priority** Could | **BLOCKED** by OQ-2
[[shots: H09]]

# Blocked stories
| Story | Blocked by | What changes with the answer |
|---|---|---|
| BA-02 | OQ-4 | Real persistence saves added or edited subbies. |
| BA-03 | OQ-3 | Real CSV parsing, validation and staggered invites. |
| BA-08, BA-13 | OQ-2 | Real email sends requests, invites and nudges. |
| BA-07 | OQ-7 | Real tender-pack assembly and distribution. |
| BA-09, BA-12 | OQ-5 | Real compare, award and subbie notification. |
| BA-10 | OQ-6 | Real nudge delivery. |

# Deliberately not written as stories
| Item | Why | Where it belongs |
|---|---|---|
| Exact field lists and validation text | Spec-level detail | {{doc:spec\|Screen Specification}} |
| Demo state controls (persona toggle) | Prototype scaffolding | Inventory setup |
| Sample numbers (tiles, rates, amounts) | Invented demo data | Glossary, Spec |

# Open questions
- **OQ-1** Is real admin authentication in scope, and on what backend?
- **OQ-2** How are quote requests, invites and nudges delivered by email?
- **OQ-3** How does CSV import parse, validate, dedupe and stagger invites?
- **OQ-4** What backs adding, editing and deactivating subcontractors?
- **OQ-5** How do compare and award persist and notify the subbie?
- **OQ-6** How are nudges delivered and capped?
- **OQ-7** How are tender packs assembled and distributed?
- **OQ-8** How are notifications delivered and counted?

Added from the cross-portal council review (see OPEN-QUESTIONS.md):
- **OQ-9** Can a contractor company have multiple users with roles, and who can award or edit a tender concurrently (locking or last write wins)?
- **OQ-10** Is an awarded quote a binding subcontract under Australian contract law, and where do terms and disputes live?
- **OQ-11** What is the single source of truth for "awarded", and what happens when a subbie withdraws at the same instant the contractor awards?
- **OQ-12** When a subbie's ABN is deregistered or their insurance expires after a one-time check, who is liable when Tenderfy showed them as verified?
- **OQ-13** How are requests, invites and nudges delivered (deliverability, Spam Act 2003 consent and unsubscribe, nudge opt-out)?
- **OQ-14** Do quotes carry a validity or expiry, how are due dates and timezones handled, and can an award be undone?

# Backlog summary
Total 13 stories. Priority: Must 5, Should 4, Could 4. Size: S 2, M 6, L 5. Blocked 9.

| ID | Story | Epic | Size | Priority |
|---|---|---|---|---|
| BA-01 | See my subcontractors and open requests | 1 | M | Must |
| BA-02 | Add a subcontractor | 1 | M | Must · BLOCKED (OQ-4) |
| BA-03 | Import subcontractors from CSV | 1 | L | Should · BLOCKED (OQ-3) |
| BA-04 | View a subcontractor profile | 1 | S | Should |
| BA-05 | See my tenders | 2 | M | Must |
| BA-06 | See a tender's quotes | 2 | M | Should |
| BA-07 | Build a tender pack | 2 | L | Could · BLOCKED (OQ-7) |
| BA-08 | Send a quote request | 3 | L | Must · BLOCKED (OQ-2) |
| BA-09 | Track a request and the subbie's response | 4 | M | Must · BLOCKED (OQ-5) |
| BA-10 | Nudge an awaiting subbie | 4 | M | Should · BLOCKED (OQ-6) |
| BA-11 | Open a request from an open-request row | 4 | S | Could |
| BA-12 | Compare quotes and award one | 4 | L | Must · BLOCKED (OQ-5) |
| BA-13 | Set sender and nudge rules | 5 | M | Could · BLOCKED (OQ-2) |
