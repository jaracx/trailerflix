# Trailerflix API

API REST para gestionar contenido multimedia con autenticación JWT, MongoDB y Express.

## Descripción

Este proyecto permite:

- consultar catálogo paginado
- buscar contenido por título
- filtrar por categoría
- buscar por actor o actriz
- obtener el trailer asociado
- registrar e iniciar sesión con JWT
- proteger rutas privadas con middleware
- gestionar películas con CRUD

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## Estructura del proyecto

```bash
trailerfix/
├── app.js
├── package.json
├── README.md
├── .env.example
├── .gitignore
├── database/
│   └── trailerflix.json
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── notes/
```

## Requisitos

- Node.js 18+
- MongoDB en ejecución local o Atlas
- npm

## Instalación

```bash
npm install
cp .env.example .env
```

Completar `.env` con tus valores reales:

```env
PORT=3008
MONGODB_URI=mongodb://127.0.0.1:27017/trailerflix
JWT_SECRET=tu_clave_secreta
DATABASE_PATH=database/trailerflix.json
```

## Ejecución

```bash
node app.js
```

La API quedará disponible en:

```bash
http://localhost:3008
```

## Arquitectura del proyecto

- `app.js`: arranque del servidor y rutas públicas
- `src/routes/`: endpoints HTTP
- `src/controllers/`: lógica de negocio
- `src/models/`: esquemas de MongoDB con Mongoose
- `src/middleware/`: autenticación y protección de rutas
- `src/services/`: validaciones y helpers reutilizables
- `src/config/db.js`: conexión a MongoDB

## Endpoints

## Endpoints

### Auth

#### POST /auth/register
Registra un usuario nuevo.

```json
{
  "nombre": "Ana",
  "email": "ana@mail.com",
  "password": "123456"
}
```

#### POST /auth/login
Inicia sesión y devuelve un token JWT.

```json
{
  "email": "ana@mail.com",
  "password": "123456"
}
```

#### GET /auth/me
Devuelve el perfil del usuario autenticado.

Headers:

```http
Authorization: Bearer <token>
```

Ejemplo de respuesta:

```json
{
  "user": {
    "id": "64a...",
    "nombre": "Ana",
    "email": "ana@mail.com"
  }
}
```

### Películas

#### GET /peliculas
Devuelve las películas protegidas por autenticación.

#### GET /peliculas/:id
Devuelve una película por ID.

#### POST /peliculas
Crea una nueva película.

#### PUT /peliculas/:id
Actualiza una película.

#### DELETE /peliculas/:id
Elimina una película.

#### GET /catalogo?page=1&limit=10
Devuelve el catálogo paginado.

### Endpoints legacy del proyecto base

#### GET /
Muestra mensaje de bienvenida.

#### GET /titulo/:title
Busca por título.

#### GET /categoria/:cat
Busca por categoría.

#### GET /reparto/:act
Busca por actor o actriz.

#### GET /trailer/:id
Devuelve el trailer de un contenido por ID.

## Seguridad

- Contraseñas encriptadas con bcryptjs
- JWT para autenticación
- rutas protegidas con middleware
- secretos almacenados en `.env`
- archivo `.env.example` como plantilla

## Testing recomendado

Usar Postman, Thunder Client o Insomnia para probar:

- registro válido
- login válido e inválido
- acceso con token correcto/incorrecto
- creación de película
- actualización y eliminación
- paginación del catálogo

## GitHub y ramas

El proyecto se trabaja en la rama `backend-pro` como proyecto profesional y de aprendizaje, mientras la rama `main` puede seguir el uso académico de la materia.

## Estado del proyecto

El backend ya tiene una base sólida para seguir creciendo con:
- autenticación JWT
- validaciones por capa
- seguridad básica
- estructura orientada a backend profesional
- documentación clara para uso y aprendizaje
- testing profesional con Node test

## Siguientes mejoras recomendadas

- tests de integración para auth y movies
- roles de usuario
- paginación real sobre MongoDB
- deploy con entorno de producción
- documentación de Postman/Insomnia
