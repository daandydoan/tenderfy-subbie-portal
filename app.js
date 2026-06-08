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
        <img class="logo-mark" src="logo-symbol.svg" alt="Tenderfy" width="30" height="30">
        <img class="logo-word" src="logo-wordmark-white.svg" alt="Tenderfy" height="26">
      </a>
      ${ics}
      <div class="grow"></div>
      <a class="logout" href="index.html" title="Logout"><span class="ms">logout</span><span class="label">Logout</span></a>
    </aside>
    <div class="main">
      <div class="header">
        <div class="l"><span class="ms" style="font-size:18px">home</span> <span class="crumb">${cfg.crumb||'Dashboard'}</span></div>
        <div class="r"><span class="ms" style="font-size:18px">notifications</span> <span>${TF_USER_NAME[tfGetUser()]}</span></div>
      </div>
      <div class="content" id="content"></div>
    </div>`;
  const content = wrap.querySelector('#content');
  content.appendChild(screen);
  document.body.insertBefore(wrap, document.body.firstChild);
  screen.style.display='block';
}

// GST reverse-calc for prepare-quote page
function recalc(){
  let tot=0;
  document.querySelectorAll('[data-amt]').forEach(i=>{ tot+=Number(String(i.value).replace(/[^0-9.]/g,''))||0; });
  const sub=tot/1.1, gst=tot-sub, f=n=>'$'+n.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2});
  ['sub','r-sub'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=f(sub);});
  ['gst','r-gst'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=f(gst);});
  ['tot','r-tot'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=f(tot);});
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
  const el = document.createElement('div');
  el.className='state-toggle collapsed';
  el.innerHTML =
      `<div class="st-head"><span class="st-grip"><span class="ms">drag_indicator</span> States</span>`
    +   `<button class="st-collapse" title="Expand"><span class="ms">unfold_more</span></button></div>`
    + `<div class="st-body">`
    +   `<span class="title">Screen state</span><div class="opts">${opt('filled')}${opt('empty')}${opt('error')}</div>`
    +   `<span class="title">Global state</span><div class="opts opts-user">${ubtn('new','New User')}${ubtn('returning','Returning User')}</div>`
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
  let dragging=false, sx=0, sy=0, ox=0, oy=0;
  handle.addEventListener('pointerdown', (e)=>{
    if(e.target.closest('.st-collapse')) return;        // let the button click through
    dragging=true;
    const r=el.getBoundingClientRect();
    el.style.left=r.left+'px'; el.style.top=r.top+'px'; el.style.right='auto'; el.style.bottom='auto';
    sx=e.clientX; sy=e.clientY; ox=r.left; oy=r.top;
    el.classList.add('dragging');
    try{ handle.setPointerCapture(e.pointerId); }catch(_){}
    e.preventDefault();
  });
  handle.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    const r=el.getBoundingClientRect();
    let nl=ox+(e.clientX-sx), nt=oy+(e.clientY-sy);
    nl=Math.max(6, Math.min(nl, window.innerWidth  - r.width  - 6));
    nt=Math.max(6, Math.min(nt, window.innerHeight - r.height - 6));
    el.style.left=nl+'px'; el.style.top=nt+'px';
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
    <div class="qitem qhas-sub"><span class="ms qico">schedule</span><span class="qtxt"><span class="qt">Will respond within&hellip;</span><span class="qd">Let them know when to expect your quote</span></span><span class="ms qchev">chevron_right</span><div class="qflyout"><a class="qfopt" data-toast="Will respond within 24 hours">Within 24 hours</a><a class="qfopt" data-toast="Will respond within 2 days">Within 2 days</a><a class="qfopt" data-toast="Will respond within 3 days">Within 3 days</a><a class="qfopt" data-toast="Will respond within a week">Within a week</a><a class="qfopt" data-toast="Pick a response date">Pick a date&hellip;</a></div></div>
    <div class="qdiv"></div>
    <a class="qitem" data-toast="Decline — too busy for this job"><span class="ms qico">event_busy</span><span class="qtxt"><span class="qt">Too busy for this job</span><span class="qd">No capacity to take this on right now</span></span></a>
    <a class="qitem" data-toast="Decline — cannot price this scope"><span class="ms qico">money_off</span><span class="qtxt"><span class="qt">Cannot price this scope</span><span class="qd">Not enough detail to put a number on it</span></span></a>
    <a class="qitem" data-toast="Ask the contractor for more information"><span class="ms qico">help</span><span class="qtxt"><span class="qt">Need more information</span><span class="qd">Ask the contractor a question first</span></span></a>`;
  document.body.appendChild(m);
}
function closeQuoteMenu(){ const m=document.getElementById('qmenu'); if(m) m.classList.remove('open'); }
function openQuoteMenu(caret){
  const m = document.getElementById('qmenu'); if(!m) return;
  if(m.classList.contains('open') && m._caret === caret){ closeQuoteMenu(); return; }
  m._caret = caret;
  m.classList.remove('flip');
  m.style.visibility = 'hidden'; m.classList.add('open');
  const r = caret.getBoundingClientRect();
  let left = r.right - m.offsetWidth; if(left < 8) left = 8;
  let top = r.bottom + 10;
  if(top + m.offsetHeight > window.innerHeight - 8){ top = Math.max(8, r.top - m.offsetHeight - 10); m.classList.add('flip'); }
  m.style.left = left + 'px'; m.style.top = top + 'px'; m.style.visibility = 'visible';
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
});

// Scrollbars are hidden everywhere and stay hidden — they do NOT appear on hover
// or while scrolling. They show ONLY on explicit request: set this flag to true
// (or call toggleScrollbars() at runtime) to reveal them.
const SHOW_SCROLLBARS = false;
if(SHOW_SCROLLBARS) document.documentElement.classList.add('show-scrollbars');
window.toggleScrollbars = (on)=>document.documentElement.classList.toggle('show-scrollbars', on);
