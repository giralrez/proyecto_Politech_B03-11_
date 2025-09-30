// Verificar sesión activa como admin
if (localStorage.getItem("isAdmin") !== "true") {
  alert("Acceso no autorizado. Inicia sesión como administrador.");
  window.location.href = "/admin/login.html";
}

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("isAdmin"); // borrar sesión
  window.location.href = "login.html";
});
