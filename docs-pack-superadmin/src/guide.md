% Tenderfy Super Admin
%% Usage guide
How the internal team runs oversight in the Super Admin portal, task by task. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Audience | Tenderfy's internal operations team. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 16 frames |
| Related | {{doc:stories\|User Stories}}, {{doc:usecases\|Use Cases}}, {{doc:spec\|Screen Specification}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# Before you start
Admin actions (suspend, plan change, usage reset, invites, verification, plan editing) and the live activity feed depend on back-end services that are not live in the prototype. Where a task needs one, this guide says so. See {{doc:stories|User Stories}}.

# Read the platform
- The Dashboard (H01) shows platform-wide company, subbie, AI-usage and subscription figures (sample data).
[[shots: H01]]

# Oversee subcontractors
- The Subcontractors list (H02) shows every subbie with status such as "Invited", "Quote submitted", "Active", "Declined" and "Withdrawn".
- Filter by status (E08) to narrow the list.
- Open a subbie (H03) to read the live activity feed; it reflects the deal stage from invited (E01) to awarded (E05), declined (E06) or withdrawn (E07).
[[shots: H02, H03]]

# Manage a company
- Open a company from the Companies list (H04, H05).
- On the Company Profile (H06), review the plan and AI-usage meters, then suspend or reactivate, change plan, move to free, grant or reset limits, resend invites, verify subbies, or view invoices.
[[shots: H04, H06]]

# Run subscriptions
- See the plans and their members on the Subscriptions list (H07).
- Create or edit a plan on Edit Subscription (H08): price, limits and features.
[[shots: H07, H08]]

# FAQ
- **Do the admin actions take effect?** Not in the prototype; suspend, plan change, usage reset and invites are faked (OQ-3 to OQ-6).
- **Is the activity feed real?** It is driven by the shared demo store, not a real event bus (OQ-2).
- **Are the totals and meters real?** No. Dashboard totals, usage meters and per-subbie stats are sample data. Deal values come from the shared demo store.
