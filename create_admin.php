<?php
// create_admin.php  -- ejecutar UNA sola vez
// Colócalo en la raíz del proyecto (junto a la carpeta /api/)

require __DIR__ . '/api/conexion.php'; // ajusta la ruta si tu conexion.php está en otra ubicación

// --- CONFIGURA ESTOS VALORES ANTES DE EJECUTAR ---
$email = 'admin@politech.com';
$nombre = 'Administrador Politech';
$password_plain = 'admin123'; // CAMBIA ESTA CONTRASEÑA A UNA MÁS SEGURA
// ----------------------------------------------------

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email inválido.\n";
    exit;
}

try {
    // Verificar si ya existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo "El usuario con email $email ya existe. No se creó nada.\n";
        exit;
    }

    // Crear hash de la contraseña
    $hash = password_hash($password_plain, PASSWORD_DEFAULT);

    // Insertar en la tabla users
    $stmt = $pdo->prepare("INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, 'admin')");
    $stmt->execute([$nombre, $email, $hash]);

    echo "Admin creado correctamente:\n";
    echo "Email: $email\n";
    echo "Contraseña temporal: $password_plain\n";
    echo "¡Recuerda cambiar la contraseña inmediatamente!\n";
} catch (Exception $e) {
    echo "Error al crear admin: " . $e->getMessage() . "\n";
}
