<?php
// /admin/dashboard.php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
  header('Location: login.html');
  exit;
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Admin Dashboard - Politech</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Dashboard — <?= htmlspecialchars($_SESSION['user_name']) ?></span>
    <button id="btnLogout" class="btn btn-outline-light btn-sm">Cerrar sesión</button>
  </div>
</nav>

<div class="container my-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Gestión de Servicios</h3>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalService" id="btnNew">+ Nuevo servicio</button>
  </div>

  <table class="table table-striped" id="servicesTable">
    <thead>
      <tr><th>ID</th><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Promoción</th><th>Acciones</th></tr>
    </thead>
    <tbody></tbody>
  </table>
</div>

<!-- Modal (create/update) -->
<div class="modal fade" id="modalService" tabindex="-1">
  <div class="modal-dialog">
    <form id="serviceForm" class="modal-content" enctype="multipart/form-data">
      <div class="modal-header">
        <h5 class="modal-title">Servicio</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="id" id="srv_id">
        <div class="mb-3">
          <label>Nombre</label>
          <input class="form-control" name="nombre" id="srv_nombre" required>
        </div>
        <div class="mb-3">
          <label>Precio</label>
          <input class="form-control" name="precio" id="srv_precio" required>
        </div>
        <div class="mb-3">
          <label>Descripción</label>
          <textarea class="form-control" name="descripcion" id="srv_descripcion"></textarea>
        </div>
        <div class="mb-3">
          <label>Cantidad</label>
          <input class="form-control" type="number" name="cantidad" id="srv_cantidad">
        </div>
        <div class="mb-3">
          <label>Promoción</label>
          <input type="checkbox" name="promocion" id="srv_promocion">
        </div>
        <div class="mb-3">
          <label>Imagen</label>
          <input type="file" name="imagen" id="srv_imagen" accept="image/*">
          <div id="preview" class="mt-2"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Cancelar</button>
        <button class="btn btn-primary" type="submit">Guardar</button>
      </div>
    </form>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
// admin-dashboard.js (inline para conveniencia)
const servicesTableBody = document.querySelector('#servicesTable tbody');
const modal = new bootstrap.Modal(document.getElementById('modalService'));
const form = document.getElementById('serviceForm');
const btnNew = document.getElementById('btnNew');

async function loadServices() {
  const res = await fetch('../api/services.php');
  const data = await res.json();
  servicesTableBody.innerHTML = '';
  data.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.imagen ? `<img src="../${s.imagen}" style="height:50px">` : ''}</td>
      <td>${s.nombre}</td>
      <td>${s.precio}</td>
      <td>${s.cantidad}</td>
      <td>${s.promocion == 1 ? 'Sí' : 'No'}</td>
      <td>
        <button class="btn btn-sm btn-info btn-edit" data-id="${s.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-del" data-id="${s.id}">Eliminar</button>
      </td>
    `;
    servicesTableBody.appendChild(tr);
  });

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const r = await fetch(`../api/services.php?id=${id}`);
      const s = await r.json();
      document.getElementById('srv_id').value = s.id;
      document.getElementById('srv_nombre').value = s.nombre;
      document.getElementById('srv_precio').value = s.precio;
      document.getElementById('srv_descripcion').value = s.descripcion;
      document.getElementById('srv_cantidad').value = s.cantidad;
      document.getElementById('srv_promocion').checked = s.promocion == 1;
      document.getElementById('preview').innerHTML = s.imagen ? `<img src="../${s.imagen}" style="max-width:100%;">` : '';
      modal.show();
    };
  });

  document.querySelectorAll('.btn-del').forEach(btn => {
    btn.onclick = async () => {
      if (!confirm('Eliminar servicio?')) return;
      const id = btn.dataset.id;
      const form = new URLSearchParams();
      form.append('id', id);
      const r = await fetch('../api/services.php?action=delete', { method: 'POST', body: form });
      const j = await r.json();
      if (j.success) loadServices();
      else alert(j.message || 'Error');
    }
  });
}

btnNew.addEventListener('click', () => {
  form.reset();
  document.getElementById('srv_id').value = '';
  document.getElementById('preview').innerHTML = '';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const id = fd.get('id');
  let url = '../api/services.php?action=create';
  if (id) url = '../api/services.php?action=update';
  const res = await fetch(url, { method: 'POST', body: fd });
  const j = await res.json();
  if (j.success) {
    modal.hide();
    loadServices();
  } else {
    alert(j.message || 'Error');
  }
});

// logout
document.getElementById('btnLogout').addEventListener('click', async () => {
  await fetch('../api/auth.php?action=logout', { method: 'POST' });
  window.location.href = 'login.html';
});

loadServices();
</script>
</body>
</html>
