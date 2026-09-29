# Trailerflix API

Este proyecto nació como una API de catálogo y fue evolucionando hacia un backend más serio con autenticación, validaciones, estructura modular y pruebas reales. Es un proyecto de aprendizaje y también una base sólida para portfolio.

## Objetivo del proyecto

- entender cómo funciona una API REST en Node.js
- aprender Express y Mongoose
- practicar autenticación con JWT
- separar responsabilidades por capas
- desarrollar un backend con una base más profesional
- dejar un historial de commits para estudiar el proceso de crecimiento del proyecto

## Stack principal

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- JavaScript

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
│   ├── routes/
│   └── services/
├── tests/
├── notes/
└── .env
```

## ¿Qué aprendimos en este proyecto?

### 1. Cómo arrancar una API con Express
Se aprendió a crear un servidor, levantar rutas, manejar JSON y responder según el contexto de la petición.

### 2. Cómo organizar un backend
La estructura se fue separando en:
- routes: define endpoints
- controllers: lógica de negocio
- models: esquema y validaciones con Mongoose
- middleware: autenticación y protección de rutas
- services: validaciones y helpers reutilizables

### 3. Qué es Mongoose
Mongoose es una librería que conecta Node con MongoDB y te ayuda a definir modelos, validaciones y consultas. En lugar de trabajar directamente con Mongo sin estructura, Mongoose te da una capa más ordenada.

### 4. Qué es JWT
JWT significa JSON Web Token. Es una forma de generar un token que identifica a un usuario y que puede enviarse en cada request para saber si está autenticado.

### 5. Por qué separar validaciones
Cuando una API crece, no conviene mezclar todo en un mismo archivo. Las validaciones se vuelven más claras, reutilizables y fáciles de testear si se separan en servicios.

### 6. Por qué testear flujo real
No alcanza con validar funciones sueltas. Lo importante es probar el flujo real de la app:
- registrar usuario
- hacer login
- usar token en una ruta protegida
- crear una película
- actualizarla y eliminarla

## Instalación

```bash
npm install
cp .env.example .env
```

Configura tu archivo `.env` con algo así:

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

La API queda disponible en:

```bash
http://localhost:3008
```

## Endpoints principales

### Auth

#### POST /auth/register
Registra un usuario.

```json
{
  "nombre": "Ana",
  "email": "ana@mail.com",
  "password": "123456"
}
```

#### POST /auth/login
Hace login y devuelve un token JWT.

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

### Películas

#### GET /peliculas
Lista películas protegidas.

#### GET /peliculas/:id
Obtiene una película por ID.

#### POST /peliculas
Crea una nueva película.

#### PUT /peliculas/:id
Actualiza una película.

#### DELETE /peliculas/:id
Elimina una película.

### Catálogo

#### GET /catalogo?page=1&limit=10
Devuelve el catálogo paginado.

#### GET /titulo/:title
Busca por título.

#### GET /categoria/:cat
Busca por categoría.

#### GET /reparto/:act
Busca por actor o actriz.

#### GET /trailer/:id
Devuelve el trailer asociado a un contenido.

## Flujo de desarrollo que seguimos

Este proyecto no se construyó “todo de una”. Se fue avanzando por etapas, y eso es muy útil para aprender:

1. iniciar proyecto base
2. crear estructura de carpetas
3. conectar MongoDB con Mongoose
4. crear usuario y autenticación
5. proteger rutas con middleware
6. crear CRUD de películas
7. centralizar validaciones
8. agregar tests unitarios y de flujo real
9. dejar un historial de commits claro para estudiar más tarde

## Testing

Se usa Node test para validar:
- validación de email y contraseña
- paginación del catálogo
- sanitización de datos
- flujo completo de registro/login/perfil
- flujo protegido de películas

Ejemplo:

```bash
npm test
```

## Git y ramas

La rama principal de trabajo del proyecto es:

```bash
backend-pro
```

Esto permite que `main` siga siendo la rama de entrega académica y que `backend-pro` sea la rama de aprendizaje profesional y crecimiento técnico.

## Estado actual del proyecto

El backend ya tiene una base sólida para seguir creciendo con:
- autenticación JWT
- conexión a MongoDB con Mongoose
- validaciones por capa
- rutas protegidas
- organización por arquitectura básica
- testing real con Node
- historial de desarrollo legible para estudiar más tarde

## Siguientes pasos recomendados

- roles de usuario
- paginación real sobre MongoDB
- manejo más específico de errores
- deploy con entorno de producción
- mejoras de documentación para portfolio

## Reflexión personal

Este proyecto es una etapa de aprendizaje muy valiosa: no solo aprendés a “hacer endpoints”, sino a pensar cómo funciona un backend real, cómo se organiza, cómo se valida y cómo se documenta.

Más importante aún: cada commit deja evidencia de cómo se fue construyendo la aplicación, y eso te va a permitir estudiar el proceso en cualquier momento.

## Créditos

Proyecto desarrollado como práctica de aprendizaje backend con enfoque profesional.
