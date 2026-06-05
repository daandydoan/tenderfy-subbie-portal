/* ===== Tenderfy Subbie Portal — shared JS ===== */

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
        <span class="ms logo-mark">attach_file</span>
        <span class="logo-word">tend<span class="ms clip">attach_file</span>rfy</span>
      </a>
      ${ics}
      <div class="grow"></div>
      <a class="logout" href="index.html" title="Logout"><span class="ms">logout</span><span class="label">Logout</span></a>
    </aside>
    <div class="main">
      <div class="header">
        <div class="l"><span class="ms" style="font-size:18px">home</span> <span class="crumb">${cfg.crumb||'Dashboard'}</span></div>
        <div class="r"><span class="ms" style="font-size:18px">notifications</span> <span>Andrew Williams</span></div>
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
function openModal(){ const m=document.getElementById('modal'); if(m) m.classList.add('open'); }
function closeModal(){ const m=document.getElementById('modal'); if(m) m.classList.remove('open'); }

// State toggle: builds the floating control. Page provides window.STATES = {filled:'page.html', empty:'page-empty.html', error:null}
function mountStateToggle(){
  const st = window.STATES; if(!st) return;
  const cur = window.CURRENT_STATE || 'filled';
  const opt = (k)=>{
    const href = st[k];
    if(!href) return `<a class="disabled">${k[0].toUpperCase()+k.slice(1)}</a>`;
    return `<a class="${cur===k?'on':''}" href="${href}">${k[0].toUpperCase()+k.slice(1)}</a>`;
  };
  const el = document.createElement('div');
  el.className='state-toggle';
  el.innerHTML = `<span class="title">Screen state</span><div class="opts">${opt('filled')}${opt('empty')}${opt('error')}</div>`;
  document.body.appendChild(el);
}

document.addEventListener('DOMContentLoaded', ()=>{
  mountPage();
  mountStateToggle();
});

// Scrollbars are hidden everywhere and stay hidden — they do NOT appear on hover
// or while scrolling. They show ONLY on explicit request: set this flag to true
// (or call toggleScrollbars() at runtime) to reveal them.
const SHOW_SCROLLBARS = false;
if(SHOW_SCROLLBARS) document.documentElement.classList.add('show-scrollbars');
window.toggleScrollbars = (on)=>document.documentElement.classList.toggle('show-scrollbars', on);
