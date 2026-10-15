% Tenderfy Business Admin (Contractor Portal)
%% Use cases
The main journeys a main contractor takes: build the supply chain, request quotes, chase, compare and award. Builds on {{doc:stories|User Stories}}. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | End-to-end contractor flows across supply chain, tenders, quote requests, chasing, compare and award, settings. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 18 frames |
| Related | {{doc:stories\|User Stories}}, {{doc:spec\|Screen Specification}}, {{doc:guide\|Usage Guide}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# How to read this
- Each use case has a Trigger, Preconditions, a Main flow and, where they exist, Alternate and Failure paths.
- Steps cite the frame (for example H06) and the story (for example BA-12).
- Failure paths are numbered F-nn and listed at the end. On-screen text is quoted exactly.
- A flow that depends on a faked capability is BLOCKED, with the open question from {{doc:stories|User Stories}}.

## Actors
| Actor | Role in these flows |
|---|---|
| Main contractor | The contractor sourcing and awarding work. |
| Subcontractor | Receives requests and responds (acts in the subbie portal). |

# UC-01 Build the supply chain
@meta Stories: BA-01, BA-02, BA-03, BA-04 · BLOCKED by OQ-3, OQ-4
**Trigger:** The contractor needs subbies to invite.
**Main flow**
1. On the Subcontractors home (H01), the contractor opens Add Subcontractor (E06).
2. They enter company, email, ABN and trades, and submit.
3. Or they bulk-load via Import CSV (E07): upload and map columns.
4. They open a subbie's profile (H07) to check capability and compliance.
**Failure paths:** F-01 (add validation), F-02 (CSV errors).
[[shots: H01, E06, E07, H07]]

# UC-02 Prepare a tender and request quotes
@meta Stories: BA-05, BA-06, BA-07, BA-08 · BLOCKED by OQ-2, OQ-7
**Trigger:** The contractor is bidding on or delivering a project.
**Main flow**
1. The contractor opens the Tenders list (H02) and a Tender Detail (H03).
2. They assemble the pack in Build Tender (H04).
3. They create a New Quote Request (H05): task, due date, documents and recipients, then send.
[[shots: H02, H03, H04, H05]]

# UC-03 Chase awaiting subbies
@meta Stories: BA-09, BA-10, BA-11 · BLOCKED by OQ-5, OQ-6
**Trigger:** A request is open and some subbies have not responded.
**Main flow**
1. From an open request on H01, the contractor picks a subbie (E09) and opens the request (H08).
2. They open the Nudge dialog (E08) and nudge an awaiting subbie.
**Failure path:** F-03 (nudge limit reached).
[[shots: E09, H08, E08]]

# UC-04 Compare quotes and award
@meta Stories: BA-12 · BLOCKED by OQ-5
**Trigger:** Enough subbies have submitted quotes.
**Preconditions:** At least two quotes are in.
**Main flow**
1. The contractor opens Compare Quotes (H06).
2. They compare price, inclusions, exclusions and assumptions side by side.
3. They accept one quote; that subbie is awarded.
[[shots: H06]]

# UC-05 Track responses
@meta Stories: BA-09 · BLOCKED by OQ-5
**Trigger:** The contractor checks the state of a request.
**Main flow**
1. The contractor opens View Request (H08).
2. The status reflects "Will respond" (E01), "Quote submitted" (E02), awarded (E03), unsuccessful (E04) or declined (E05).
[[shots: H08, E01, E02, E03, E04, E05]]

# UC-06 Configure notifications
@meta Stories: BA-13 · BLOCKED by OQ-2
**Trigger:** The contractor wants to set how chasing runs.
**Main flow**
1. The contractor opens Notification Settings (H09).
2. They set the sender, nudge timing and email template.
[[shots: H09]]

# Failure paths
| ID | In | Trigger | What the user sees | Recovery |
|---|---|---|---|---|
| F-01 | UC-01 | Invalid email or ABN in Add Subcontractor (E06) | "Enter a valid email address" or "That ABN is not valid - check the number" | Correct the field; ABN is optional |
| F-02 | UC-01 | Malformed rows in the CSV import (E07) | Rows flagged per row | Fix the rows and re-import |
| F-03 | UC-03 | Nudging a subbie at the per-request cap (E08) | "Nudge limit reached" | Wait; auto-nudge runs on the configured delay |

# New questions
None. The open questions in {{doc:stories|User Stories}} (OQ-1 to OQ-8) cover the faked capabilities these flows depend on.
