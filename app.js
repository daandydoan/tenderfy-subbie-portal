/* ===== Tenderfy Subbie Portal — shared JS ===== */

/* ===== Global State persona — New User vs Returning User. Persisted so it
   applies across every screen; exposed as <html data-user="..."> for CSS/JS. ===== */
function tfGetUser(){ try{ return localStorage.getItem('tf_user') || 'returning'; }catch(e){ return 'returning'; } }
function tfSetUser(u){ try{ localStorage.setItem('tf_user', u); }catch(e){} location.reload(); }
const TF_USER_NAME = { new:'Jordan Mills', returning:'Andrew Williams' };
document.documentElement.setAttribute('data-user', tfGetUser());

// Page provides #screen content; we wrap it in sidebar + header chrome.
function mountPage(){
  const cfg = window.PAGE || {};
  const screen = document.getElementById('screen');
  if(!screen) return;
  const navItems = [
    {key:'dashboard', icon:'apps', label:'Dashboard', href:'dashboard.html'},
    {key:'templates', icon:'space_dashboard', label:'Template Manager', href:'template-editor.html'},
    {key:'files', icon:'image', label:'File Manager', href:'file-manager.html'},
    {key:'profile', icon:'account_circle', label:'Profile', href:'profile.html'},
    {key:'settings', icon:'settings', label:'Settings', href:'settings.html'}
  ];
  const ics = navItems.map(n=>`<a class="ic ${cfg.nav===n.key?'active':''}" href="${n.href}" title="${n.label}"><span class="ms">${n.icon}</span><span class="label">${n.label}</span></a>`).join('');
  const wrap = document.createElement('div');
  wrap.className='app';
  wrap.innerHTML = `
    <aside class="sidebar">
      <a class="logo" href="dashboard.html">
        <img class="logo-mark" src="../logo-symbol.svg" alt="Tenderfy" width="30" height="30">
        <img class="logo-word" src="../logo-wordmark-white.svg" alt="Tenderfy" height="26">
      </a>
      ${ics}
      <div class="grow"></div>
      <a class="logout" href="signin.html" title="Logout"><span class="ms">logout</span><span class="label">Logout</span></a>
    </aside>
    <div class="navbk" onclick="tfNavToggle(false)"></div>
    <div class="main">
      <div class="mobilebar">
        <span class="mb-burger" onclick="tfNavToggle()"><span class="ms">menu</span></span>
        <img class="mb-logo" src="../logo-symbol.svg" alt="Tenderfy">
        <span class="mb-sp"></span>
        <a class="mb-ic" href="view-request.html" title="Messages"><span class="ms">chat_bubble</span><span class="ndot" style="background:#F95246">02</span></a>
        <a class="mb-ic" href="notifications.html" title="Notifications"><span class="ms">notifications</span><span class="ndot">03</span></a>
      </div>
      <div class="header">
        <div class="l"><span class="ms" style="font-size:18px">home</span> <span class="crumb">${cfg.crumb||'Dashboard'}</span></div>
        <div class="r">
          <span class="nbtn" title="Messages" onclick="location.href='view-request.html'" style="margin-right:2px"><span class="ms" style="font-size:18px">chat_bubble</span><span class="ndot" style="background:#F95246">02</span></span>
          <div class="nbell">
            <span class="nbtn" onclick="toggleNotif(event)"><span class="ms" style="font-size:18px">notifications</span><span class="ndot" id="ndot">03</span></span>
            <div class="npanel" id="npanel">
              <div class="nph"><span>Notifications</span><a onclick="notifReadAll(event)">Mark all as read</a></div>
              <div class="nlist">
                <div class="nitem unread" data-href="view-request.html" onclick="notifRead(this,event)"><span class="nic" style="background:var(--teal-tint);color:var(--teal)"><span class="ms">assignment</span></span><div class="ntx"><div class="t">New request from Tenderfy Civil</div><div class="d">Traffic Management &mdash; Velocity Link Highway Extension</div><div class="w">2 hours ago</div></div><span class="dot"></span></div>
                <div class="nitem unread" data-href="view-request.html" onclick="notifRead(this,event)"><span class="nic" style="background:#FDEFD9;color:#B7791F"><span class="ms">chat_bubble</span></span><div class="ntx"><div class="t">New message from Acme Constructions</div><div class="d">&ldquo;Please include your itemised schedule of rates if&hellip;&rdquo;</div><div class="w">4 hours ago</div></div><span class="dot"></span></div>
                <div class="nitem unread" data-href="dashboard.html" onclick="notifRead(this,event)"><span class="nic" style="background:#FCEBEB;color:var(--accent)"><span class="ms">schedule</span></span><div class="ntx"><div class="t">Quote due in 3 days</div><div class="d">Hydraulic lift works &mdash; Civic Centre Redevelopment</div><div class="w">Yesterday</div></div><span class="dot"></span></div>
                <div class="nitem" data-href="view-request-submitted.html" onclick="notifRead(this,event)"><span class="nic" style="background:var(--bg-shade);color:var(--gray)"><span class="ms">send</span></span><div class="ntx"><div class="t">Quote sent to Tenderfy Civil</div><div class="d">QUO-2026-0441 &middot; $11,290.00 inc. GST</div><div class="w">2 days ago</div></div><span class="dot"></span></div>
                <div class="nitem" data-href="confirmation.html" onclick="notifRead(this,event)"><span class="nic" style="background:var(--st-green-bg);color:var(--st-green-tx)"><span class="ms">check_circle</span></span><div class="ntx"><div class="t">Quote accepted by Hansen Projects</div><div class="d">Solar panel install &mdash; City Library Renewal</div><div class="w">3 days ago</div></div><span class="dot"></span></div>
              </div>
              <a class="npf" href="notifications.html">View all notifications</a>
            </div>
          </div>
          <span>${TF_USER_NAME[tfGetUser()]}</span>
        </div>
      </div>
      <div class="content" id="content"></div>
    </div>`;
  const content = wrap.querySelector('#content');
  content.appendChild(screen);
  document.body.insertBefore(wrap, document.body.firstChild);
  screen.style.display='';
  updateNdot();
}

