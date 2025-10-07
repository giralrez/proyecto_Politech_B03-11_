// /js/servicios.js
async function fetchServices() {
  const res = await fetch('/politech/api/services.php'); // ajusta path si es diferente
  const data = await res.json();
  const container = document.getElementById('servicios-container');
  container.innerHTML = '';
  data.forEach(s => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100">
        ${s.imagen ? `<img src="${s.imagen.startsWith('http') ? s.imagen : '/' + s.imagen}" class="card-img-top" alt="${s.nombre}">` : ''}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${s.nombre}</h5>
          <p class="card-text">${s.descripcion ? s.descripcion.substring(0,100) + '...' : ''}</p>
          <p class="fw-bold mt-auto">$${s.precio}</p>
          <a class="btn btn-primary mt-2" href="/politech/service.php?id=${s.id}">Ver detalle</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

document.addEventListener('DOMContentLoaded', fetchServices);
