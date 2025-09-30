// main.js - utilidades
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3').forEach(e => { e && (e.textContent = y); });
});
