% Tenderfy Super Admin
%% User stories
What Tenderfy's internal team can do in the Super Admin portal, as built in the prototype (branch main, commit 9160217). Every screen state is covered by a story or listed as not-a-story. Sizes and priorities are proposed until the owner confirms them.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | The internal operations portal: platform overview, subcontractor oversight, company accounts, AI usage and subscriptions. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 16 frames |
| Related | {{doc:usecases\|Use Cases}}, {{doc:spec\|Screen Specification}}, {{doc:guide\|Usage Guide}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# How to read this
Stories use **As a / I want / so that**. Acceptance criteria use **Given / When / Then / And** and are true in the prototype. On-screen text is quoted exactly.

- ID `SA-nn`, never renumbered.
- Size: S (under a day), M (a few days), L (split before a sprint).
- Priority: Must / Should / Could.
- **BLOCKED** means the story depends on a capability the prototype only fakes (see Open questions).
- Size and priority are proposed until the owner confirms.

## Roles
| Role | Who |
|---|---|
| Super admin | A member of Tenderfy's internal operations team overseeing all accounts. |

## Glossary
| Term | Meaning |
|---|---|
| Super admin | Tenderfy's internal team, overseeing all companies and subbies. |
| Company | A contractor account on the platform. |
| Subcontractor (subbie) | A trade business linked to one or more companies. |
| AI usage | A company's consumption of AI features, metered against its plan limit. |
| Subscription plan | A pricing tier with price, limits and features. |
| Activity feed | A subbie's timeline of events pulled across the three portals. |
| Grant | An admin override raising a company's limit. |
| Move to free | Downgrading a company to the free plan. |
| Sample numbers | Dashboard totals, usage meters and per-subbie stats are invented demo data; deal values come from the shared demo store. |

# Epic 1. Platform overview
## SA-01 See the platform at a glance
@story **As a** super admin, **I want** a platform-wide dashboard, **so that** I can see the health of Tenderfy at a glance.
- **Given** the Dashboard (H01), **When** it loads, **Then** it shows company, subbie, AI-usage and subscription figures (sample data).
@meta **Size** M | **Priority** Should
[[shots: H01]]

# Epic 2. Oversee subcontractors
## SA-02 Browse every subcontractor
@story **As a** super admin, **I want** every subbie across all companies, **so that** I can oversee the whole supply base.
- **Given** the Subcontractors list (H02), **When** it loads, **Then** it shows subbies with status such as "Invited", "Will respond", "Asked for info", "Quote submitted", "Active", "Declined" and "Withdrawn".
- **When** I filter by status (E08), **Then** the list narrows to that status.
@meta **Size** M | **Priority** Must
[[shots: H02, E08]]

## SA-03 See a subbie's live activity
@story **As a** super admin, **I want** a subbie's profile with a live activity feed, **so that** I can see what is happening across portals.
- **Given** the View Sub-contractor screen for a live subbie (H03), **When** it loads, **Then** the activity feed shows real cross-portal events.
@meta **Size** M | **Priority** Should | **BLOCKED** by OQ-2
[[shots: H03]]

## SA-04 See a subbie at each deal stage
@story **As a** super admin, **I want** a subbie's profile to reflect its deal stage, **so that** I can understand where a quote sits.
- **Given** a subbie profile, **Then** the feed reflects the stage: invited (E01), responding (E02), information requested (E03), quote submitted (E04), awarded (E05), declined (E06) or withdrawn (E07).
@meta **Size** M | **Priority** Should | **BLOCKED** by OQ-2
[[shots: E01, E02, E03, E04, E05, E06, E07]]

# Epic 3. Manage companies
## SA-05 Browse companies
@story **As a** super admin, **I want** all contractor companies, **so that** I can manage accounts.
- **Given** the Companies list (H04), **When** it loads, **Then** it lists the companies on the platform.
- **When** I open one, **Then** the Company overview (H05) opens.
@meta **Size** M | **Priority** Must
[[shots: H04, H05]]

## SA-06 Manage a company account
@story **As a** super admin, **I want** account controls on a company, **so that** I can support and enforce.
- **Given** the Company Profile (H06), **When** it loads, **Then** it shows the plan and AI-usage meters.
- **And** I can suspend or reactivate, change plan, move to free, grant or reset limits, resend invites, verify subbies and view invoices.
@meta **Size** L | **Priority** Must | **BLOCKED** by OQ-3, OQ-4, OQ-5, OQ-6
[[shots: H06]]

# Epic 4. Subscriptions
## SA-07 See subscription plans
@story **As a** super admin, **I want** the subscription plans, **so that** I can see tiers and who is on each.
- **Given** the Subscriptions list (H07), **When** it loads, **Then** it shows the plans and their members.
@meta **Size** M | **Priority** Should
[[shots: H07]]

## SA-08 Create or edit a plan
@story **As a** super admin, **I want** to create or edit a plan, **so that** pricing and limits stay current.
- **Given** the Edit Subscription screen (H08), **When** it loads, **Then** I can set price, limits and features.
@meta **Size** M | **Priority** Should | **BLOCKED** by OQ-7
[[shots: H08]]

# Blocked stories
| Story | Blocked by | What changes with the answer |
|---|---|---|
| SA-03, SA-04 | OQ-2 | A real event bus feeds the activity feed. |
| SA-06 | OQ-3, OQ-4, OQ-5, OQ-6 | Real suspend, plan change, usage reset, and invites / verification. |
| SA-08 | OQ-7 | Real plan persistence. |

# Deliberately not written as stories
| Item | Why | Where it belongs |
|---|---|---|
| Exact admin-action labels and confirm text | Spec-level detail | {{doc:spec\|Screen Specification}} |
| Demo persona control | Prototype scaffolding | Inventory setup |
| Sample numbers (totals, meters, stats) | Invented demo data | Glossary, Spec |

# Open questions
- **OQ-1** Is real admin authentication and role control in scope, and on what backend?
- **OQ-2** What event bus feeds the cross-portal activity feed?
- **OQ-3** How does suspend / reactivate persist and take effect?
- **OQ-4** How do plan change, move to free and grant limits persist?
- **OQ-5** How are AI usage and limits reset?
- **OQ-6** How are invites resent and subbies verified?
- **OQ-7** How do create / edit / delete of subscription plans persist?
- **OQ-8** Where does invoice data come from?

Added from the cross-portal council review (see OPEN-QUESTIONS.md):
- **OQ-9** Who are the Super Admin users (Tenderfy staff roles, support impersonation, and the scope of their access to customer data)?
- **OQ-10** How are stale ABN deregistration and expired subbie insurance detected after a one-time verification?
- **OQ-11** What are the audit, retention and Australian data-residency rules, including how long dispute evidence is kept?
- **OQ-12** What is the canonical source of truth for a deal across the three portals, and how are simultaneous conflicting writes resolved?

# Backlog summary
Total 8 stories. Priority: Must 3, Should 5, Could 0. Size: S 0, M 7, L 1. Blocked 4.

| ID | Story | Epic | Size | Priority |
|---|---|---|---|---|
| SA-01 | See the platform at a glance | 1 | M | Should |
| SA-02 | Browse every subcontractor | 2 | M | Must |
| SA-03 | See a subbie's live activity | 2 | M | Should · BLOCKED (OQ-2) |
| SA-04 | See a subbie at each deal stage | 2 | M | Should · BLOCKED (OQ-2) |
| SA-05 | Browse companies | 3 | M | Must |
| SA-06 | Manage a company account | 3 | L | Must · BLOCKED (OQ-3) |
| SA-07 | See subscription plans | 4 | M | Should |
| SA-08 | Create or edit a plan | 4 | M | Should · BLOCKED (OQ-7) |
