% Tenderfy Super Admin
%% Use cases
The main journeys the internal team takes: oversee subbies, manage company accounts, run subscriptions. Builds on {{doc:stories|User Stories}}. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | End-to-end internal flows across overview, subcontractor oversight, company management and subscriptions. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 16 frames |
| Related | {{doc:stories\|User Stories}}, {{doc:spec\|Screen Specification}}, {{doc:guide\|Usage Guide}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# How to read this
- Each use case has a Trigger, Preconditions, a Main flow and, where they exist, Alternate paths.
- Steps cite the frame (for example H06) and the story (for example SA-06).
- A flow that depends on a faked capability is BLOCKED, with the open question from {{doc:stories|User Stories}}.

## Actors
| Actor | Role in these flows |
|---|---|
| Super admin | Tenderfy's internal operations team. |

# UC-01 Oversee a subcontractor
@meta Stories: SA-02, SA-03, SA-04 · BLOCKED by OQ-2
**Trigger:** The team needs to check a subbie's status or activity.
**Main flow**
1. The admin opens the Subcontractors list (H02) and filters by status (E08).
2. They open a subbie (H03) and read the live activity feed.
3. The feed reflects the deal stage: invited (E01) through to awarded (E05), declined (E06) or withdrawn (E07).
[[shots: H02, E08, H03]]

# UC-02 Manage a company account
@meta Stories: SA-05, SA-06 · BLOCKED by OQ-3, OQ-4, OQ-5, OQ-6
**Trigger:** A company needs support or enforcement (a limit, a plan change, a suspension).
**Main flow**
1. The admin opens the Companies list (H04) and a Company (H05).
2. On the Company Profile (H06), they review the plan and AI-usage meters.
3. They take an action: suspend or reactivate, change plan, move to free, grant or reset limits, resend invites, verify subbies, or view invoices.
[[shots: H04, H05, H06]]

# UC-03 Run subscriptions
@meta Stories: SA-07, SA-08 · BLOCKED by OQ-7
**Trigger:** Pricing, limits or features need to change.
**Main flow**
1. The admin opens the Subscriptions list (H07).
2. They create or edit a plan on the Edit Subscription screen (H08): price, limits and features.
[[shots: H07, H08]]

# UC-04 Read the platform overview
@meta Stories: SA-01
**Trigger:** The team wants a health check.
**Main flow**
1. The admin opens the Dashboard (H01) and reads the platform figures (sample data).
[[shots: H01]]

# Failure paths
| ID | In | Trigger | What the user sees | Recovery |
|---|---|---|---|---|
| F-01 | UC-02 | A bulk action with no rows selected | The bulk bar stays hidden | Select at least one row |
| F-02 | UC-03 | Deleting a plan companies are on | A confirm dialog | Reassign companies first, or confirm |

# New questions
None. The open questions in {{doc:stories|User Stories}} (OQ-1 to OQ-8) cover the faked capabilities these flows depend on.
