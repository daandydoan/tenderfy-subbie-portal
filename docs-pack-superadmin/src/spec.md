% Tenderfy Super Admin
%% Screen specification
What each screen state shows and what each element does. Every frame links to the Figma design. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | All 16 screen states of the Super Admin portal, grouped by area. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 16 frames |
| Related | {{doc:stories\|User Stories}}, {{doc:usecases\|Use Cases}}, {{doc:guide\|Usage Guide}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# How to read this
- Frame: H for the main path, E for edge and deal-stage states, placed under the frame they branch from.
- Element: the label on screen. Shows: exact text and its data source. Behaviour: what happens on click or state change.
- On-screen text is quoted exactly. Colour and position are in Figma, not here.
- Sample numbers (dashboard totals, usage meters, per-subbie stats) are invented demo data. Deal values come from the shared demo store.

## Global layout
| Region | Shows | Behaviour |
|---|---|---|
| Left nav | The internal sections (overview, subcontractors, companies, subscriptions). | Navigates; the current section is highlighted. |
| Header | Page title, search, settings, notifications and the admin menu ("Andrew Williams"). | Opens search, settings and admin options. |
| Demo panel | A prototype-only persona control. | Switches demo data; not a product feature. |
| Content | The screen body described per area below. | Varies by screen. |

## Screen inventory
| Frame | Area | Screen | State | Branches from |
|---|---|---|---|---|
| H01 | Overview | Dashboard | Default | - |
| H02 | Subcontractors | Subcontractors | List | H01 |
| H03 | Subcontractors | View Sub-contractor | Live (Ridgeline) | H02 |
| H04 | Companies | Companies | List | H01 |
| H05 | Companies | Company | Overview | H04 |
| H06 | Companies | Company Profile | Account + usage | H05 |
| H07 | Subscriptions | Subscriptions | Plans list | H01 |
| H08 | Subscriptions | Edit Subscription | Plan editor | H07 |
| E01 | Subcontractors | View Sub-contractor | Deal invited | H03 |
| E02 | Subcontractors | View Sub-contractor | Deal responding | H03 |
| E03 | Subcontractors | View Sub-contractor | Deal info requested | H03 |
| E04 | Subcontractors | View Sub-contractor | Deal submitted | H03 |
| E05 | Subcontractors | View Sub-contractor | Deal awarded | H03 |
| E06 | Subcontractors | View Sub-contractor | Deal declined | H03 |
| E07 | Subcontractors | View Sub-contractor | Deal withdrawn | H03 |
| E08 | Subcontractors | Subcontractors | Filtered | H02 |

# Overview (H01)
@meta Stories: SA-01 · Use cases: UC-04
[[shots: H01]]

| Element | Shows | Behaviour |
|---|---|---|
| Platform figures | Company, subbie, AI-usage and subscription totals (sample data). | Static. |

# Subcontractors (H02, H03, E01 to E08)
@meta Stories: SA-02, SA-03, SA-04 · Use cases: UC-01
[[shots: H02, E08, H03, E01, E02, E03, E04, E05, E06, E07]]

| Element | Shows | Behaviour |
|---|---|---|
| Subbie list (H02) | Rows with status: "Invited", "Will respond", "Asked for info", "Quote submitted", "Active", "Declined", "Withdrawn", plus stat tiles and "Export". | A row opens the profile (H03). |
| Filter (E08) | The list narrowed to one status. | Sets the status filter. |
| Activity feed (H03) | A live subbie's timeline of cross-portal events. | Read-only. |
| Deal stage (E01 to E07) | The feed at each stage: invited, responding, information requested, submitted, awarded, declined, withdrawn. | Reflects the deal in the shared store. |

# Companies (H04, H05, H06)
@meta Stories: SA-05, SA-06 · Use cases: UC-02
[[shots: H04, H05, H06]]

| Element | Shows | Behaviour |
|---|---|---|
| Companies list (H04) | The companies on the platform. | Opens a company (H05). |
| Company overview (H05) | A company's summary and its subbies. | Opens the account profile (H06). |
| Company Profile (H06) | Plan and AI-usage meters, plus admin actions. | Suspend / reactivate, change plan, move to free, grant or reset limits, resend invites, verify subbies, view invoices. |

# Subscriptions (H07, H08)
@meta Stories: SA-07, SA-08 · Use cases: UC-03
[[shots: H07, H08]]

| Element | Shows | Behaviour |
|---|---|---|
| Subscriptions list (H07) | The plans and who is on each. | Opens a plan to edit (H08). |
| Edit Subscription (H08) | Price, limits and features. | Create or edit a plan. |

# Menus, dialogs and sheets
| Frame | Element | Shows | Behaviour |
|---|---|---|---|
| H02 | Bulk actions | Row selection | The bulk bar appears once a row is selected. |
| H06 | Admin actions | Suspend, grant, reset, resend, verify, invoices | Each fires a confirm or a toast. |
| H07 | Delete plan | A confirm | Guards deleting a plan companies are on. |

# Visual tokens
From the prototype CSS, mirrored as Figma variables. CSS is the source of truth. These tokens are shared across the three Tenderfy portals.

| Token | CSS variable | Value |
|---|---|---|
| color/teal | `--teal` | #1d9e75 |
| color/teal-bright | `--teal-bright` | #6addb5 |
| color/teal-tint | `--teal-tint` | #1d9e75 @15% |
| color/cta | `--cta` | #38988a |
| color/cta-dark | `--cta-dark` | #2f8276 |
| color/nav | `--nav` | #27535c |
| color/header | `--header` | #2e343c |
| color/ink | `--ink` | #2e3c3b |
| color/gray | `--gray` | #596262 |
| color/light | `--light` | #a1adab |
| color/lighter | `--lighter` | #cbd5d3 |
| color/bg-shade | `--bg-shade` | #eaedec |
| color/secondary | `--secondary` | #ffbc4a |
| color/accent | `--accent` | #f95246 |
| color/st-grey-bg | `--st-grey-bg` | #efefef |
| color/st-grey-tx | `--st-grey-tx` | #434343 |
| color/st-amber-bg | `--st-amber-bg` | #faeeda |
| color/st-amber-tx | `--st-amber-tx` | #633806 |
| color/st-green-bg | `--st-green-bg` | #e1f5ee |
| color/st-green-tx | `--st-green-tx` | #085041 |
| color/st-pink-bg | `--st-pink-bg` | #fcebeb |
| color/st-pink-tx | `--st-pink-tx` | #a32d2d |
| color/page | `--page` | #f9fafb |
| color/border | `--border` | #eaedec |
| color/row | `--row` | #f3f4f6 |

# Not designed yet
Every story has a frame, and every inventory state is built. The faked capabilities (see {{doc:stories|User Stories}}, OQ-1 to OQ-8) are back-end gaps, not missing screens.

# Conflicts
None found.
