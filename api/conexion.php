<?php
// /api/conexion.php
$host = '127.0.0.1';
$db   = 'politech';
$user = 'admin@politech.com';        // ajusta si tu usuario es distinto
$pass = 'admin123';            // ajusta si tienes contraseña (XAMPP por defecto tiene '')
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'DB connection failed: '.$e->getMessage()]);
  exit;
}