// Mobile nav drawer — hamburger opens the sidebar over a backdrop
function tfNavToggle(open){
  const sb = document.querySelector('.sidebar'), bk = document.querySelector('.navbk');
  if(!sb) return;
  const willOpen = (open === undefined) ? !sb.classList.contains('open') : open;
  sb.classList.toggle('open', willOpen);
  if(bk) bk.classList.toggle('open', willOpen);
}
// Mock notifications dropdown in the header
function toggleNotif(e){
  const p = document.getElementById('npanel');
  if(p) p.classList.toggle('open');
}
function notifRead(el, ev){
  el.classList.remove('unread');
  updateNdot();
  if(el.dataset.href) location.href = el.dataset.href;
}
function notifReadAll(ev){
  document.querySelectorAll('.nitem.unread').forEach(n=>n.classList.remove('unread'));
  updateNdot();
}
function updateNdot(){
  const d = document.getElementById('ndot');
  if(!d) return;
  const n = document.querySelectorAll('.nitem.unread').length;
  d.textContent = n>9 ? '9+' : '0'+n;
  d.style.display = n ? 'flex' : 'none';
}
document.addEventListener('click', (e)=>{
  const p = document.getElementById('npanel');
  if(p && p.classList.contains('open') && !e.target.closest('.nbell')) p.classList.remove('open');
});

