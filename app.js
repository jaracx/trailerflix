require('dotenv').config();
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const connectDB = require('./src/config/db');
const movieRoutes = require('./src/routes/movieRoutes');
const authRoutes = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');
const { paginateCatalog, normalizeText } = require('./src/services/catalogService');

const app = express();
app.use(express.json());

connectDB();
app.use('/auth', authRoutes);
app.use('/peliculas', authMiddleware, movieRoutes);

const PORT = process.env.PORT || 3008;
const BD_PATH = path.join(__dirname, process.env.DATABASE_PATH || 'database/trailerflix.json');

// Función auxiliar para leer la base de datos
async function obtenerTrailerflix() {
  try {
    const contenido = await fs.readFile(BD_PATH, 'utf-8');
    return JSON.parse(contenido);
  } catch (err) {
    console.error('Error leyendo la base de datos:', err);
    throw err;
  }
}

// Ruta Raíz de Bienvenida
app.get('/', (req, res) => {
  res.type('html').send('<h1>Bienvenido a la API de Trailerflix</h1>');
});

// =======================================================
// PARTE 1: RUTAS A DESARROLLAR (Integrante 1)
// =======================================================

// 1. GET /catalogo -> Obtener catalogo paginado
app.get('/catalogo', async (req, res, next) => {
  try {
    const catalogo = await obtenerTrailerflix();
    const result = paginateCatalog(catalogo, req.query.page, req.query.limit);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// 2. GET /titulo/:title -> Búsqueda parcial por título
app.get('/titulo/:title', async (req, res, next) => {
  try {
    const catalogo = await obtenerTrailerflix();
    const busqueda = normalizeText(req.params.title);
    const resultados = catalogo.filter(item => normalizeText(item.titulo).includes(busqueda));

    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados para el título proporcionado' });
    }
    res.json(resultados);
  } catch (err) {
    next(err);
  }
});

// 3. GET /categoria/:cat -> Filtrar por categoría (Serie o Película)
app.get('/categoria/:cat', async (req, res, next) => {
    try {
        const { cat } = req.params;
        const catalogo = await obtenerTrailerflix();
        const busqueda = normalizeText(cat);

        const resultados = catalogo.filter(item => {
            if (!item.categoria) return false;
            return normalizeText(item.categoria).includes(busqueda);
        });

        if (!resultados.length) {
            return res.status(404).json({ error: 'No se encontró ninguna categoría coincidente' });
        }

        res.json(resultados);
    } catch (error) {
        next(error);
    }
});

// =======================================================
// PARTE 2: RUTAS A DESARROLLAR (Integrante 2)
// =======================================================


// 4. GET /reparto/:act -> Filtrar por actor/actriz (devuelve solo titulo y reparto)
app.get('/reparto/:act', async (req, res, next) => {
    try {
        const { act } = req.params;
        const catalogo = await obtenerTrailerflix();
        const busqueda = normalizeText(act);
        const resultados = catalogo.filter(item =>
            item.reparto && normalizeText(item.reparto).includes(busqueda)
        );

        if (!resultados.length) {
            return res.status(404).json({ error: 'No se encontró ningún actor o actriz coincidente' });
        }

        const respuesta = resultados.map(item => ({
            titulo: item.titulo,
            reparto: item.reparto
        }));

        res.json(respuesta);
    } catch (error) {
        next(error);
    }
});

// 5. GET /trailer/:id -> Obtener tráiler con operador condicional
app.get('/trailer/:id', async (req, res, next) => {
    try {
        const idParam = parseInt(req.params.id) || req.params.id;
        const catalogo = await obtenerTrailerflix();
        const item = catalogo.find(e => e.id === idParam || e.codigo === idParam);

        if (!item) {
            return res.status(404).json({ error: 'No se encontró un contenido con ese ID o código' });
        }

        // Acceso condicional al tráiler según consigna
        if (!item?.trailer) {
            return res.status(404).json({ error: 'El contenido solicitado no posee un tráiler disponible' });
        }

        res.json({
            id: item.id || item.codigo,
            titulo: item.titulo,
            trailer: item.trailer
        });
    } catch (error) {
        next(error);
    }
});

// =======================================================
// MANEJO DE RUTAS INEXISTENTES (404) Y SERVIDOR
// =======================================================

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error('Error global:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Trailerflix corriendo en http://localhost:${PORT}`);
});