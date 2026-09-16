# Shared builder files — copied verbatim from `daandydoan/tenderfy-admin`

`components.css` `editor-shared.js` `primitives.js` `block-layouts.js` `document-render.js` `blocks-data.js`

Copy, don't fork. Refresh with `cp` from the admin repo; `cmp` must be silent. Source commit: 42a7f86 (16 Sep 2026).

## Divergences (client-only, layered on top, never edited into the copies)

| Where | What | Why |
|---|---|---|
| storage | admin keys (`tf_blocks_custom`, `tf_bthumb_*`) are reused as-is; client extras live under `tf_c*` | the two prototypes are on different origins, so there is no collision to design for |
| `blocks.html` | no Published/Draft/Inactive status — replaced by Lock (head office) and owner (Yours / Tenderfy) | client UI carries no workflow status (17 Aug) |
| `block-edit.html` | generated: `python3 patch-block-edit.py <admin block-edit.html>` — one client (`CLIENT_ID`), no client picker / Preview style / Share, + Permission section (`el.perm`), + head-office lock banner | the deltas live in the script, so refreshing the admin copy is a re-run |
| `client-shell.js` | stands in for admin `shell.js` (confirmAction, buildShell → pageInit, Escape) with the contractor chrome | different sidebar |
| `tenant-data.js` `brand-editor.js` | copied verbatim too — `block-layouts.js` needs `roleValue`, the editor needs the brand tokens | |
| `document-edit.html` | generated: `python3 patch-document-edit.py <admin document-edit.html>` — brand is always this client's, no client/status fields, + Audit tab (`doc.audit[]`, one entry per save), + head-office lock banner, exits to `templates.html` | `library-data.js` copied verbatim for the seed documents |
| `document.html` | new — view (`mode` absent), Simple editor (`mode=simple`: every part editable, add/reorder/remove blocks, fork-on-edit save) and the estimator's fill (`mode=fill`). Keeps its own copy of each block in `tf_cfill_<docId>` (fork-on-edit, same `doc` shape); only `perm:'editable'` parts take focus; Repeat rows become `row.items[]` and expand before render; merge fields fill from a side panel; saves and "Ready for PDF" append to `doc.audit`. Page/canvas CSS copied from `document-edit.html`'s inline style | the admin has no estimator side |
