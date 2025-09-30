// Datos servicios 
const servicios = [
  { id: 1, titulo: "Consultoría en Transformación Digital", descripcion: "Acompañamiento estratégico para digitalizar procesos.", img: "assets/1.png" },
  { id: 2, titulo: "Soporte Técnico Remoto 24/7", descripcion: "Atención inmediata para resolver incidentes técnicos en cualquier momento.", img: "assets/2.png" },
  { id: 3, titulo: "Desarrollo de Aplicaciones Web", descripcion: "Aplicaciones a la medida para optimizar procesos internos y externos..", img: "assets/3.png" },
  { id: 4, titulo: "Implementación de Infraestructura en la Nube", descripcion: "Migración y configuración de servidores seguros en la nube.", img: "assets/4.png" },
  { id: 5, titulo: "Ciberseguridad Empresarial", descripcion: "Protección avanzada contra amenazas, firewalls y auditoría de seguridad.", img: "assets/5.png" },
  { id: 6, titulo: "Gestión de Redes y Comunicaciones ", descripcion: "Configuración y monitoreo de redes empresariales seguras y eficientes", img: "assets/6.png" },
  { id: 7, titulo: "Diseño y Desarrollo de Páginas Web Corporativas", descripcion: "Sitios web profesionales y responsivos para tu negocio.", img: "assets/7.png" },
  { id: 8, titulo: "Capacitación en Herramientas Digitales", descripcion: "Cursos personalizados en ofimática, colaboración en la nube y productividad.", img: "assets/8.png" },
  { id: 9, titulo: "Outsourcing de TI (Administración de sistemas)", descripcion: "Delegación de la gestión tecnológica a expertos de Politech.", img: "assets/9.png" },
  { id: 10, titulo: "Monitoreo y Respaldo de Datos", descripcion: "Sistemas automáticos de backup y recuperación ante desastres.", img: "assets/10.png" }
];

// Configuración de paginación
const itemsPerPage = 3;
let currentPage = 1;

function renderServicios(page) {
  const container = document.getElementById("servicios-container");
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedServicios = servicios.slice(start, end);

  paginatedServicios.forEach(s => {
    const card = `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${s.img}" class="card-img-top" alt="${s.titulo}">
          <div class="card-body">
            <h5 class="card-title">${s.titulo}</h5>
            <p class="card-text">${s.descripcion}</p>
            <div class="d-flex justify-content-between">
              <span class="badge bg-success">Disponible</span>
              <a href="detalle_servicio.html?id=${s.id}" class="btn btn-sm btn-primary">Contratar</a>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

function renderPagination() {
  const totalPages = Math.ceil(servicios.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Botón Previous
  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
    </li>
  `;

  // Números de página
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }

  // Botón Next
  pagination.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
    </li>
  `;
}

function changePage(page) {
  const totalPages = Math.ceil(servicios.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderServicios(currentPage);
  renderPagination();
}

// Inicializar
renderServicios(currentPage);
renderPagination();
