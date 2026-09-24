# Trailerflix API

Una pequeña API REST para consultar un catálogo de series y películas con información básica y enlaces a trailers.

## Descripción

Este proyecto permite:

- Consultar todo el catálogo
- Buscar contenido por título
- Filtrar por categoría
- Buscar por actor o actriz
- Obtener el trailer de un elemento por su ID

## Tecnologías

- Node.js
- Express
- JavaScript
- JSON como base de datos local

## Estructura del proyecto

```bash
trailerfix/
├── app.js
├── package.json
├── README.md
├── database/
│   └── trailerfix.json
├── .env
├── .gitignore
└── node_modules/
```

## Requisitos

- Node.js instalado
- npm instalado

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd trailerfix
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecución

Inicia la API con:

```bash
node app.js
```

La aplicación correrá por defecto en:

```bash
http://localhost:3008
```

## Endpoints disponibles

### GET /
Devuelve un mensaje de bienvenida.

### GET /catalogo
Devuelve todo el catálogo.

### GET /titulo/:title
Busca elementos por título, usando coincidencia parcial.

Ejemplo:

```bash
http://localhost:3008/titulo/back
```

### GET /categoria/:cat
Filtra por categoría: `Película` o `Serie`.

Ejemplo:

```bash
http://localhost:3008/categoria/pelicula
```

### GET /reparto/:act
Busca por actor o actriz.

Ejemplo:

```bash
http://localhost:3008/reparto/Robert
```

### GET /trailer/:id
Devuelve el trailer asociado a un ID.

Ejemplo:

```bash
http://localhost:3008/trailer/1
```

## Base de datos

La información se guarda en:

```bash
database/trailerfix.json
```

Cada elemento tiene este formato:

```json
{
  "id": 1,
  "titulo": "Back to the Future",
  "categoria": "Película",
  "gen": "Ciencia Ficción",
  "reparto": "Michael J. Fox, Christopher Lloyd",
  "trailer": "https://www.youtube.com/watch?v=qvsgGtivCgs"
}
```

## Git y GitHub

Este proyecto es ideal para practicar con Git y GitHub:

- `git init` para inicializar el repositorio
- `git add .` para preparar cambios
- `git commit -m "Inicializa proyecto"` para guardar versiones
- `git branch` para crear ramas
- `git checkout -b feature/nueva-ruta` para trabajar en una rama
- `git push origin main` para subir al repositorio remoto

## Recomendaciones para trabajar en equipo

- Crear una rama por cada tarea o funcionalidad
- Hacer commits cortos y descriptivos
- Revisar cambios antes de hacer merge
- Usar pull requests para combinar trabajo

## Autores

- [Tu nombre]
- [Nombre de tu compañera]

## Licencia

Este proyecto se encuentra bajo licencia MIT.
