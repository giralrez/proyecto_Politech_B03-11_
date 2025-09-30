const form = document.getElementById('registerForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Capturar datos del formulario
  const userData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    telefono: document.getElementById('telefono').value,
    rol: document.getElementById('rol') ? document.getElementById('rol').value : "user" 
    // si hay select de rol, lo toma, si no, lo deja como "user"
  };

  // Obtener usuarios existentes o array vacío
  let users = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Guardar nuevo usuario
  users.push(userData);
  localStorage.setItem('usuarios', JSON.stringify(users));

  // Mostrar mensaje de éxito
  mensaje.textContent = `✅ Usuario ${userData.rol} registrado correctamente (simulación)`;
  mensaje.classList.remove("d-none");

  // Limpiar formulario
  form.reset();
});