// ===== Prepare Quote: GST handling, Lump Sum mode, add line item, live summary =====
function fmtMoney(n){ n = Number(String(n).replace(/[^0-9.]/g,'')) || 0; return '$' + n.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function recalc(){
  const incEl = document.getElementById('incGst');
  const incGst = incEl ? incEl.checked : true;
  const num = v => Number(String(v).replace(/[^0-9.]/g,'')) || 0;
  const lumpMode = document.getElementById('lumpMode');
  let entered = 0;
  if(lumpMode){
    if(lumpMode.style.display !== 'none'){           // Lump Sum mode
      const a = lumpMode.querySelector('[data-amt]');
      entered = a ? num(a.value) : 0;
    } else {                                          // Default (itemised) mode
      document.querySelectorAll('#itemBody [data-amt]').forEach(i=>{ entered += num(i.value); });
    }
  } else {
    document.querySelectorAll('[data-amt]').forEach(i=>{ entered += num(i.value); });
  }
  let sub, gst, tot;
  if(incGst){ tot = entered; sub = tot/1.1; gst = tot - sub; }   // amounts include GST
  else { sub = entered; gst = 0; tot = entered; }                // no GST applied
  ['sub','r-sub'].forEach(id=>{ const e=document.getElementById(id); if(e) e.textContent=fmtMoney(sub); });
  ['gst','r-gst'].forEach(id=>{ const e=document.getElementById(id); if(e) e.textContent=fmtMoney(gst); });
  ['tot','r-tot'].forEach(id=>{ const e=document.getElementById(id); if(e) e.textContent=fmtMoney(tot); });
  // No GST => hide the GST + Subtotal breakdown and show a single "Total"
  setRow('gst', '.gst-line', incGst); setRow('r-gst', '.sline', incGst);
  setRow('sub', '.gst-line', incGst); setRow('r-sub', '.sline', incGst);
  setRowLabel('tot', '.gst-line', '.lab', incGst ? 'Total inc. GST' : 'Total');
  setRowLabel('r-tot', '.sline', 'span', incGst ? 'Total inc. GST' : 'Total');
  lockSummaryHeight(incGst);
  syncQuoteSummary(incGst);
}
// Keep the Quote summary card a constant height when the GST/Subtotal rows hide,
// by swapping their (measured) height into a spacer above the divider.
function lockSummaryHeight(incGst){
  const rsum = document.querySelector('.card.rsum'); if(!rsum) return;
  const spacer = rsum.querySelector('.rsum-spacer'); if(!spacer) return;
  if(incGst){
    const subL = document.getElementById('r-sub'), gstL = document.getElementById('r-gst');
    const h = (subL ? subL.closest('.sline').offsetHeight : 0) + (gstL ? gstL.closest('.sline').offsetHeight : 0);
    if(h) rsum.dataset.gsth = h;          // remember while the rows are visible
    spacer.style.height = '0px';
  } else {
    spacer.style.height = (rsum.dataset.gsth || 63) + 'px';
  }
}
function setRow(valId, lineSel, vis){ const v=document.getElementById(valId); const line=v?v.closest(lineSel):null; if(line) line.style.display = vis ? '' : 'none'; }
function setRowLabel(valId, lineSel, labelSel, text){ const v=document.getElementById(valId); const line=v?v.closest(lineSel):null; const lab=line?line.querySelector(labelSel):null; if(lab) lab.textContent=text; }
function syncQuoteSummary(incGst){
  const note = document.querySelector('.rsum .sub');
  if(note) note.textContent = incGst ? 'All amounts include GST' : 'GST not applied';
  const wrap = document.querySelector('.rsum-items');
  if(!wrap) return;
  const lump = document.getElementById('lumpMode');
  let rows = '';
  if(lump && lump.style.display !== 'none'){
    const a = lump.querySelector('[data-amt]');
    rows = '<div class="sline"><span>Lump sum</span><span>' + fmtMoney(a ? a.value : 0) + '</span></div>';
  } else {
    document.querySelectorAll('#itemBody tr').forEach(tr=>{
      const nEl = tr.querySelector('.iname'), aEl = tr.querySelector('[data-amt]');
      const name = nEl ? (nEl.value !== undefined ? nEl.value : nEl.textContent).trim() : '';
      if(!name) return;                            // skip un-named rows
      rows += '<div class="sline"><span>' + escapeHtml(name) + '</span><span>' + fmtMoney(aEl ? aEl.value : 0) + '</span></div>';
    });
  }
  wrap.innerHTML = rows;
}
function addLineItem(){
  const body = document.getElementById('itemBody');
  if(!body) return;
  const tr = document.createElement('tr');
  tr.innerHTML = '<td><input class="iname" placeholder="Enter Item Name.." oninput="recalc()"></td>'
    + '<td><div class="iinput"><span class="pfx">$</span><input value="0.00" data-amt oninput="recalc()"></div></td>'
    + '<td class="irm"><button class="irm-btn" onclick="removeLineItem(this)" title="Remove"><span class="ms">close</span></button></td>';
  body.appendChild(tr);
  const ni = tr.querySelector('.iname'); if(ni) ni.focus();
}
function removeLineItem(btn){
  const tr = btn.closest('tr');
  if(tr) tr.remove();
  recalc();
}
// Collapsible section headers (Prepare quote)
function toggleSection(el){ const s = el.closest('.collapsible'); if(s) s.classList.toggle('collapsed'); }

// Inclusions & Exclusions on Prepare Quote — chip editor.
// Inclusions are plain removable chips; exclusion chips toggle
// "price as variation" on click.
// Personal tag library (16 Jul call): inclusions/exclusions/assumptions are chosen
// from a per-user multiselect dropdown; typing a new one adds it and saves the tag.
const IE_DEFAULT_TAGS = {
  inc: ['GST (10%)','After-hours loading 1.5×','Plant within labour rates','Site cleanup'],
  exc: ['Permits & approvals','Weekend rates','Rock excavation','Dewatering','Asbestos removal','Service relocations','Out-of-hours work'],
  asm: ['Clear site access','Prices valid 30 days','Power & water on site','Standard hours','Single mobilisation','Materials at current market rates']
};
const IE_WRAP = {inc:'incChips', exc:'excChips', asm:'asmChips'};
function ieEsc(t){ return String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function ieLib(kind){
  try{ const s = JSON.parse(localStorage.getItem('ieTags-'+kind)); if(Array.isArray(s)) return s; }catch(_){}
  return IE_DEFAULT_TAGS[kind].slice();
}
function ieSaveTag(kind, text){
  const lib = ieLib(kind);
  if(!lib.some(t => t.toLowerCase() === text.toLowerCase())){
    lib.push(text);
    localStorage.setItem('ieTags-'+kind, JSON.stringify(lib));
  }
}
function ieCurrent(kind){
  const wrap = document.getElementById(IE_WRAP[kind]);
  return new Set(wrap ? [...wrap.querySelectorAll('.iechip > span:nth-child(2)')].map(s => s.textContent.toLowerCase()) : []);
}
function ieMsToggle(kind, force){
  document.querySelectorAll('.ie-ms.open').forEach(m => { if(m.dataset.kind !== kind) m.classList.remove('open'); });
  const ms = document.getElementById('ieMs-'+kind);
  if(!ms) return;
  const open = (force === undefined) ? !ms.classList.contains('open') : force;
  ms.classList.toggle('open', open);
  if(open){
    const s = ms.querySelector('.ie-mssearch');
    if(s){ s.value = ''; ms._q = ''; setTimeout(() => s.focus(), 0); }
    ieMsRender(kind);
  }
}
function ieMsFilter(kind){
  const ms = document.getElementById('ieMs-'+kind);
  ms._q = ms.querySelector('.ie-mssearch').value;
  ieMsRender(kind);
}
function ieMsKey(e, kind){
  if(e.key === 'Enter'){ e.preventDefault(); ieMsCreate(kind); }
  else if(e.key === 'Escape'){ ieMsToggle(kind, false); }
}
function ieMsRender(kind){
  const ms = document.getElementById('ieMs-'+kind);
  if(!ms) return;
  const opts = ms.querySelector('.ie-msopts');
  const q = (ms._q || '').trim(), ql = q.toLowerCase();
  const cur = ieCurrent(kind);
  const lib = ieLib(kind).filter(t => !ql || t.toLowerCase().includes(ql));
  let html = lib.map(t => {
    const on = cur.has(t.toLowerCase());
    return `<div class="ie-msopt${on ? ' on' : ''}" data-tag="${ieEsc(t)}"><span class="ie-msck"><span class="ms">check</span></span><span class="ie-mstxt">${ieEsc(t)}</span></div>`;
  }).join('');
  if(q && !ieLib(kind).some(t => t.toLowerCase() === ql)){
    html += `<div class="ie-msopt create" data-create="1"><span class="ms">add</span> Add &ldquo;${ieEsc(q)}&rdquo; as a new tag</div>`;
  }
  opts.innerHTML = html || '<div class="ie-msempty">No matching tags — type to add one</div>';
}
function ieMsCreate(kind){
  const ms = document.getElementById('ieMs-'+kind);
  const v = (ms._q || '').trim();
  if(!v) return;
  if(!ieCurrent(kind).has(v.toLowerCase())) ieChipAdd(kind, v, false);
  ieSaveTag(kind, v);
  const s = ms.querySelector('.ie-mssearch'); s.value = ''; ms._q = '';
  ieMsRender(kind); s.focus();
}
function ieMsRefresh(){ ['inc','exc','asm'].forEach(k => { if(document.getElementById('ieMs-'+k)) ieMsRender(k); }); }
// Delegated clicks: pick/toggle a tag inside a panel, or close on outside click
document.addEventListener('click', (e) => {
  const opt = e.target.closest('.ie-msopt');
  if(opt){
    const ms = opt.closest('.ie-ms'), kind = ms.dataset.kind;
    if(opt.dataset.create){ ieMsCreate(kind); return; }
    const tag = opt.dataset.tag;
    if(opt.classList.contains('on')){
      const wrap = document.getElementById(IE_WRAP[kind]);
      [...wrap.querySelectorAll('.iechip')].forEach(c => {
        const label = c.querySelector('span:nth-child(2)');
        if(label && label.textContent.toLowerCase() === tag.toLowerCase()) c.remove();
      });
      ieCount();
    } else {
      ieChipAdd(kind, tag, false);
    }
    ieMsRender(kind);
    return;
  }
  if(!e.target.closest('.ie-ms')) document.querySelectorAll('.ie-ms.open').forEach(m => m.classList.remove('open'));
});
function ieChipAdd(kind, text, isVar){
  const wrap = document.getElementById({inc:'incChips',exc:'excChips',asm:'asmChips'}[kind]);
  if(!wrap) return;
  const chip = document.createElement('span');
  chip.className = 'iechip ' + kind;
  const label = ieEsc(text);
  if(kind==='exc'){
    chip.setAttribute('onclick','ieVarChip(this)');
    chip.title = 'Click to toggle pricing as a variation';
    chip.innerHTML = `<span class="ms">warning</span><span>${label}</span>`
      + `<span class="var"${isVar?'':' style="display:none"'}>var &middot; cost +15%</span>`
      + `<span class="ms x" onclick="ieChipRemove(event,this)" title="Remove">close</span>`;
  } else if(kind==='asm'){
    chip.innerHTML = `<span class="ms">info</span><span>${label}</span>`
      + `<span class="ms x" onclick="ieChipRemove(event,this)" title="Remove">close</span>`;
  } else {
    chip.innerHTML = `<span class="ms">check</span><span>${label}</span>`
      + `<span class="ms x" onclick="ieChipRemove(event,this)" title="Remove">close</span>`;
  }
  wrap.appendChild(chip);
  ieCount();
  ieMsRefresh();
}
function ieVarChip(chip){
  const v = chip.querySelector('.var');
  if(v) v.style.display = (v.style.display==='none') ? '' : 'none';
}
function ieChipRemove(ev, x){ ev.stopPropagation(); x.closest('.iechip').remove(); ieCount(); ieMsRefresh(); }
function ieCount(){
  const inc = document.querySelectorAll('#incChips .iechip').length;
  const exc = document.querySelectorAll('#excChips .iechip').length;
  const asm = document.querySelectorAll('#asmChips .iechip').length;
  const set = (id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
  set('rIncCount',inc); set('rExcCount',exc); set('rAsmCount',asm);
  set('incN',inc); set('excN',exc); set('asmN',asm);
}
// Collapsible Messages card — click the header to fold the thread + reply box
document.addEventListener('click', (e)=>{
  const head = e.target.closest('.msg-head');
  if(!head) return;
  const card = head.closest('.msg-card');
  if(card) card.classList.toggle('collapsed');
});
function setQuoteMode(mode){
  const item = document.getElementById('itemMode'), lump = document.getElementById('lumpMode');
  const segDivs = document.querySelectorAll('.seg div');
  const isLump = mode === 'lump';
  if(item) item.style.display = isLump ? 'none' : '';
  if(lump) lump.style.display = isLump ? '' : 'none';
  if(segDivs[0]) segDivs[0].classList.toggle('on', !isLump);
  if(segDivs[1]) segDivs[1].classList.toggle('on', isLump);
  recalc();
}
// Eye toggle on password fields (auth flow)
function togglePw(el){
  const i = el.parentElement.querySelector('input');
  if(!i) return;
  i.type = i.type === 'password' ? 'text' : 'password';
  el.textContent = i.type === 'password' ? 'visibility_off' : 'visibility';
}
// Collapsible filter dropdown on the dashboard tab bar
function toggleFilters(btn){
  const panel = btn.parentElement.querySelector('.filter-panel');
  const open = btn.classList.toggle('open');
  if(panel) panel.classList.toggle('open', open);
}
document.addEventListener('click', (e)=>{
  document.querySelectorAll('.filter-dd').forEach(dd=>{
    if(!dd.contains(e.target)){
      const t = dd.querySelector('.filter-toggle'), p = dd.querySelector('.filter-panel');
      if(t) t.classList.remove('open');
      if(p) p.classList.remove('open');
    }
  });
});

// Placeholder-action toast: actions/buttons with no real destination show a
// toast instead of navigating. Trigger via data-toast="Description", or any a[href="#"].
let __toastTimer;
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
  clearTimeout(__toastTimer);
  __toastTimer = setTimeout(()=>t.classList.remove('show'), 2600);
}
document.addEventListener('click', (e)=>{
  const el = e.target.closest && e.target.closest('[data-toast], a[href="#"]');
  if(!el) return;
  e.preventDefault();
  const desc = el.getAttribute('data-toast') || el.textContent.trim().replace(/\s+/g,' ');
  showToast('Placeholder Action: ' + desc);
  if(typeof closeQuoteMenu === 'function') closeQuoteMenu();
});

function openModal(){ const m=document.getElementById('modal'); if(m) m.classList.add('open'); }
function closeModal(){ const m=document.getElementById('modal'); if(m) m.classList.remove('open'); }

// Document preview modal (Documents tab / File Manager): a card opens a popup
// previewing the document and its details.
function mountDocModal(){
  if(document.getElementById('docModal') || !document.querySelector('.fgrid')) return;
  const m = document.createElement('div');
  m.id = 'docModal'; m.className = 'modal-overlay';
  m.innerHTML = `<div class="docmodal">
      <div class="dm-head">
        <span class="doctag dm-tag"></span>
        <div class="dm-titlewrap"><div class="dm-title"></div><div class="dm-by"></div></div>
        <button class="dm-close" onclick="closeDoc()" aria-label="Close"><span class="ms">close</span></button>
      </div>
      <div class="dm-body">
        <div class="dm-preview"></div>
        <div class="dm-side">
          <div class="dm-side-h">Details</div>
          <div class="dm-row"><span class="k">Type</span><span class="v dm-type"></span></div>
          <div class="dm-row"><span class="k">Pages</span><span class="v dm-pages"></span></div>
          <div class="dm-row"><span class="k">Uploaded by</span><span class="v dm-uploader"></span></div>
          <div class="dm-row"><span class="k">Date</span><span class="v dm-date"></span></div>
          <div class="dm-row"><span class="k">Size</span><span class="v dm-size"></span></div>
          <a class="btn btn-primary btn-block dm-dl" data-toast="Download document"><span class="ms" style="font-size:18px">download</span> Download</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(m);
  m.addEventListener('click', (e)=>{ if(e.target === m) closeDoc(); });
}
function openDoc(card){
  const m = document.getElementById('docModal'); if(!m) return;
  const tag = card.querySelector('.doctag');
  const by = (card.querySelector('.by') || {}).textContent || '';
  m.querySelector('.dm-tag').textContent = tag.textContent;
  m.querySelector('.dm-tag').className = tag.className + ' dm-tag';
  m.querySelector('.dm-title').textContent = card.querySelector('.ti').textContent;
  m.querySelector('.dm-by').textContent = by;
  m.querySelector('.dm-type').textContent = tag.textContent;
  const sub = card.querySelector('.sub');
  m.querySelector('.dm-pages').textContent = sub ? sub.textContent.replace(/[·.\s]+$/, '').trim() : '—';
  m.querySelector('.dm-uploader').textContent = by.replace(/^by\s+/i, '') || '—';
  m.querySelector('.dm-date').textContent = card.dataset.date || '—';
  m.querySelector('.dm-size').textContent = card.dataset.size || '—';
  const prev = m.querySelector('.dm-preview');
  const thumb = card.querySelector('.thumb');
  if(thumb && thumb.classList.contains('map')){
    prev.className = 'dm-preview map'; prev.innerHTML = '<span class="ms">map</span>';
  } else {
    prev.className = 'dm-preview'; prev.innerHTML = '<div class="dm-page">' + (thumb ? thumb.innerHTML : '') + '</div>';
  }
  m.classList.add('open');
}
function closeDoc(){ const m=document.getElementById('docModal'); if(m) m.classList.remove('open'); }
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeDoc(); });

// Document selection (Documents tab): a checkbox per card + "Download Selected".
function initDocChecks(){
  if(!document.querySelector('.docs-dl')) return;   // Documents tab only
  document.querySelectorAll('.fdoc').forEach((card)=>{
    const top = card.querySelector('.top');
    if(!top || top.querySelector('.fcheck')) return;
    const badge = top.querySelector('.doctag');
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.className = 'fcheck'; cb.title = 'Select document';
    cb.addEventListener('click', (e)=>{ e.stopPropagation(); toggleDocSel(cb); });
    const wrap = document.createElement('span'); wrap.className = 'top-l';
    top.insertBefore(wrap, badge); wrap.appendChild(cb); if(badge) wrap.appendChild(badge);
  });
  updateDownloadSel();
}
function toggleDocSel(cb){
  const card = cb.closest('.fdoc');
  if(card) card.classList.toggle('sel', cb.checked);
  updateDownloadSel();
}
function toggleSelectAll(master){
  document.querySelectorAll('.fdoc .fcheck').forEach((cb)=>{
    cb.checked = master.checked;
    const card = cb.closest('.fdoc');
    if(card) card.classList.toggle('sel', cb.checked);
  });
  updateDownloadSel();
}
function updateDownloadSel(){
  const btn = document.querySelector('.docs-dl'); if(!btn) return;
  const all = document.querySelectorAll('.fdoc .fcheck');
  const n = document.querySelectorAll('.fdoc .fcheck:checked').length;
  const badge = btn.querySelector('.dl-n');
  if(badge) badge.textContent = n ? '(' + n + ')' : '';
  btn.classList.toggle('disabled', n === 0);
  btn.setAttribute('data-toast', n ? ('Download ' + n + ' selected document' + (n > 1 ? 's' : '')) : 'Select documents to download');
  const master = document.querySelector('.docs-selall-cb');
  if(master){ master.checked = n > 0 && n === all.length; master.indeterminate = n > 0 && n < all.length; }
}

// State toggle: builds the floating control. Page provides window.STATES = {filled:'page.html', empty:'page-empty.html', error:null}
function mountStateToggle(){
  // Always show the toggle. Pages that don't declare window.STATES get a default
  // where only the current page (Filled) is active and Empty/Error are disabled.
  let st = window.STATES;
  if(!st){
    const here = location.pathname.split('/').pop() || 'index.html';
    st = { filled: here, empty: null, error: null };
  }
  const cur = window.CURRENT_STATE || 'filled';
  const opt = (k)=>{
    const href = st[k];
    if(!href) return `<a class="disabled">${k[0].toUpperCase()+k.slice(1)}</a>`;
    return `<a class="${cur===k?'on':''}" href="${href}">${k[0].toUpperCase()+k.slice(1)}</a>`;
  };
  const user = tfGetUser();
  const ubtn = (k,label)=>`<a class="${user===k?'on':''}" data-user-btn="${k}" title="${label}">${label}</a>`;
  // Contractor-side screens — reachable only from this panel, not the app nav
  const here = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/,'');
  const cpg = (href,label)=>{ const base = href.split('/').pop().replace(/\.html$/,''); return `<a class="${here===base?'on':''}" href="${href}">${label}</a>`; };
  const el = document.createElement('div');
  el.className='state-toggle collapsed';
  el.innerHTML =
      `<div class="st-head"><span class="st-grip"><span class="ms">drag_indicator</span> States</span>`
    +   `<button class="st-collapse" title="Expand"><span class="ms">unfold_more</span></button></div>`
    + `<div class="st-body">`
    +   `<span class="title">Screen state</span><div class="opts">${opt('filled')}${opt('empty')}${opt('error')}</div>`
    +   `<span class="title">Global state</span><div class="opts opts-user">${ubtn('new','New User')}${ubtn('returning','Returning User')}</div>`
    +   `<span class="title">Contractor side</span><div class="opts opts-user">${cpg('../contractor/projects.html','Tenders')}${cpg('../contractor/tender-detail.html','Tender Detail')}${cpg('../contractor/subbies.html','Subbie List')}</div>`
    +   `<div class="opts opts-user">${cpg('../contractor/view-subbie.html','View Subbie')}${cpg('../contractor/view-request.html','View Request')}${cpg('../contractor/new-request.html','New Request')}</div>`
    + `</div>`;
  el.querySelectorAll('[data-user-btn]').forEach(b=>b.addEventListener('click',()=>tfSetUser(b.getAttribute('data-user-btn'))));
  const collapseBtn = el.querySelector('.st-collapse');
  collapseBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const collapsed = el.classList.toggle('collapsed');
    collapseBtn.querySelector('.ms').textContent = collapsed ? 'unfold_more' : 'unfold_less';
    collapseBtn.title = collapsed ? 'Expand' : 'Collapse';
  });
  makeDraggable(el, el.querySelector('.st-head'));
  document.body.appendChild(el);
}

// Drag a fixed element by a handle (pointer-based; clamps to the viewport).
function makeDraggable(el, handle){
  // Anchored by its bottom edge so the panel always expands upward (and never
  // off the bottom of the screen), wherever it has been dragged.
  let dragging=false, sx=0, sy=0, ox=0, ob=0;
  handle.addEventListener('pointerdown', (e)=>{
    if(e.target.closest('.st-collapse')) return;        // let the button click through
    dragging=true;
    const r=el.getBoundingClientRect();
    el.style.left=r.left+'px'; el.style.bottom=(window.innerHeight - r.bottom)+'px'; el.style.right='auto'; el.style.top='auto';
    sx=e.clientX; sy=e.clientY; ox=r.left; ob=window.innerHeight - r.bottom;
    el.classList.add('dragging');
    try{ handle.setPointerCapture(e.pointerId); }catch(_){}
    e.preventDefault();
  });
  handle.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    const r=el.getBoundingClientRect();
    let nl=ox+(e.clientX-sx), nb=ob-(e.clientY-sy);
    nl=Math.max(6, Math.min(nl, window.innerWidth  - r.width  - 6));
    nb=Math.max(6, Math.min(nb, window.innerHeight - r.height - 6));
    el.style.left=nl+'px'; el.style.bottom=nb+'px';
  });
  const end=(e)=>{ dragging=false; el.classList.remove('dragging'); try{ handle.releasePointerCapture(e.pointerId); }catch(_){} };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
}

// "Submit quote" caret dropdown — respond options. Rendered as a fixed-position
// element on <body> so it escapes the table's overflow/fixed-height clipping.
function mountQuoteMenu(){
  if(!document.querySelector('.split .caret') || document.getElementById('qmenu')) return;
  const m = document.createElement('div');
  m.id = 'qmenu'; m.className = 'qmenu';
  m.innerHTML = `
    <a class="qitem" onclick="qaOpen('respond')"><span class="ms qico">schedule</span><span class="qtxt"><span class="qt">Will respond within&hellip;</span><span class="qd">Let them know when to expect your quote</span></span></a>
    <div class="qdiv"></div>
    <a class="qitem" onclick="qaOpen('busy')"><span class="ms qico">event_busy</span><span class="qtxt"><span class="qt">Too busy for this job</span><span class="qd">No capacity to take this on right now</span></span></a>
    <a class="qitem" onclick="qaOpen('info')"><span class="ms qico">help</span><span class="qtxt"><span class="qt">Need more information</span><span class="qd">Ask the contractor a question first</span></span></a>`;
  document.body.appendChild(m);
}
function closeQuoteMenu(){ const m=document.getElementById('qmenu'); if(m) m.classList.remove('open'); }
function openQuoteMenu(caret){
  const m = document.getElementById('qmenu'); if(!m) return;
  if(m.classList.contains('open') && m._caret === caret){ closeQuoteMenu(); return; }
  m._caret = caret;
  // capture which request this menu belongs to, for the quick-action dialogs
  m._ctx = (function(){
    const tr = caret.closest('tr'); if(!tr) return {};
    const name = tr.querySelector('.ccell span:nth-child(2)');
    const task = tr.querySelector('.task');
    return { tr, contractor: name ? name.textContent : '', task: task ? task.textContent : '' };
  })();
  m.classList.remove('flip');
  m.style.visibility = 'hidden'; m.classList.add('open');
  const r = caret.getBoundingClientRect();
  let left = r.right - m.offsetWidth; if(left < 8) left = 8;
  let top = r.bottom + 10;
  if(top + m.offsetHeight > window.innerHeight - 8){ top = Math.max(8, r.top - m.offsetHeight - 10); m.classList.add('flip'); }
  m.style.left = left + 'px'; m.style.top = top + 'px'; m.style.visibility = 'visible';
}
// Row-level quick actions — visible buttons on the dashboard (16 Jul call)
function qaRow(el, kind){
  const tr = el.closest('tr');
  const name = tr ? tr.querySelector('.ccell span:nth-child(2)') : null;
  const task = tr ? tr.querySelector('.task') : null;
  qaOpen(kind, { tr, contractor: name ? name.textContent : '', task: task ? task.textContent : '' });
}
// Quick-action dialogs — each action collects its required details before sending.
let qaCtx = {};
const QA_KINDS = {
  respond: { icon:'schedule',   bg:'var(--teal-tint)', color:'var(--teal)', title:'Will respond within…', confirm:'Send response time' },
  busy:    { icon:'event_busy', bg:'#FCEBEB',          color:'#A32D2D',     title:'Too busy for this job',    confirm:'Decline request' },
  info:    { icon:'help',       bg:'#FAEEDA',          color:'#B7791F',     title:'Need more information',    confirm:'Send message' }
};
function qaEnsure(){
  if(document.getElementById('qaOv')) return;
  const ov = document.createElement('div');
  ov.id = 'qaOv'; ov.className = 'qa-ov';
  ov.addEventListener('click', e => { if(e.target === ov) qaClose(); });
  ov.innerHTML = '<div class="qa" id="qaBox"></div>';
  document.body.appendChild(ov);
}
function qaOpen(kind, ctx){
  qaEnsure();
  const m = document.getElementById('qmenu');
  qaCtx = ctx || (m && m._ctx) || {};
  qaCtx.kind = kind;
  if(typeof closeQuoteMenu === 'function') closeQuoteMenu();
  const c = QA_KINDS[kind];
  const sub = [qaCtx.contractor, qaCtx.task].filter(Boolean).join(' · ') || 'This quote request';
  let body = '';
  if(kind === 'respond'){
    body = ['Within 24 hours','Within 2 days','Within 3 days','Within a week','Pick a date…'].map((t,i) =>
        `<div class="qa-opt${i===0?' on':''}" data-v="${t}" onclick="qaPick(this)"><span class="rdo"></span>${t}</div>`).join('')
      + '<input type="date" class="qa-note qa-date" id="qaDate">'
      + '<textarea class="qa-note" id="qaNote" rows="2" placeholder="Add a note for the contractor (optional)…"></textarea>'
      + '<div class="qa-hint">The contractor sees your response time on the request and the status changes to “Will respond”.</div>';
  } else if(kind === 'busy'){
    body = '<div class="qa-hint" style="margin:0 0 10px;font-size:12.5px;color:var(--gray)">This declines the request — the contractor is notified you don’t have capacity right now. The job stays in your Declined list.</div>'
      + '<textarea class="qa-note" id="qaNote" rows="2" placeholder="Add a short message (optional)…"></textarea>'
      + '<label class="qa-chk"><input type="checkbox" id="qaFuture" checked> Keep sending me requests like this</label>';
  } else {
    body = '<textarea class="qa-note" id="qaNote" rows="3" placeholder="What do you need to know? e.g. latest drawings revision, site access hours, scope boundaries…"></textarea>'
      + '<div class="qa-hint">Sent as a chat message on this request — the contractor gets a notification.</div>';
  }
  document.getElementById('qaBox').innerHTML =
      `<div class="qa-head"><span class="qico2" style="background:${c.bg};color:${c.color}"><span class="ms" style="font-size:19px">${c.icon}</span></span><div><h3>${c.title}</h3><div class="s">${sub}</div></div><span class="ms x" onclick="qaClose()">close</span></div>`
    + `<div class="qa-body">${body}</div>`
    + `<div class="qa-foot"><a class="btn btn-outline" onclick="qaClose()">Cancel</a><a class="btn ${kind==='busy'?'':'btn-primary'}"${kind==='busy'?' style="background:var(--accent);color:#fff"':''} onclick="qaConfirm()">${c.confirm}</a></div>`;
  document.getElementById('qaOv').classList.add('open');
  const note = document.getElementById('qaNote'); if(kind==='info' && note) note.focus();
}
function qaPick(el){
  el.parentNode.querySelectorAll('.qa-opt').forEach(o => o.classList.remove('on'));
  el.classList.add('on');
  const d = document.getElementById('qaDate');
  if(d) d.classList.toggle('show', el.dataset.v === 'Pick a date…');
}
function qaClose(){ const ov = document.getElementById('qaOv'); if(ov) ov.classList.remove('open'); }
function qaUpdateRow(label, cls, status){
  const tr = qaCtx.tr; if(!tr) return;
  const b = tr.querySelector('.badge'); if(b){ b.className = 'badge ' + cls; b.textContent = label; }
  tr.setAttribute('data-status', status);
  if(typeof refreshCounts === 'function') refreshCounts();
  if(typeof applyFilter === 'function'){ const act = document.querySelector('.tab.active'); if(act) applyFilter(act.getAttribute('data-tab')); }
}
function qaConfirm(){
  const k = qaCtx.kind, who = qaCtx.contractor || 'the contractor';
  if(k === 'respond'){
    const sel = document.querySelector('#qaBox .qa-opt.on');
    let when = sel ? sel.dataset.v : 'Within 24 hours';
    if(when === 'Pick a date…'){
      const d = document.getElementById('qaDate').value;
      if(!d){ showToast('Pick a date for your response'); return; }
      when = 'by ' + d;
    }
    qaUpdateRow('Will respond', 'b-willrespond', 'willrespond');
    showToast('Response time sent to ' + who + ' — ' + when.toLowerCase());
  } else if(k === 'busy'){
    qaUpdateRow('Declined', 'b-declined', 'declined');
    showToast('Request declined — ' + who + ' has been notified');
  } else {
    const t = document.getElementById('qaNote').value.trim();
    if(!t){ showToast('Tell the contractor what you need first'); return; }
    showToast('Message sent to ' + who + ' — they’ve been notified');
  }
  qaClose();
}
// Capture phase so the action cell's stopPropagation doesn't block the caret click.
document.addEventListener('click', (e)=>{
  const caret = e.target.closest ? e.target.closest('.split .caret') : null;
  if(caret){ openQuoteMenu(caret); return; }
  const m = document.getElementById('qmenu');
  if(m && m.classList.contains('open') && !m.contains(e.target)) closeQuoteMenu();
}, true);
window.addEventListener('scroll', closeQuoteMenu, true);
window.addEventListener('resize', closeQuoteMenu);

document.addEventListener('DOMContentLoaded', ()=>{
  mountPage();
  mountStateToggle();
  mountQuoteMenu();
  mountDocModal();
  initDocChecks();
  if(document.querySelector('[data-amt]')) recalc();
});

// Scrollbars are hidden everywhere and stay hidden — they do NOT appear on hover
// or while scrolling. They show ONLY on explicit request: set this flag to true
// (or call toggleScrollbars() at runtime) to reveal them.
const SHOW_SCROLLBARS = false;
if(SHOW_SCROLLBARS) document.documentElement.classList.add('show-scrollbars');
window.toggleScrollbars = (on)=>document.documentElement.classList.toggle('show-scrollbars', on);
