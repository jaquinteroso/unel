# 🥫 Unel Conservas - Sistema de Gestión y E-commerce

Plataforma integral desarrollada para la gestión interna y venta pública de conservas artesanales. El sistema cuenta con una vitrina pública para clientes y un panel de administración privado (SaaS) para gestionar inventario, costeo de recetas, finanzas y ventas.

## 🛠️ Stack Tecnológico

* **Backend:** Ruby on Rails
* **Base de Datos:** PostgreSQL
* **Frontend:** Tailwind CSS / HTML (ERB)
* **Autenticación:** Devise

---

## 🚀 Configuración del Entorno de Desarrollo

Sigue estos pasos para levantar el proyecto localmente por primera vez.

### 1. Instalar dependencias
Asegúrate de tener instalado Ruby y PostgreSQL en tu sistema antes de ejecutar:
\`\`\`bash
bundle install
\`\`\`

### 2. Preparar la Base de Datos
Este comando creará la base de datos, correrá las migraciones y plantará las semillas iniciales (incluyendo las cuentas de prueba):
\`\`\`bash
bin/rails db:create db:migrate db:seed
\`\`\`

### 3. Levantar el Servidor
Para iniciar el servidor de Rails junto con la compilación en vivo de Tailwind CSS, utiliza:
\`\`\`bash
bin/dev
\`\`\`
La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Cuentas de Acceso (Desarrollo)

Para acceder al panel de administración local (`http://localhost:3000/admin`), utiliza las siguientes credenciales generadas por el archivo `seeds.rb`:

* **Email:** `admin@unel.cl`
* **Password:** `password123`

---

## 📂 Arquitectura Básica (Para Desarrolladores)

* **Mundo Público (Vitrina):** Las vistas principales se encuentran en `app/views/products/`. El controlador principal es `ProductsController`.
* **Mundo Privado (Panel Admin):** Todas las vistas del panel de control están protegidas y encapsuladas dentro de `app/views/admin/`. Los controladores heredan de `Admin::ApplicationController`.
