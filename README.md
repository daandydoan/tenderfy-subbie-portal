# Tenderfy — Subbie Portal Prototype

A clickable, multi-page HTML prototype of the Tenderfy subcontractor ("subbie")
portal. No framework, no build step — just static files. Open `index.html` (or
`sitemap.html` for the full screen map) in a browser.

## What's inside

- One HTML file per screen (23 pages).
- `styles.css` — shared styles and design tokens.
- `app.js` — injects the sidebar/header chrome and the floating Filled/Empty/Error
  state toggle into each page; handles the live GST reverse-calculation.
- `CLAUDE.md` — project briefing for continuing in Claude Code.

Fonts (Outfit + Material Symbols) load from Google Fonts, so an internet
connection is needed for correct rendering. Everything else is self-contained.

## Run locally

Just open the files — but because pages reference `styles.css`/`app.js` by
relative path, it's best to serve the folder rather than double-click:

```bash
# from inside the project folder
python3 -m http.server 8000
# then open http://localhost:8000/
```

`index.html` is the entry point (auth landing). `sitemap.html` lists every screen.

## Deploy / share a live link

Serve the **whole folder** together — the relative links and shared CSS/JS need
all files present.

### Option A — Netlify Drop (fastest, no account)
1. Go to https://app.netlify.com/drop
2. Drag the **project folder** onto the page.
3. You get a public URL like `something.netlify.app`.

### Option B — Netlify CLI (best for repeated deploys)
```bash
npm install -g netlify-cli
netlify login            # one-time, opens browser
netlify deploy --dir . --prod
```
Re-run the last command anytime to push updates.

### Option C — GitHub Pages (durable, free)
1. Create a public repo, upload all files (keep `index.html` at the root).
2. Settings → Pages → Source: "Deploy from a branch", Branch: `main`, folder `/`.
3. Wait ~1–2 min; link appears as `https://<user>.github.io/<repo>/`.

### Option D — Vercel
```bash
npm i -g vercel
vercel          # first run sets up the project
vercel --prod   # deploy
```

## Continue in Claude Code

```bash
npm install -g @anthropic-ai/claude-code
cd path/to/this/folder
claude
```

Claude Code reads `CLAUDE.md` on startup for full context: the design tokens,
page architecture, which screens are built vs. placeholder, and the Figma node
IDs for every screen still to build. If the Figma MCP connector is available, it
can pull frames the same way the prototype was built.

## Status

- **Built:** auth landing, dashboard (+empty), view request, prepare quote
  (+error), quote summary, confirmation, file manager (+empty), profile
  (+empty), settings.
- **Placeholder (navigable, not yet rebuilt):** update/withdraw quote, document
  detail, Ray panel, documents tab, create-account flow, forgot-password flow,
  templates, F1 emails, edge states. See `sitemap.html`.

Static visual prototype only — no backend or persistence.
