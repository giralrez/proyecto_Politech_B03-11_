// ========================================
// LOGIN ADMINISTRADOR - POLITECH
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si ya hay sesión activa
    verificarSesionActiva();

    const form = document.querySelector('form');
    form.addEventListener('submit', handleLogin);

    // Mostrar credenciales de prueba
    mostrarCredencialesDemo();
});

// ========================================
// VERIFICAR SI YA HAY SESIÓN
// ========================================
async function verificarSesionActiva() {
    try {
        const response = await fetch('../api/auth.php?action=check', {
            credentials: 'same-origin'
        });
        const data = await response.json();

        if (data.success && data.data.rol === 'admin') {
            // Ya hay sesión activa, redirigir al dashboard
            window.location.href = 'dashboard.php';
        }
    } catch (error) {
        console.log('No hay sesión activa');
    }
}

// ========================================
// MANEJAR LOGIN
// ========================================
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Validación básica
    if (!email || !password) {
        mostrarMensaje('Por favor completa todos los campos', 'danger');
        return;
    }

    // Deshabilitar botón mientras procesa
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Validando...';

    try {
        const response = await fetch('../api/auth.php?action=login', {
            method: 'POST',
            credentials: 'same-origin', // <---- necesario para guardar cookie de sesión
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Verificar que sea administrador
            if (data.data.rol !== 'admin') {
                mostrarMensaje('Esta área es solo para administradores', 'danger');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Ingresar';
                return;
            }

            mostrarMensaje('¡Login exitoso! Redirigiendo...', 'success');

            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'dashboard.php';
            }, 1000);

        } else {
            mostrarMensaje(data.message || 'Credenciales incorrectas', 'danger');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Ingresar';
        }

    } catch (error) {
        console.error('Error en login:', error);
        mostrarMensaje('Error de conexión. Verifica que el servidor esté funcionando.', 'danger');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Ingresar';
    }
}

// ========================================
// MOSTRAR MENSAJES
// ========================================
function mostrarMensaje(mensaje, tipo) {
    let alertDiv = document.querySelector('.alert-mensaje');

    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-mensaje mt-3 mb-0';

        const form = document.querySelector('form');
        const lastInput = form.querySelector('.mb-3:last-of-type');
        lastInput.insertAdjacentElement('afterend', alertDiv);
    }

    alertDiv.className = `alert alert-mensaje alert-${tipo} mt-3 mb-0`;
    alertDiv.textContent = mensaje;

    if (tipo === 'success') {
        setTimeout(() => alertDiv.remove(), 5000);
    }
}

// ========================================
// CREDENCIALES DE PRUEBA (solo en entorno local)
// ========================================
function mostrarCredencialesDemo() {
    const form = document.querySelector('form');
    const infoDiv = document.createElement('div');
    infoDiv.className = 'alert alert-info mt-3 small';
    infoDiv.innerHTML = `
        <strong>Credenciales de prueba:</strong><br>
        Email: <code>admin@politech.com</code><br>
        Password: <code>admin123</code>
    `;
    form.appendChild(infoDiv);
}
