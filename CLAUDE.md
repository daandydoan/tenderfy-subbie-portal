# CLAUDE.md — Tenderfy Subbie Portal Prototype

Briefing for Claude Code. Read this fully before editing. This is a multi-page,
static HTML click-through prototype of the **subcontractor ("subbie") portal**
for Tenderfy, an AI-assisted tendering SaaS for construction/trades firms.

The prototype mirrors the Figma design and is meant to be hosted as a clickable
demo (no build step, no framework). Fidelity to the Figma source is the priority.

---

## Source of truth

- **Figma file:** `Tenderfy — Design Updates`, file key `gg4QYrFuOOYhfADMamgECl`
- **Active subbie section:** node `568:2199` (all current subbie screens live here)
- All screens here were rebuilt by reading real Figma frames (screenshots +
  design context) via the **Figma MCP connector**. If that connector is
  available to you, use it the same way: `get_screenshot` and
  `get_design_context` with `fileKey` + `nodeId`, selecting the frame in the
  Figma **desktop app** first if a node won't resolve.
- **Do not invent layouts.** If a screen hasn't been seen, pull the frame first.
  Earlier in this project, guessing at unseen screens produced repeated rework.

---

## Tech / architecture

- Plain static HTML. **No framework, no bundler, no localStorage.** One file per
  screen. Shared `styles.css` and `app.js` only.
- `app.js` injects the sidebar + header chrome and the floating state-toggle into
  every page that has a `<div id="screen">`. Each page declares config via:

      <script>
        window.PAGE   = { nav:'dashboard', crumb:'Dashboard > View Request' };
        window.STATES = { filled:'page.html', empty:'page-empty.html', error:null };
        window.CURRENT_STATE = 'filled';
      </script>

  `nav` highlights the sidebar icon; `crumb` is the header breadcrumb (use `<b>`
  for ancestors and `<span class="cur">` for the current crumb); `STATES` drives
  the bottom-right Filled/Empty/Error toggle (a null state renders disabled).
- Auth pages (`index.html`) have **no** `#screen` and no sidebar/header — full
  custom body with the gradient background.
- Navigation is real `<a href>` between files. Dashboard rows use
  `onclick="location.href=..."` with `event.stopPropagation()` on the actions cell.
- Fonts: **Outfit** (Google Fonts) for all text; **Material Symbols Outlined**
  for all icons (class `.ms`, ligature names like `space_dashboard`). Never use
  unicode glyphs for icons — always Material Symbols, to match Figma.

### Pages were generated programmatically
The original 23 pages were emitted by a Python generator for consistency. It has
been removed from the shipped folder. You can either edit the `.html` files
directly (fine for small changes) or recreate a generator for bulk work — either
is fine, but keep `styles.css`/`app.js` shared and the
`window.PAGE`/`window.STATES` contract intact.

---

## Design tokens (from Figma — use these exact values)

| Token | Value | Use |
|---|---|---|
| Primary teal | `#1D9E75` | primary buttons, totals, active tab text |
| Bright green | `#6ADDB5` | active sidebar icon, active tab underline, msg-card border |
| Teal tint | `rgba(29,158,117,.15)` | "Quote submitted" badge bg |
| Nav (sidebar) | `#27535C` | left sidebar |
| Header | `#2E343C` | top bar, dark "Schedule your response" card, active stat cell |
| Ink (text) | `#2E3C3B` | body text |
| Gray | `#596262` | secondary text |
| Light | `#A1ADAB` | tertiary text, table header text |
| Lighter | `#CBD5D3` | borders inside cards, progress track |
| Shade | `#EAEDEC` | "Opened" badge bg, generic borders |
| Secondary | `#FFBC4A` | logo gold, profile-banner icon, PDF tag, progress fill |
| Accent | `#F95246` | logout icon, unread badge, destructive "Remove" |
| Status amber | bg `#FFF3E0` / tx `#E65100` | "Awaiting response" |
| Status green | bg `#E8F5E9` / tx `#2E7D32` | "Will respond" |
| Status pink | bg `#FCE4EC` / tx `#C62828` | "Declined" / "Not awarded" |
| Page bg | `#F9FAFB` | app background |

All tokens are CSS variables in `styles.css` `:root` — reference `var(--teal)` etc.

Other verified specifics:
- Avatar colours by contractor: TC `#38988A`, HP `#5C6BC0`, AC `#EF6C00`,
  BQ `#6D4C41`, MS `#00838F`.
