// Client stand-in for the admin's shell.js: same hooks (confirmAction, buildShell → pageInit,
// Escape closes dialogs), contractor chrome instead of the super-admin one. showToast comes from ../app.js.
window.confirmAction = function(opts, onConfirm, onCancel){
  const o = Object.assign({title:'Are you sure?', body:'', confirm:'Confirm', cancel:'Cancel', danger:false}, opts);
  let m = document.getElementById('confirmModal');
  if(!m){ m = document.createElement('div'); m.id='confirmModal'; m.className='modal-overlay'; document.body.appendChild(m); }
  m.innerHTML = `<div class="cfm">
    <div class="cfm-ic ${o.danger?'danger':''}"><span class="ms">${o.danger?'delete':'help'}</span></div>
    <h3>${o.title}</h3><p>${o.body}</p>
    <div class="cfm-acts"><a class="btn btn-outline" data-cfm-cancel>${o.cancel}</a><a class="btn ${o.danger?'btn-danger':'btn-primary'}" data-cfm-ok>${o.confirm}</a></div></div>`;
  m.classList.add('open');
  m.querySelector('[data-cfm-cancel]').onclick = ()=>{ m.classList.remove('open'); if(onCancel) onCancel(); };
  m.onclick = (e)=>{ if(e.target===m) m.classList.remove('open'); };
  m.querySelector('[data-cfm-ok]').onclick = ()=>{ m.classList.remove('open'); if(onConfirm) onConfirm(); };
};
function buildShell(){
  const title = document.body.dataset.title || '', src = document.getElementById('app-content');
  const capp = document.createElement('div'); capp.className = 'capp';
  capp.innerHTML = `
  <aside class="c-side">
    <div class="clogo"><img src="../logo-symbol.svg" alt="Tenderfy"></div>
    <a class="cic" data-toast="Contractor dashboard" title="Dashboard"><span class="ms fill">desktop_mac</span></a>
    <a class="cic" href="projects.html" title="Tenders"><span class="ms fill">domain</span></a>
    <a class="cic" data-toast="Messages" title="Messages"><span class="ms fill">chat</span></a>
    <a class="cic active" href="blocks.html" title="Block Library"><span class="ms fill">insert_drive_file</span></a>
    <a class="cic" data-toast="Contacts" title="Contacts"><span class="ms fill">contacts</span></a>
    <a class="cic" data-toast="Manage staff" title="Manage Staff"><span class="ms fill">manage_accounts</span></a>
    <a class="cic" href="subbies.html" title="Subcontractors"><span class="ms fill">groups</span></a>
  </aside>
  <div class="c-main">
    <div class="c-header">
      <div class="l"><span class="ms fill" style="font-size:20px">home</span> <span>${title}</span></div>
      <div class="r"><a class="ms fill" href="settings.html" title="Settings" style="color:#fff;text-decoration:none">settings</a><span class="cbell" data-toast="2 new messages from subcontractors"><span class="ms fill">chat</span><span class="cdot">02</span></span><span class="ms fill" data-toast="Notifications">notifications</span><span class="grp"><span>${typeof USER!=='undefined'?USER:'Andrew Williams'}</span><span class="cava">${typeof USER!=='undefined'?USER.split(' ').map(s=>s[0]).join(''):'AW'}</span></span></div>
    </div>
    <div class="c-content"></div>
  </div>`;
  const host = capp.querySelector('.c-content');
  if(src){ while(src.firstChild) host.appendChild(src.firstChild); src.remove(); }
  document.body.insertBefore(capp, document.body.firstChild);
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open')); });
document.addEventListener('DOMContentLoaded', ()=>{ buildShell(); if(typeof pageInit==='function') pageInit(); });
