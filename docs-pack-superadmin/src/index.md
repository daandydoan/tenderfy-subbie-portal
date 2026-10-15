% Tenderfy Super Admin
%% Docs index
The map of the Super Admin portal documentation set. Start here. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | Index and cross-links for the Super Admin portal docs. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 16 frames |
| Related | {{folder\|All docs}} |
| Changes since last version | Initial version. |

# The documents
| Doc | What it owns | Link |
|---|---|---|
| User Stories | Story IDs, glossary, open questions, size and priority | {{doc:stories\|User Stories}} |
| Use Cases | End-to-end flows and failure paths (F-nn) | {{doc:usecases\|Use Cases}} |
| Screen Specification | Every screen's elements, strings and states, plus tokens | {{doc:spec\|Screen Specification}} |
| Usage Guide | Task-by-task instructions and FAQ | {{doc:guide\|Usage Guide}} |
| Quick Start | One page: oversee, support, run plans | {{doc:quickstart\|Quick Start}} |
| Design | The 16 editable frames | {{figma\|Figma file}} |

# What is in the portal
- 16 screen states across overview, subcontractors, companies and subscriptions.
- 8 user stories (3 Must, 5 Should), 4 blocked on back-end capabilities.
- 4 use cases (UC-01 to UC-04) with 2 failure paths (F-01, F-02).

# Read in this order
1. {{doc:quickstart|Quick Start}} for the one-minute view.
2. {{doc:stories|User Stories}} for what the portal is for and what is blocked.
3. {{doc:usecases|Use Cases}} for the step-by-step journeys.
4. {{doc:spec|Screen Specification}} for the per-screen detail.
5. {{doc:guide|Usage Guide}} when you are using the portal.

# Open questions
The eight open questions (OQ-1 to OQ-8) are the faked capabilities the portal depends on: admin auth, the activity-feed event bus, suspend, plan changes, usage reset, invites and verification, plan persistence and invoices. They live in {{doc:stories|User Stories}}.
