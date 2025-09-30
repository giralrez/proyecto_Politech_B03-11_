const form = document.getElementById('registerForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Capturar datos del formulario
  const userData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    telefono: document.getElementById('telefono').value
  };

  // Guardar en Local Storage
  localStorage.setItem('usuario', JSON.stringify(userData));

  // Mostrar mensaje de éxito
  mensaje.textContent = "✅ Usuario registrado correctamente (simulación)";
  mensaje.classList.remove("d-none");

  // Limpiar formulario
  form.reset();
});

