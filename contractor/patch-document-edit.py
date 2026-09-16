"""Client document builder = admin document-edit.html + the deltas below.
usage: python3 patch-document-edit.py <path to admin document-edit.html>"""
import sys
src = open(sys.argv[1]).read()
def sub(old, new, n=1):
    global src
    assert src.count(old) == n, (src.count(old), old[:70])
    src = src.replace(old, new)

# chrome + assets
sub('<title>Tenderfy — Super Admin · Edit Document</title>', '<title>Tenderfy — Contractor · Document Builder</title>')
sub('<link rel="icon" type="image/svg+xml" href="favicon.svg">', '<link rel="icon" type="image/svg+xml" href="../favicon.svg">')
sub('<link rel="stylesheet" href="styles.css">\n<link rel="stylesheet" href="admin.css">', '<link rel="stylesheet" href="../styles.css">')
sub('<body data-page="library" data-title="Documents">', '<body data-page="library" data-title="Templates">')
sub('<script src="shell.js"></script>', "<script src=\"../app.js\"></script>\n<script src=\"client-shell.js\"></script>\n<script>const CLIENT_ID='taylor'; const USER='Andrew Williams'; function blockLocked(id){ try{ return (JSON.parse(localStorage.getItem('tf_clock'))||{})[id]||null; }catch(e){ return null; } }</script>")
sub("href=\"library.html\" class=\"pg-back\" title=\"Back to Documents\"", "href=\"templates.html\" class=\"pg-back\" title=\"Back to Templates\"")
sub("setTimeout(()=>location.href='library.html',700);", "setTimeout(()=>location.href='templates.html',700);", 2)

# one client: its brand always applies; no client or workflow-status fields
sub("let mode='layout', selK=null, curItem=null, brand=null;", "let mode='layout', selK=null, curItem=null, brand=TENANTS.find(t=>t.id===CLIENT_ID).brand;   // client-side: always this business")
sub('<div class="fld"><label for="d-client">Client this document is for</label>', '<div class="fld" style="display:none"><label for="d-client">Client this document is for</label>')
sub('<div class="fhint" id="d-client-hint" style="margin:-6px 0 12px">', '<div class="fhint" id="d-client-hint" style="display:none">')
sub('<div class="fld"><label for="d-status">Status</label>', '<div class="fld" style="display:none"><label for="d-status">Status</label>')

# audit: who changed what — a log on the record, shown in its own tab
sub('<button data-wtab="layers">Layers</button></div>', '<button data-wtab="layers">Layers</button><button data-wtab="audit">Audit</button></div>')
sub('        <div id="paneLayers" style="display:none">\n          <div class="side-title">Layers</div>',
    '        <div id="paneAudit" style="display:none"><div class="side-title">Audit</div><div class="card" id="auditList"></div></div>\n'
    '        <div id="paneLayers" style="display:none">\n          <div class="side-title">Layers</div>')
sub("const PANES={blocks:'paneBlocks',style:'paneStyle',ai:'paneAi',layers:'paneLayers'};", "const PANES={blocks:'paneBlocks',style:'paneStyle',ai:'paneAi',layers:'paneLayers',audit:'paneAudit'};")
sub("blocks:snap.blocks });", "blocks:snap.blocks, audit:[...((doc&&doc.audit)||[]), {date:new Date().toISOString().slice(0,16).replace('T',' '), by:USER, what:(doc?'Updated':'Created')+' · '+items.length+' blocks'+(items.some(it=>it.doc)?' · '+items.filter(it=>it.doc).length+' edited in place':'')}] });")
sub("  // Details are asked on the first save (like the block builder) — editing starts straight away.\n}",
    "  // Details are asked on the first save (like the block builder) — editing starts straight away.\n"
    "  document.getElementById('auditList').innerHTML = (doc&&doc.audit&&doc.audit.length) ? doc.audit.slice().reverse().map(a=>`<div style=\"padding:8px 0;border-bottom:1px solid var(--border);font-size:12.5px\"><div style=\"font-weight:600\">${a.what}</div><div class=\"fhint\" style=\"margin:0\">${a.by} · ${a.date}</div></div>`).join('') : '<div class=\"fhint\">Nothing yet — every save is logged here with who did it.</div>';\n"
    "  const lk=doc&&blockLocked(doc.id);\n"
    "  if(lk){ const s=document.getElementById('saveBtn'); s.style.pointerEvents='none'; s.innerHTML='<span class=\"ms\" style=\"font-size:17px\">lock</span> Locked by head office';\n"
    "    document.querySelector('.ws-tabs').insertAdjacentHTML('afterend',`<div class=\"fhint\" style=\"margin:8px 0;color:var(--st-amber-tx)\"><span class=\"ms\" style=\"font-size:14px;vertical-align:-2px\">lock</span> Locked by ${lk.by} on ${lk.date} — unlock it from Templates to edit.</div>`); }\n}")
open('document-edit.html','w').write(src)
print('patched', len(src))
