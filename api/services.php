<?php
// /api/services.php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexion.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Helper
function require_admin() {
  if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success'=>false,'message'=>'Acceso denegado']);
    exit;
  }
}

// GET single or list
if ($method === 'GET') {
  if (isset($_GET['id'])) {
    $stmt = $pdo->prepare('SELECT * FROM servicios WHERE id = ?');
    $stmt->execute([$_GET['id']]);
    $srv = $stmt->fetch();
    echo json_encode($srv ?: (object)[]);
  } else {
    $stmt = $pdo->query('SELECT * FROM servicios ORDER BY id DESC');
    $services = $stmt->fetchAll();
    echo json_encode($services);
  }
  exit;
}

// POST actions (create/update/delete)
if ($method === 'POST') {
  if ($action === 'create') {
    require_admin();
    $nombre = $_POST['nombre'] ?? '';
    $precio = $_POST['precio'] ?? 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $cantidad = $_POST['cantidad'] ?? 0;
    $promocion = isset($_POST['promocion']) ? 1 : 0;

    $imagenPath = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
      $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
      $filename = uniqid('svc_', true) . '.' . $ext;
      $destDir = __DIR__ . '/../uploads/services/';
      if (!is_dir($destDir)) mkdir($destDir, 0755, true);
      $dest = $destDir . $filename;
      if (move_uploaded_file($_FILES['imagen']['tmp_name'], $dest)) {
        $imagenPath = 'uploads/services/' . $filename;
      }
    }

    $stmt = $pdo->prepare('INSERT INTO servicios (nombre, precio, imagen, descripcion, cantidad, promocion) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$nombre, $precio, $imagenPath, $descripcion, $cantidad, $promocion]);
    echo json_encode(['success'=>true,'id'=>$pdo->lastInsertId()]);
    exit;
  }

  if ($action === 'update') {
    require_admin();
    $id = $_POST['id'] ?? null;
    if (!$id) { echo json_encode(['success'=>false,'message'=>'id faltante']); exit; }

    // Obtener existente
    $stmt = $pdo->prepare('SELECT imagen FROM servicios WHERE id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch();

    $nombre = $_POST['nombre'] ?? '';
    $precio = $_POST['precio'] ?? 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $cantidad = $_POST['cantidad'] ?? 0;
    $promocion = isset($_POST['promocion']) ? 1 : 0;
    $imagenPath = $existing['imagen'];

    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
      // eliminar imagen anterior si existe
      if ($imagenPath) {
        $old = __DIR__ . '/../' . $imagenPath;
        if (file_exists($old)) unlink($old);
      }
      $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
      $filename = uniqid('svc_', true) . '.' . $ext;
      $destDir = __DIR__ . '/../uploads/services/';
      if (!is_dir($destDir)) mkdir($destDir, 0755, true);
      $dest = $destDir . $filename;
      if (move_uploaded_file($_FILES['imagen']['tmp_name'], $dest)) {
        $imagenPath = 'uploads/services/' . $filename;
      }
    }

    $stmt = $pdo->prepare('UPDATE servicios SET nombre=?, precio=?, imagen=?, descripcion=?, cantidad=?, promocion=? WHERE id=?');
    $stmt->execute([$nombre, $precio, $imagenPath, $descripcion, $cantidad, $promocion, $id]);
    echo json_encode(['success'=>true]);
    exit;
  }

  if ($action === 'delete') {
    require_admin();
    $id = $_POST['id'] ?? null;
    if (!$id) { echo json_encode(['success'=>false,'message'=>'id faltante']); exit; }

    $stmt = $pdo->prepare('SELECT imagen FROM servicios WHERE id=?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if ($row && $row['imagen']) {
      $path = __DIR__ . '/../' . $row['imagen'];
      if (file_exists($path)) unlink($path);
    }
    $stmt = $pdo->prepare('DELETE FROM servicios WHERE id=?');
    $stmt->execute([$id]);
    echo json_encode(['success'=>true]);
    exit;
  }
}

http_response_code(405);
echo json_encode(['success'=>false,'message'=>'Método no permitido']);
