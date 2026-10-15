% Tenderfy Business Admin (Contractor Portal)
%% Usage guide
How to run sourcing in the Business Admin portal, task by task. Written for main contractors. Prototype branch main, commit 9160217.

| Item | Detail |
|---|---|
| Version | 1.0 |
| Date | 2026-10-11 |
| Owner | Daniel |
| Audience | Main contractors managing their subcontractor supply chain, tenders and quote requests. |
| Prototype | main, commit 9160217 |
| Design | {{figma}}, 18 frames |
| Related | {{doc:stories\|User Stories}}, {{doc:usecases\|Use Cases}}, {{doc:spec\|Screen Specification}}, {{folder\|All docs}} |
| Changes since last version | Initial version. |

# Before you start
Some features depend on back-end services that are not live in the prototype: sign in, sending requests and invites, CSV import, compare and award, nudges, tender packs and notifications. Where a task needs one, this guide says so. See {{doc:stories|User Stories}}.

# Build your supply chain
- Add a subbie from the Subcontractors home: Add Subcontractor (E06). Email and ABN are validated: a bad email shows "Enter a valid email address"; a bad ABN shows "That ABN is not valid - check the number" (ABN is optional).
- Bulk-load with Import CSV (E07): upload and map columns; malformed rows are flagged.
- Open a subbie's profile (H07) to check capability and compliance.
[[shots: H01, E06, E07]]

# Prepare a tender
- See your tenders (H02), foldered by sector, and open one (H03).
- Assemble the pack in Build Tender (H04): pages, attachments and a preview.
[[shots: H02, H03, H04]]

# Request quotes
- Create a New Quote Request (H05): task, due date, documents and recipients.
- Add inclusions and exclusions with chips: type and press **Enter**; press **Escape** to close the editor.
- Send it to the chosen subbies.
[[shots: H05]]

# Chase awaiting subbies
- From an open request, pick a subbie (E09) and open the request (H08).
- Nudge an awaiting subbie (E08). At the per-request cap you will see "Nudge limit reached".
[[shots: H08, E08]]

# Compare and award
- Open Compare Quotes (H06) to see price, inclusions, exclusions and assumptions side by side.
- Accept one quote to award that subbie.
[[shots: H06]]

# Track responses
- View Request (H08) reflects the status: "Will respond" (E01), "Quote submitted" (E02), awarded (E03), unsuccessful (E04) or declined (E05).
[[shots: H08]]

# Set the rules
- Notification Settings (H09): the sender, nudge timing and email template.
[[shots: H09]]

# Keyboard shortcuts
| Where | Keys | What it does |
|---|---|---|
| Inclusion / exclusion chips (New Quote Request) | Enter | Adds the typed chip |
| Chip editor | Escape | Closes the editor |

# FAQ
- **Why can I not actually send a request?** Sending depends on a back-end that is not live in the prototype (OQ-2).
- **Does CSV import really onboard subbies?** Not yet; parsing and invites are faked (OQ-3).
- **Are the tiles and rates real?** No. Tiles, response rates, quote amounts and tender values are sample data. The GST math on quotes is real.
- **Where do nudge rules live?** In Notification Settings (H09).
