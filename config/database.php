<?php
/**
 * Configuración de Conexión a Base de Datos
 * Politech - Sistema de Gestión de Servicios
 */

// Configuración del servidor
define('DB_HOST', 'localhost');
define('DB_NAME', 'politech_db');
define('DB_USER', 'root');
define('DB_PASS', ''); // Cambia si tu MySQL tiene contraseña

// Configuración de la aplicación
define('BASE_URL', 'http://localhost/politech/'); // Ajusta según tu carpeta
define('ADMIN_EMAIL', 'admin@politech.com');

class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $conn = null;

    /**
     * Obtener conexión PDO
     */
    public function getConnection() {
        if ($this->conn === null) {
            try {
                $this->conn = new PDO(
                    "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4",
                    $this->username,
                    $this->password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false
                    ]
                );
            } catch(PDOException $e) {
                die("Error de conexión: " . $e->getMessage());
            }
        }
        return $this->conn;
    }

    /**
     * Cerrar conexión
     */
    public function closeConnection() {
        $this->conn = null;
    }
}

/**
 * Función helper para obtener conexión rápida
 */
function getDB() {
    $database = new Database();
    return $database->getConnection();
}
?>