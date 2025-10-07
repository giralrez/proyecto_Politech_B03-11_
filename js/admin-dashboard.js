// ========================================
// DASHBOARD ADMIN - POLITECH
// ========================================

const API_BASE = 'api';
let servicioEditando = null;

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
    cargarEstadisticas();
    cargarServicios();
    
    // Event listeners
    document.getElementById('btnLogout').addEventListener('click', cerrarSesion);
    document.getElementById('btnGuardar').addEventListener('click', guardarServicio);
    
    // Navegación entre secciones
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            if (section) {
                cambiarSeccion(section);
                
                // Actualizar activo
                document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
});

// ========================================
// VERIFICAR SESIÓN
// ========================================
async function verificarSesion() {
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=check`);
        const data = await response.json();
        
        if (!data.success) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error verificando sesión:', error);
        window.location.href = 'login.html';
    }
}

// ========================================
// CERRAR SESIÓN
// ========================================
async function cerrarSesion() {
    try {
        await fetch(`${API_BASE}/auth.php?action=logout`);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error cerrando sesión:', error);
    }
}

// ========================================
// CAMBIAR SECCIÓN
// ========================================
function cambiarSeccion(section) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('d-none'));
    document.getElementById(`section-${section}`).classList.remove('d-none');
    
    if (section === 'servicios') {
        cargarServicios();
    }
}

// ========================================
// CARGAR ESTADÍSTICAS
// ========================================
async function cargarEstadisticas() {
    try {
        const response = await fetch(`${API_BASE}/servicios.php`);
        const data = await response.json();
        
        if (data.success) {
            const servicios = data.data;
            const activos = servicios.filter(s => s.activo).length;
            const promocion = servicios.filter(s => s.en_promocion).length;
            
            document.getElementById('totalServicios').textContent = servicios.length;
            document.getElementById('serviciosActivos').textContent = activos;
            document.getElementById('serviciosPromocion').textContent = promocion;
        }
    } catch (error) {
        console.error('Error cargando estadísticas:', error);
    }
}

// ========================================
// CARGAR SERVICIOS
// ========================================
async function cargarServicios() {
    try {
        const response = await fetch(`${API_BASE}/servicios.php?limit=100`);
        const data = await response.json();
        
        const tbody = document.getElementById('tablaServicios');
        
        if (data.success && data.data.length > 0) {
            tbody.innerHTML = data.data.map(servicio => `
                <tr>
                    <td>${servicio.id}</td>
                    <td><img src="../assets/${servicio.imagen}" alt="${servicio.nombre}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;"></td>
                    <td><strong>${servicio.nombre}</strong></td>
                    <td>$${parseFloat(servicio.precio).toLocaleString('es-CO')}</td>
                    <td>${servicio.cantidad_disponible}</td>
                    <td>
                        ${servicio.en_promocion 
                            ? '<span class="badge bg-success">Sí</span>' 
                            : '<span class="badge bg-secondary">No</span>'}
                    </td>
                    <td>
                        ${servicio.activo 
                            ? '<span class="badge bg-success">Activo</span>' 
                            : '<span class="badge bg-danger">Inactivo</span>'}
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="editarServicio(${servicio.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${servicio.id}, '${servicio.nombre}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No hay servicios registrados</td></tr>';
        }
    } catch (error) {
        console.error('Error cargando servicios:', error);
        document.getElementById('tablaServicios').innerHTML = '<tr><td colspan="8" class="text-center text-danger">Error al cargar servicios</td></tr>';
    }
}

// ========================================
// GUARDAR SERVICIO (CREAR/EDITAR)
// ========================================
async function guardarServicio() {
    const id = document.getElementById('servicioId').value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        descripcion_corta: document.getElementById('descripcion_corta').value,
        precio: parseFloat(document.getElementById('precio').value),
        imagen: document.getElementById('imagen').value || 'default.png',
        cantidad_disponible: parseInt(document.getElementById('cantidad_disponible').value),
        en_promocion: document.getElementById('en_promocion').checked,
        descuento_porcentaje: parseFloat(document.getElementById('descuento_porcentaje').value),
        disponibilidad: document.getElementById('disponibilidad').value
    };
    
    // Validación básica
    if (!datos.nombre || !datos.precio || !datos.descripcion) {
        alert('Por favor completa los campos obligatorios');
        return;
    }
    
    const btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';
    
    try {
        let response;
        
        if (id) {
            // EDITAR
            datos.id = parseInt(id);
            response = await fetch(`${API_BASE}/servicios.php`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        } else {
            // CREAR
            response = await fetch(`${API_BASE}/servicios.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            bootstrap.Modal.getInstance(document.getElementById('modalServicio')).hide();
            limpiarFormulario();
            cargarServicios();
            cargarEstadisticas();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error guardando servicio:', error);
        alert('Error al guardar el servicio');
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar';
    }
}

// ========================================
// EDITAR SERVICIO
// ========================================
async function editarServicio(id) {
    try {
        const response = await fetch(`${API_BASE}/servicios.php?id=${id}`);
        const data = await response.json();
        
        if (data.success) {
            const servicio = data.data;
            
            // Llenar formulario
            document.getElementById('servicioId').value = servicio.id;
            document.getElementById('nombre').value = servicio.nombre;
            document.getElementById('descripcion').value = servicio.descripcion;
            document.getElementById('descripcion_corta').value = servicio.descripcion_corta || '';
            document.getElementById('precio').value = servicio.precio;
            document.getElementById('imagen').value = servicio.imagen;
            document.getElementById('cantidad_disponible').value = servicio.cantidad_disponible;
            document.getElementById('disponibilidad').value = servicio.disponibilidad;
            document.getElementById('en_promocion').checked = servicio.en_promocion == 1;
            document.getElementById('descuento_porcentaje').value = servicio.descuento_porcentaje;
            
            // Cambiar título del modal
            document.getElementById('modalTitle').textContent = 'Editar Servicio';
            
            // Abrir modal
            new bootstrap.Modal(document.getElementById('modalServicio')).show();
        }
    } catch (error) {
        console.error('Error cargando servicio:', error);
        alert('Error al cargar el servicio');
    }
}

// ========================================
// ELIMINAR SERVICIO
// ========================================
async function eliminarServicio(id, nombre) {
    if (!confirm(`¿Estás seguro de eliminar el servicio "${nombre}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/servicios.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            cargarServicios();
            cargarEstadisticas();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error eliminando servicio:', error);
        alert('Error al eliminar el servicio');
    }
}

// ========================================
// LIMPIAR FORMULARIO
// ========================================
function limpiarFormulario() {
    document.getElementById('formServicio').reset();
    document.getElementById('servicioId').value = '';
    document.getElementById('modalTitle').textContent = 'Nuevo Servicio';
}

// Limpiar formulario al cerrar modal
document.getElementById('modalServicio')?.addEventListener('hidden.bs.modal', limpiarFormulario);