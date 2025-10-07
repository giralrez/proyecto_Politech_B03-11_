<?php
session_start();// /api/auth.php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexion.php';

$action = $_GET['action'] ?? null;
$input = json_decode(file_get_contents('php://input'), true);

if ($action === 'login') {
  $email = trim($input['email'] ?? '');
  $password = $input['password'] ?? '';

  if (!$email || !$password) {
    echo json_encode(['success'=>false,'message'=>'Faltan credenciales']);
    exit;
  }

  $stmt = $pdo->prepare('SELECT id, nombre, email, password, rol FROM users WHERE email = ? LIMIT 1');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if ($user && password_verify($password, $user['password'])) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['nombre'];
    $_SESSION['user_role'] = $user['rol'];
    echo json_encode(['success'=>true]);
  } else {
    echo json_encode(['success'=>false,'message'=>'Email o contraseña incorrectos']);
  }
  exit;
}

if ($action === 'logout') {
  session_unset();
  session_destroy();
  echo json_encode(['success'=>true]);
  exit;
}

// Opcional: register (si deseas usar registrarse.html)
if ($action === 'register') {
  $nombre = trim($input['nombre'] ?? '');
  $email = trim($input['email'] ?? '');
  $password = $input['password'] ?? '';

  if (!$nombre || !$email || !$password) {
    echo json_encode(['success'=>false,'message'=>'Faltan datos']);
    exit;
  }

  // verifica existencia
  $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
  $stmt->execute([$email]);
  if ($stmt->fetch()) {
    echo json_encode(['success'=>false,'message'=>'Email ya registrado']);
    exit;
  }

  $hash = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $pdo->prepare('INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)');
  $stmt->execute([$nombre, $email, $hash]);
  echo json_encode(['success'=>true]);
  exit;
}

echo json_encode(['success'=>false,'message'=>'Acción inválida']);