- Border radius: 8px inputs, 10-12px cards, 14-16px large cards/rails.
- Sidebar is **icon-only** (white icons, active = bright green). Despite older
  notes saying subbie sidebar has text labels, the live Figma is icon-only —
  match Figma.
- GST pattern: amounts entered **including GST**, system reverse-calculates
  Subtotal ex. GST / GST 10% / Total inc. GST. `recalc()` in `app.js` does this.
  Total inc. GST is always teal, semibold.

---

## Screen inventory

### Built from verified Figma frames (match closely; refine vs. frame if needed)
| File | Screen | Figma node |
|---|---|---|
| `index.html` | A1/A2 — Auth landing (gradient, email-first) | `568:6244` / `601:6934` |
| `dashboard.html` | C2 — Dashboard (All requests) | `633:10126` |
| `dashboard-empty.html` | C2 — Dashboard (Empty) | `744:17736` |
| `view-request.html` | C1 — View Request | `568:2255` |
| `prepare-quote.html` | D1 — Prepare Quote (Filled) | `783:671` |
| `prepare-quote-error.html` | D1 — Prepare Quote (validation error) | `642:1024` |
| `quote-summary.html` | D1 — Quote summary (3-col modal) | `568:5524` |
| `confirmation.html` | D2 — Quote submitted confirmation | `750:22328` |
| `file-manager.html` | V1 — File Manager Home | `653:10232` |
| `file-manager-empty.html` | V1 — File Manager (Empty) | — |
| `profile.html` | E1 — Profile View (built from spec; frame would not render) | `568:4227` |
| `profile-empty.html` | E1 — Profile (Empty) | — |
| `settings.html` | S — Settings | `568:4533` |
| `sitemap.html` | Prototype index (not a Figma screen) | — |

### Placeholder pages — clearly marked, navigable, NOT yet rebuilt
Each shows a "Placeholder - not yet rebuilt" tag, its Figma node, and onward
links. **Next work = convert these to real screens by pulling their frames.**
| File | Screen | Figma node |
|---|---|---|
| `update-quote.html` | D3 Update Quote / D4 Withdraw | `602:2199` |
| `document-detail.html` | V3 Document Detail | `558:2262` |
| `ray.html` | Ray AI co-pilot panel | `650:4229` |
| `documents-tab.html` | View Request — Documents tab | `650:3273` |
| `create-account.html` | A3 Create / A4 Verify / A5 Verified / A6 Profile setup | `568:6262` |
| `forgot-password.html` | C3 Forgot / C4 Reset / C5 Confirmed | `568:6794` |
| `template-editor.html` | E1 View/Edit/Save Template (premium) | `568:4407` |
| `email-accepted.html` | F1 Quote Accepted / Rejected emails | `652:6050` |
| `edge-expired.html` | G2 Expired Link / G3 Past Due | `606:2223` |

More variants exist in the Figma section (dashboard has 8 tab states; View
Request has document/notes/Ray/empty variants; Prepare Quote has Lump Sum
variants). Build on request.

---

## Conventions when adding/editing screens

1. Read the Figma frame first (screenshot + design context). Match layout, copy
   text, spacing, and colours to the frame.
2. Reuse existing CSS classes in `styles.css`; add new ones rather than inline
   styles where a pattern will repeat.
3. Keep the `window.PAGE` / `window.STATES` contract so chrome + toggle work.
4. Use Material Symbols for every icon; Outfit for text.
5. Link new screens into `sitemap.html` and into any logical flow entry point.
6. When converting a placeholder, replace the body but keep the filename so
   existing links stay valid.
7. Verify all internal `href`s resolve before finishing.

---

## Known gaps / decisions

- **Logo** is an `attach_file` Material Symbol in gold as a stand-in. The real
  brand mark is an image asset in Figma (gold paperclip). For true fidelity,
  export it as SVG and drop it into the sidebar `.logo` + auth `.wordmark`.
- The live Figma is **email-first** auth and uses File Manager tabs
  All/Insurance/Licence/Certification/Capability Statement/Others — these differ
  from older project notes. Figma wins.
- No backend, no real persistence — this is a visual click-through only.

---

## Hosting (see README.md)
Serve the whole folder together (relative links + shared CSS/JS). `index.html`
is the entry point. Netlify Drop, GitHub Pages, or `netlify deploy --dir .`.
