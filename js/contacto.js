// contacto.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formContacto");

  // Al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores
    const nombre = document.querySelector("#nombre").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();

    if (!nombre || !correo || !telefono || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear objeto
    const nuevoContacto = {
      id: Date.now(),
      nombre,
      correo,
      telefono,
      mensaje,
    };

    // Recuperar contactos previos o inicializar array vacío
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Agregar nuevo
    contactos.push(nuevoContacto);

    // Guardar en localStorage
    localStorage.setItem("contactos", JSON.stringify(contactos));

    // Limpiar formulario
    form.reset();

    // Confirmación
    alert("✅ Tu mensaje ha sido registrado. Nos pondremos en contacto pronto.");
  });
});
