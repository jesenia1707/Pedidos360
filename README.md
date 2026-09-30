# Pedidos360
**Pedidos360** es una empresa de comercio electrónico que permite a sus
clientes consultar productos, realizar y gestionar pedidos, mientras que
los colaboradores apoyan la operación y los administradores supervisan
el sistema.

Sistema de gestión de pedidos y productos desarrollado con una arquitectura Cloud Native, utilizando Angular, AWS Cognito, API Gateway, microservicios Spring Boot, Docker, EC2 y Supabase.

---

## 1. Descripción del proyecto

Pedidos360 permite gestionar y consultar pedidos y productos mediante una aplicación web segura.

El sistema cuenta con tres tipos de usuarios:

- Administrador
- Cliente
- Colaborador

Cada usuario accede a un panel según su rol.

---

## 2. Arquitectura

```text
Angular
   ↓
AWS Cognito
   ↓
JWT
   ↓
AWS API Gateway
   ↓
EC2 + Docker
   ├── MS Pedidos :8080
   └── MS Productos :8081
           ↓
      Supabase PostgreSQL

El frontend se comunica con los microservicios a través de API Gateway.

3. Tecnologías utilizadas
Frontend
Angular
TypeScript
HTML
CSS
Backend
Java 21
Spring Boot
Spring Security
Spring Data JPA
OAuth2 / JWT
Cloud y DevOps
AWS Cognito
AWS API Gateway
AWS EC2
Docker
GitHub Actions
GitHub Container Registry
Base de datos
PostgreSQL
Supabase
4. Estructura del proyecto
Pedidos360/
├── pedidos/
├── productos/
├── frontend/
└── .github/
    └── workflows/

El proyecto está separado en dos microservicios backend y un frontend Angular.

5. Microservicios
MS Pedidos

Puerto:

8080

Endpoint principal:

GET /api/pedidos

También cuenta con operaciones para consultar, crear y eliminar pedidos.

MS Productos

Puerto:

8081

Endpoint principal:

GET /api/productos

También permite consultar, crear y eliminar productos.

6. Seguridad y roles

La autenticación se realiza mediante AWS Cognito utilizando OAuth2/OIDC y JWT.

Los roles utilizados son:

admin
Cliente
Colaborador

Según el rol obtenido desde Cognito, el usuario es dirigido a su panel correspondiente:

admin        → /admin
Cliente      → /cliente
Colaborador  → /colaborador

API Gateway también valida el JWT antes de permitir el acceso a las rutas protegidas.

7. Frontend

El frontend está desarrollado en Angular.

Cuenta con:

Inicio de sesión.
Cierre de sesión.
Panel de administrador.
Panel de cliente.
Panel de colaborador.
Consulta de pedidos.
Consulta de productos.

Las solicitudes hacia el backend utilizan la API de AWS API Gateway.

8. Despliegue

Los microservicios se ejecutan mediante Docker en una instancia AWS EC2.

Las imágenes Docker se almacenan en GitHub Container Registry:

ghcr.io/jesenia1707/pedidos360-pedidos
ghcr.io/jesenia1707/pedidos360-productos

GitHub Actions automatiza la compilación de los microservicios y la publicación de las imágenes Docker.

9. Base de datos

El proyecto utiliza PostgreSQL alojado en Supabase.

La conexión se realiza mediante variables de entorno:

DB_URL
DB_USER
DB_PASSWORD

Los datos sensibles no deben almacenarse directamente en el código fuente.

10. Ejecución y estado del proyecto
Frontend

Desde la carpeta frontend:

npm install
ng serve --port 4200

Aplicación:

http://localhost:4200
Backend

MS Pedidos:

gradlew.bat bootRun

Puerto:

8080

MS Productos:

gradlew.bat bootRun

Puerto:

8081
Estado actual
 Frontend Angular
 AWS Cognito
 Autenticación JWT
 Roles de usuario
 MS Pedidos
 MS Productos
 API Gateway
 Docker
 EC2
 Supabase
 GitHub Actions
 Paneles según rol