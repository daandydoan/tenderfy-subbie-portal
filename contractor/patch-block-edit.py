"""Client block editor = admin block-edit.html + the deltas below. Re-run after refreshing the admin copy.
usage: python3 patch-block-edit.py <path to admin block-edit.html>"""
import sys, re
src = open(sys.argv[1]).read()
def sub(old, new, n=1):
    global src
    assert src.count(old) == n, (src.count(old), old[:70])
    src = src.replace(old, new)

# chrome + assets
sub('<title>Tenderfy — Super Admin · Edit Block</title>', '<title>Tenderfy — Contractor · Block Builder</title>')
sub('<link rel="icon" type="image/svg+xml" href="favicon.svg">', '<link rel="icon" type="image/svg+xml" href="../favicon.svg">')
sub('<link rel="stylesheet" href="styles.css">\n<link rel="stylesheet" href="admin.css">', '<link rel="stylesheet" href="../styles.css">')
sub('<body data-page="blocks" data-title="Blocks">', '<body data-page="blocks" data-title="Block Library">')
sub('<script src="shell.js"></script>', '<script src="../app.js"></script>\n<script src="client-shell.js"></script>')

# one client: blocks always belong to this business — no "Who is this block for?", no Preview style
sub("const clientId=_params.get('client')||(existing&&existing.client)||null;", "const clientId=CLIENT_ID;   // client-side: always this business")
sub("if(!clientId && !existing){", "if(false){   // client picker — admin only")
sub('<span class="hdr-brand"><span class="ms">palette</span> Preview style <select id="brandSel" class="fin fin-sm"></select>', '<span class="hdr-brand" style="display:none"><select id="brandSel" class="fin fin-sm"></select>')
sub('<label class="ws-check"><input type="checkbox" id="b-share">', '<label class="ws-check" style="display:none"><input type="checkbox" id="b-share">')

# permission: per-element Fixed / Editable / Locked — owner decides, estimator obeys
sub('''          <div class="insp-sec" id="sec-field" style="display:none">''', '''          <div class="insp-sec" id="sec-perm" style="display:none">
            <div class="insp-h">Permission</div>
            <div class="insp-row"><label>Estimator</label><div class="seg full" id="s-perm">
              <button data-perm="fixed" title="Estimators see it as is">Fixed</button>
              <button data-perm="editable" title="Estimators fill or change this part">Editable</button>
              <button data-perm="locked" title="Head office only — estimators can't touch it">Locked</button>
            </div></div>
            <div class="fhint">Only Editable parts can be changed when this block is filled in a tender.</div>
          </div>

          <div class="insp-sec" id="sec-field" style="display:none">''')
sub("    document.getElementById('sec-imgsrc').style.display = id==='image'?'':'none';\n",
    "    document.getElementById('sec-imgsrc').style.display = id==='image'?'':'none';\n"
    "    document.getElementById('sec-perm').style.display = sel?'':'none';\n"
    "    if(sel){ const p=selEl().perm||'fixed'; document.querySelectorAll('#s-perm button').forEach(b=>b.classList.toggle('on',b.dataset.perm===p)); }\n")
sub("    document.getElementById('s-preset').addEventListener('change',",
    "    document.querySelectorAll('#s-perm button').forEach(b=>b.addEventListener('click',()=>{ if(!sel) return; selEl().perm=b.dataset.perm; render(); commit(); renderInspector(); }));\n"
    "    document.getElementById('s-preset').addEventListener('change',")
sub("    const cls = 'vb-el'+(on?' selected':'');", "    const cls = 'vb-el'+(on?' selected':'')+(el.perm&&el.perm!=='fixed'?' perm-'+el.perm:'');")
sub("  /* Permission control on the selected element (canvas) */",
    "  /* Permission control on the selected element (canvas) */\n"
    "  .vb-el.perm-editable>.vb-name::after,.vb-el.perm-locked>.vb-name::after{font-family:'Material Symbols Outlined';font-size:12px;margin-left:4px;vertical-align:-2px}\n"
    "  .vb-el.perm-editable>.vb-name::after{content:'edit';color:var(--teal)} .vb-el.perm-locked>.vb-name::after{content:'lock';color:var(--st-amber-tx)}")

# head-office lock (set from the library): read-only editor
sub("<script src=\"client-shell.js\"></script>", "<script src=\"client-shell.js\"></script>\n<script>const CLIENT_ID='taylor'; function blockLocked(id){ try{ return (JSON.parse(localStorage.getItem('tf_clock'))||{})[id]||null; }catch(e){ return null; } }</script>")
sub("  applyBrand(); initStyle(); render(); syncBar(); pushHist(); base=snap(); applyPanels(); applyStationeryUI(); resumeDraft();\n}",
    "  applyBrand(); initStyle(); render(); syncBar(); pushHist(); base=snap(); applyPanels(); applyStationeryUI(); resumeDraft();\n"
    "  const lk=existing&&blockLocked(existing.id);\n"
    "  if(lk){ const s=document.getElementById('saveBtn'); s.classList.add('disabled'); s.style.pointerEvents='none'; s.innerHTML='<span class=\"ms\" style=\"font-size:17px\">lock</span> Locked by head office';\n"
    "    document.getElementById('cvWrap').insertAdjacentHTML('afterbegin',`<div class=\"fhint\" style=\"margin:0 0 8px;color:var(--st-amber-tx)\"><span class=\"ms\" style=\"font-size:14px;vertical-align:-2px\">lock</span> Locked by ${lk.by} on ${lk.date} — unlock it from the Block Library to edit.</div>`); }\n}")
open('block-edit.html','w').write(src)
print('patched', len(src))
