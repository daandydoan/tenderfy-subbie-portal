# Subbies — Feature Flows

Letter = how they arrived (a, b, c, d). Number = stage. Screens in [brackets].

## Entry emails
- 01 new-invite — contractor adds subbie, no quote
- 02 invited-not-registered — invited to a tender, carries a quote
- 03 registered-other-admin — already registered, new contractor invites
- 04 existing-user — existing user, quote lands on dashboard

## Before
No quote yet, just getting set up.

| Code | Arrives | Lands on |
|---|---|---|
| a1 | import invite [01] -> sign up -> auth | empty dashboard |
| c1 | self sign-up -> auth | empty dashboard |

Auth path [signin -> create-account -> verify-email]. Recovery: forgot password [forgot-password]; expired or invalid link [edge-expired].

## Start & First Quote
A quote arrives.

| Code | Arrives | Lands on |
|---|---|---|
| b1 | tender invite [02] -> sign up -> auth | dashboard, 1 quote (Opened) |
| d1 | new quote [04] -> log in | dashboard, 1 quote (Opened) |
| d1-alt | new contractor invites [03] -> log in | dashboard, quote added |
| a1.5 / c1.5 | empty -> quote received | dashboard, 1 quote (Opened) |

## During

### 2 — Respond, full quote
**a2 / b2 / c2 / d2** — [view-request] open -> [prepare-quote] price + line items + i/e/a + attach docs [documents-tab] -> [quote-summary] preview -> submit -> [confirmation] -> dashboard (Quote submitted)
Save draft at any point -> resume from the dashboard. After submit: view submitted quote / update / withdraw [quote-summary, update-quote].
Chat with the contractor is available from any request [view-request, documents-tab]: send messages, attach files.

### 2.5 — Respond, quick reply
**a2.5 / b2.5 / c2.5 / d2.5** — [view-request] open -> pick one:
- Will respond -> status Will respond
- Too busy -> status Declined (Closed)
- Need info -> opens chat (stays Opened)

Can still be followed by a full quote (back to 2).

## After

### 3 — Statuses
**a3 / b3 / c3 / d3** — card moves to the matching state, counts + tabs update.
`Opened -> Will respond / Declined / Info requested`
`Opened -> Quote submitted -> Updated / Withdrawn`
`Quote submitted -> Awarded (stage 7) / Not awarded (Closed)`
On award the subbie gets a notification + email [email-accepted].
Tabs: Action needed · Quotes submitted · Closed · External · All.

### 7 — Awarded work
**a7 / b7 / c7 / d7** — [awarded] won contracts, value, win rate, per-contract detail

## Outside

### 4 — Outside quote (any time)
**a4 / b4 / c4 / d4**
- 4.1 Finish profile [profile]
- 4.2 Settings [settings]
- 4.3 Upload docs + set due dates [file-manager], view a doc [document-detail]; free users upload their Capability Statement here
- 4.4 Quote Settings [template-editor]
- 4.5 Notifications [notifications]

### 5 — Premium create (free uploads, premium creates)
**a5 / b5 / c5 / d5**
- 5.1 Capability Statement [capability-builder] — creator first, then manager
- 5.2 Company Documents [brand-templates] — branded docs, logo + colours
- 5.3 Project Library [project-library] — upload / template / Ray from URL -> [project-detail]
- 5.4 Agent Ray — preset-prompt start, suggested edits after
Free builds and previews; download + edit the finished document is Premium (gate at the output, not the build). Locked items bounce to Upgrade [8.1].

### 6 — External quotes (to own client)
**a6 / b6 / c6 / d6** — [new-quote] create -> save draft or send -> [external-quote] track statuses: Draft / Sent / Accepted / Declined (External tab)

### 8 — Account & subscription
**a8 / b8 / c8 / d8**
- 8.1 Upgrade -> locked feature or nav prompt [premium] -> pay -> Premium active (features unlock in place)
- 8.2 Manage plan + billing [profile#subscription]
- 8.3 Downgrade -> back to Free; created work kept read-only, never deleted

## States (each screen)
Filled / Empty / Error, toggled from the demo panel. Built: dashboard, view-request, prepare-quote, file-manager, profile, verify-email, create-account.

Not listed (available throughout, no flow of their own): filter / sort / collapse, search, show-hide password, mark notifications read, logout, folders, dashboard tabs + pills.

---

## Prototype check
| Stage | Status |
|---|---|
| Before, Start, recovery | Built |
| 2 full quote | Built end-to-end |
| 2.5 quick reply | Built, wired to contractor |
| 3 statuses | Built (re-submit stays "submitted" internally) |
| 4 outside quote | Built |
| 5 premium create | Built; manager + guided start added |
| 6 external | Built |
| 7 awarded | Built |
| 8 subscription | Upgrade dialog + pay + profile billing built; downgrade read-only is a rule, not a screen |

## Gaps
1. d1-alt (registered under another contractor) was missing from the notes.
2. "Quote updated" shows as a status but stays "submitted" under the hood.
3. Downgrade-keeps-work-read-only is a stated rule; no dedicated screen yet.
