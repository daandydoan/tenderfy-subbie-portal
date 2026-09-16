# Shared builder files — copied verbatim from `daandydoan/tenderfy-admin`

`components.css` `editor-shared.js` `primitives.js` `block-layouts.js` `document-render.js` `blocks-data.js`

Copy, don't fork. Refresh with `cp` from the admin repo; `cmp` must be silent. Source commit: 42a7f86 (16 Sep 2026).

## Divergences (client-only, layered on top, never edited into the copies)

| Where | What | Why |
|---|---|---|
| storage | admin keys (`tf_blocks_custom`, `tf_bthumb_*`) are reused as-is; client extras live under `tf_c*` | the two prototypes are on different origins, so there is no collision to design for |
| `blocks.html` | no Published/Draft/Inactive status — replaced by Lock (head office) and owner (Yours / Tenderfy) | client UI carries no workflow status (17 Aug) |
