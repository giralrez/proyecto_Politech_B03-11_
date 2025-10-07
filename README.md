# 🚀 Proyecto Politech B03-11

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## 📖 Descripción general

**Politech WebApp** es una aplicación web corporativa desarrollada como parte del **taller de Front-End del Politécnico Grancolombiano**.  
En esta **versión final**, el sitio evoluciona desde un prototipo estático (HTML + LocalStorage) hacia una **aplicación funcional conectada a una base de datos real (MySQL)**, con un **backend en PHP**, y **despliegue gratuito** en la nube a través de **InfinityFree**.

El proyecto simula la plataforma web de una empresa de servicios tecnológicos que permite a los usuarios visualizar y consultar servicios, mientras que los administradores pueden autenticarse y gestionar dichos servicios mediante un **panel de control con operaciones CRUD completas**.

---

## 🧩 Funcionalidades principales

- 🌐 **Home (index.html):** Presentación de la empresa, slider principal y descripción general.  
- 🧰 **Listado de servicios (servicios.html):** Muestra dinámicamente los 10 servicios registrados en la base de datos.  
- 🔍 **Detalle del servicio (service.php):** Visualiza información ampliada del servicio seleccionado.  
- ✉️ **Contacto (contacto.html):** Formulario funcional para contacto y solicitudes.  
- 🧑‍💻 **Registro de usuarios (registrarse.html):** Inserta nuevos usuarios en la base de datos.  
- 🔐 **Inicio de sesión (login.html):** Autenticación con validación real de credenciales.  
- ⚙️ **Panel de administración (admin/dashboard.php):**  
  - CRUD de servicios (crear, editar, eliminar, listar).  
  - Gestión de usuarios.  
  - Estadísticas básicas del sistema.  
- 🗃️ **Base de datos (politech.sql):** Tablas `usuarios` y `servicios` conectadas mediante PHP.  
- ☁️ **Despliegue remoto:** Aplicación funcionando en hosting gratuito con soporte PHP/MySQL.

---

## 📂 Estructura de archivos

```plaintext
proyecto_Politech_B03-11_/
│
├── api/                        # Lógica backend y conexión a BD
│   ├── conexion.php
│   ├── auth.php
│   ├── services.php
│   └── create_admin.php
│
├── admin/                      # Módulo administrativo
│   ├── dashboard.php
│   ├── login.html
│   └── crud/
│
├── css/                        # Hojas de estilo
│   ├── global.css
│   └── styles.css
│
├── js/                         # Lógica cliente (frontend)
│   ├── login.js
│   ├── servicios.js
│   ├── dashboard.js
│   └── registro.js
│
├── uploads/                    # Imágenes de servicios subidas al servidor
│
├── index.html
├── servicios.html
├── contacto.html
├── registrarse.html
├── login.html
├── service.php
└── politech.sql                # Script de base de datos
```
## ⚙️ Tecnologías utilizadas

| **Tecnología** | **Uso principal** |
|----------------|------------------|
| 🧱 **HTML5** | Estructura del contenido web |
| 🎨 **CSS3 / Bootstrap 5** | Diseño visual, componentes y diseño responsivo |
| ⚡ **JavaScript (Fetch API)** | Interactividad, validaciones y comunicación con backend |
| ⚙️ **PHP 8** | Lógica del servidor y conexión con la base de datos |
| 🗄️ **MySQL** | Almacenamiento estructurado de usuarios y servicios |
| ☁️ **InfinityFree** | Hosting gratuito con soporte PHP y MySQL |
| 🔧 **Git / GitHub** | Control de versiones, documentación y despliegue del proyecto |

## 🌐 Despliegue en la web

El proyecto está desplegado de forma gratuita en un servidor con soporte **PHP y MySQL**, utilizando el servicio de hosting gratuito **InfinityFree**.

**🚀 Pasos de configuración:**
1. 📂 Subir el proyecto completo al directorio `/htdocs` del hosting.  
2. 🧩 Crear una base de datos MySQL e importar el archivo `politech.sql`.  
3. ⚙️ Configurar las credenciales en `api/conexion.php`:
   ```php
   $db_host = 'sqlXXX.infinityfree.com';
   $db_name = 'epiz_XXXXXX_politech';
   $db_user = 'epiz_XXXXXX';
   $db_pass = 'TuPassword';
   ```

## 🔮 Próximos pasos (futuras versiones)

El proyecto **Politech WebApp** continuará su evolución con mejoras tanto en el **frontend** como en el **backend**:

- ⚛️ **Migrar el frontend a React o Angular** para mejorar la modularidad y la experiencia del usuario.  
- 🧠 **Implementar backend en Node.js o Laravel**, optimizando rendimiento y seguridad.  
- 🔐 **Incorporar autenticación avanzada con JWT** para usuarios y administradores.  
- 📊 **Agregar panel de métricas dinámicas** con gráficos estadísticos en el dashboard.  
- ☁️ **Desplegar en plataformas profesionales** como Render, Railway o Vercel.  
- 🧰 **Optimizar la base de datos** para permitir escalabilidad y rendimiento óptimo.  



## 📎 Repositorio

📂 **Repositorio oficial del proyecto:**  
👉 [https://github.com/giralrez/proyecto_Politech_B03-11_](https://github.com/giralrez/proyecto_Politech_B03-11_)

## 📦 Contenido del repositorio

El repositorio incluye:

- 💻 **Código fuente completo** del frontend y backend (PHP + MySQL).  
- ⚙️ **Scripts de configuración e instalación** (`create_admin.php`, `politech.sql`).  
- 🔗 **Carpeta `/api`** con endpoints para autenticación y gestión de servicios.  
- 📘 **Manual técnico y documentación funcional**.  

> 💡 **Recomendación:** Clonar el repositorio para realizar pruebas locales con **XAMPP** o **WAMP** antes del despliegue final.

---

## 👤 Autor

**👨‍💻 Andrés Giraldo Ramírez**  
Estudiante de **Ingenieria Software**  
🎓 *Politécnico Grancolombiano*  
📅 *Octubre 2025*  




