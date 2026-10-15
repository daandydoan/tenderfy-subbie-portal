% Tenderfy Business Admin (Contractor Portal)
%% Screen specification
What each screen state shows and what each element does. Every frame links to the Figma design. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Scope | All 18 screen states of the Business Admin portal, grouped by area. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 18 frames |
| Related | {{doc:stories\|User Stories}}, {{doc:usecases\|Use Cases}}, {{doc:guide\|Usage Guide}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# How to read this
- Frame: H for the main path, E for edge and dialog states, placed under the frame they branch from.
- Element: the label on screen. Shows: exact text and its data source. Behaviour: what happens on click, key press or state change.
- On-screen text is quoted exactly. Colour and position are in Figma, not here.
- Sample numbers (dashboard tiles, response rates, quote amounts, tender values) are invented demo data. The GST math on quotes is real.

## Global layout
| Region | Shows | Behaviour |
|---|---|---|
| Left nav | Portal sections (supply chain, tenders, requests, settings). | Navigates; the current section is highlighted. |
| Header | Page title, search, notifications and the user menu. | Opens search, notifications and account options. |
| Demo panel | A prototype-only persona control. | Switches demo data; not a product feature. |
| Content | The screen body described per area below. | Varies by screen. |

## Screen inventory
| Frame | Area | Screen | State | Branches from |
|---|---|---|---|---|
| H01 | Supply chain | Subcontractors | Has subbies + open requests | - |
| H02 | Tenders | Tenders | List | - |
| H03 | Tenders | Tender Detail | View | H02 |
| H04 | Tenders | Build Tender | Editor | H03 |
| H05 | Request | New Quote Request | Create | H01 |
| H06 | Request | Compare Quotes | Side by side | H01 |
| H07 | Supply chain | View Sub-contractor | Profile | H01 |
| H08 | Request | View Request | Opened | H01 |
| H09 | Account | Notification Settings | Default | H01 |
| E01 | Request | View Request | Will respond | H08 |
| E02 | Request | View Request | Quote submitted | H08 |
| E03 | Request | View Request | Awarded | H08 |
| E04 | Request | View Request | Unsuccessful | H08 |
| E05 | Request | View Request | Declined | H08 |
| E06 | Supply chain | Subcontractors | Add Subcontractor dialog | H01 |
| E07 | Supply chain | Subcontractors | Import CSV dialog | H01 |
| E08 | Request | Subcontractors | Nudge dialog | H01 |
| E09 | Request | Subcontractors | Pick subbie dialog | H01 |

# Supply chain (H01, H07, E06, E07, E08, E09)
@meta Stories: BA-01, BA-02, BA-03, BA-04 · Use cases: UC-01, UC-03
[[shots: H01, H07, E06, E07, E08, E09]]

| Element | Shows | Behaviour |
|---|---|---|
| Summary tiles (H01) | Counts and totals (sample data). | Static. |
| Subcontractor roster (H01) | Subbie rows: name, trade, status. | Search filters by name, trade or row text; a row opens the profile (H07). |
| Open requests (H01) | Requests awaiting subbie responses. | Opens the Pick subbie dialog (E09) or a request (H08). |
| Add Subcontractor (E06) | Company, email, ABN, trades. | Validates email and ABN; "Enter a valid email address" / "That ABN is not valid - check the number"; ABN optional. |
| Import CSV (E07) | Upload and column mapping. | Flags malformed rows. |
| Nudge dialog (E08) | Awaiting subbies for a request. | Nudges one; "Nudge limit reached" at the cap. |
| Pick subbie (E09) | The subbies on an open request. | Opens the chosen subbie's request (H08). |
| View Sub-contractor (H07) | Capability, compliance, request history. | Read-only. |

# Tenders (H02, H03, H04)
@meta Stories: BA-05, BA-06, BA-07 · Use cases: UC-02
[[shots: H02, H03, H04]]

| Element | Shows | Behaviour |
|---|---|---|
| Tenders list (H02) | Tenders foldered by sector. | Opens a tender (H03). |
| Tender Detail (H03) | Information, documentation, notes, and the subbie quotes ("Out for Quote" and accepted). | Opens quotes and the pack. |
| Build Tender (H04) | Pages, attachments and a preview. | Assembles the tender pack. |

# Requests (H05, H06, H08, E01, E02, E03, E04, E05)
@meta Stories: BA-08, BA-09, BA-12 · Use cases: UC-02, UC-04, UC-05
[[shots: H05, H06, H08, E01, E02, E03, E04, E05]]

| Element | Shows | Behaviour |
|---|---|---|
| New Quote Request (H05) | Task, due date, documents, recipients, and inclusion / exclusion chips. | **Enter** adds a chip, **Escape** closes the editor; send issues the request. |
| Compare Quotes (H06) | Price, inclusions, exclusions and assumptions side by side. | Accept one to award that subbie. |
| View Request (H08) | Status and the subbie's response. | Reflects the current deal state. |
| Status (E01 to E05) | "Will respond", "Quote submitted", awarded, unsuccessful or declined. | Read-only reflection of the deal. |

# Settings (H09)
@meta Stories: BA-13 · Use cases: UC-06
[[shots: H09]]

| Element | Shows | Behaviour |
|---|---|---|
| Notification Settings (H09) | Sender, nudge timing, email template. | Saves the chasing rules. |

# Menus, dialogs and sheets
| Frame | Element | Shows | Behaviour |
|---|---|---|---|
| E06 | Add Subcontractor | Company, email, ABN, trades | Validates email and ABN on submit. |
| E07 | Import CSV | Upload and column mapping | Flags malformed rows. |
| E08 | Nudge | Awaiting subbies | Caps nudges per request. |
| E09 | Pick subbie | Subbies on a request | Opens the chosen request. |
| H05 | Chip editor | Inclusions and exclusions | **Enter** adds, **Escape** closes. |

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
