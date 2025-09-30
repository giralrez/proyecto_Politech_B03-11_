// admin.js
const ADMIN_USER = {email:'admin@politech.com', password:'admin123'}; // demo only
const DATA_KEY = 'politech_services_v1';

document.addEventListener('DOMContentLoaded', () => {
  // login page
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const pw = document.getElementById('password').value.trim();
      const msg = document.getElementById('loginMsg');
      if(email === ADMIN_USER.email && pw === ADMIN_USER.password){
        localStorage.setItem('politech_admin', 'true');
        location.href = 'dashboard.html';
      } else {
        if(msg) msg.textContent = 'Credenciales inválidas';
      }
    });
  }

  // dashboard page
  const servicesTableBody = document.querySelector('#servicesTable tbody');
  if(servicesTableBody){
    renderAdminTable();
    document.getElementById('btnAddService').addEventListener('click', openCreateModal);
    document.getElementById('saveService').addEventListener('click', saveServiceFromModal);
  }
});

function getServices(){
  const raw = localStorage.getItem(DATA_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveServices(list){
  localStorage.setItem(DATA_KEY, JSON.stringify(list));
}

function renderAdminTable(){
  const tbody = document.querySelector('#servicesTable tbody');
  const list = getServices();
  tbody.innerHTML = list.map(s => `
    <tr>
      <td><img src="${s.image}" alt="" /></td>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${formatPrice(s.price)}</td>
      <td>${s.quantity}</td>
      <td>${s.on_promotion ? 'Sí' : 'No'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editService('${s.id}')">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteService('${s.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

function openCreateModal(){
  clearModal();
  document.getElementById('modalTitle').textContent = 'Crear servicio';
  const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
  modal.show();
}

function clearModal(){
  ['serviceId','serviceName','servicePrice','serviceQty','servicePromo','serviceImg','serviceDesc'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  document.getElementById('servicePromo').value = 'false';
}

function saveServiceFromModal(){
  const id = document.getElementById('serviceId').value || String(Date.now());
  const name = document.getElementById('serviceName').value.trim();
  const price = Number(document.getElementById('servicePrice').value) || 0;
  const qty = Number(document.getElementById('serviceQty').value) || 0;
  const promo = document.getElementById('servicePromo').value === 'true';
  const image = document.getElementById('serviceImg').value || 'assets/img/placeholder.png';
  const desc = document.getElementById('serviceDesc').value || '';

  const list = getServices();
  const idx = list.findIndex(x => String(x.id) === String(id));
  const item = {id, name, price, quantity:qty, on_promotion:promo, image, description:desc};
  if(idx >= 0) {
    list[idx] = item;
  } else {
    list.unshift(item);
  }
  saveServices(list);
  bootstrap.Modal.getInstance(document.getElementById('serviceModal')).hide();
  renderAdminTable();
  // also refresh public pages in case open
  if(window.opener) window.opener.location.reload();
}

function editService(id){
  const list = getServices();
  const s = list.find(x => String(x.id) === String(id));
  if(!s) return;
  document.getElementById('serviceId').value = s.id;
  document.getElementById('serviceName').value = s.name;
  document.getElementById('servicePrice').value = s.price;
  document.getElementById('serviceQty').value = s.quantity;
  document.getElementById('servicePromo').value = s.on_promotion ? 'true' : 'false';
  document.getElementById('serviceImg').value = s.image;
  document.getElementById('serviceDesc').value = s.description;
  const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
  modal.show();
}

function deleteService(id){
  if(!confirm('Eliminar servicio?')) return;
  const list = getServices().filter(x => String(x.id) !== String(id));
  saveServices(list);
  renderAdminTable();
}

function formatPrice(v){
  if(typeof v === 'number') return v.toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});
  return v;
}
