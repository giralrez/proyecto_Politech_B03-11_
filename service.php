<?php
// service.php
// Muestra el detalle de un servicio por ?id=
// Colocar en la raíz del proyecto (junto a index.html, servicios.html, /api/ )

require __DIR__ . '/api/conexion.php'; // ajusta si tu conexion.php está en otra ruta

// Obtener id
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    // id inválido -> redirigir o mostrar mensaje
    header('Location: servicios.html');
    exit;
}

// Consultar servicio
$stmt = $pdo->prepare('SELECT * FROM servicios WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$s = $stmt->fetch();

if (!$s) {
    // no existe el servicio
    http_response_code(404);
    echo "<!doctype html><html><head><meta charset='utf-8'><title>Servicio no encontrado</title></head><body><h2>Servicio no encontrado</h2><p><a href='servicios.html'>Volver a servicios</a></p></body></html>";
    exit;
}

// Construir URL relativa a la imagen (funciona si el proyecto está en /politech/ o en root)
$scriptDir = rtrim(str_replace('\\','/', dirname($_SERVER['SCRIPT_NAME'])), '/');
if ($scriptDir === '/' || $scriptDir === '.') $scriptDir = '';
$imageUrl = null;
if (!empty($s['imagen'])) {
    $imagePath = ltrim($s['imagen'], '/');
    $imageUrl = ($scriptDir !== '') ? $scriptDir . '/' . $imagePath : $imagePath;
}

?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><?= htmlspecialchars($s['nombre']) ?> — Politech</title>
  <meta name="description" content="<?= htmlspecialchars(substr($s['descripcion'],0,160)) ?>">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!-- Navbar: reutiliza tu navbar si lo deseas -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">Politech</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="servicios.html">Servicios</a></li>
          <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="container my-5">
    <div class="row g-4">
      <div class="col-md-6">
        <?php if ($imageUrl): ?>
          <img src="<?= htmlspecialchars($imageUrl) ?>" class="img-fluid rounded" alt="<?= htmlspecialchars($s['nombre']) ?>">
        <?php else: ?>
          <div class="border rounded d-flex align-items-center justify-content-center" style="height:350px;background:#f8f9fa;">
            <span class="text-muted">Sin imagen disponible</span>
          </div>
        <?php endif; ?>
      </div>

      <div class="col-md-6">
        <h1 class="mb-2"><?= htmlspecialchars($s['nombre']) ?></h1>

        <div class="mb-3">
          <span class="fs-4 text-primary">$<?= number_format($s['precio'], 0, ',', '.') ?></span>
          <?php if ($s['promocion']): ?>
            <span class="badge bg-success ms-2">En promoción</span>
          <?php endif; ?>
        </div>

        <p>
          <strong>Disponibilidad:</strong>
          <?= intval($s['cantidad']) > 0 ? '<span class="text-success">Disponible (' . intval($s['cantidad']) . ')</span>' : '<span class="text-secondary">Agotado</span>' ?>
        </p>

        <hr>

        <div>
          <?= nl2br(htmlspecialchars($s['descripcion'])) ?>
        </div>

        <div class="mt-4">
          <a href="servicios.html" class="btn btn-outline-secondary">Volver a servicios</a>
        </div>
      </div>
    </div>
  </main>

  <footer class="bg-light py-4 mt-5">
    <div class="container text-center">
      © <?= date('Y') ?> Politech
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
