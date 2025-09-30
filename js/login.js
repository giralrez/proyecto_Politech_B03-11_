const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

// Crear el admin una sola vez si no existe
if (!localStorage.getItem("admin")) {
  localStorage.setItem("admin", JSON.stringify({
    email: "admin@politech.com",
    password: "admin123"
  }));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const admin = JSON.parse(localStorage.getItem("admin"));

  if (admin && email === admin.email && password === admin.password) {
    localStorage.setItem("isAdmin", "true"); // 🔑 sesión activa
    window.location.href = "/admin/dashboard.html";
  } else {
    mensaje.textContent = "❌ Credenciales inválidas";
    mensaje.classList.remove("d-none");
  }
});
