require('dotenv').config();
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3008;
const BD_PATH = path.join(__dirname, process.env.DATABASE_PATH || 'database/trailerfix.json');

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
// PARTE 1: RUTAS A DESARROLLAR
// =======================================================

// 1. GET /catalogo -> Obtener todo el catálogo
app.get('/catalogo', async (req, res) => {
  try {
    const catalogo = await obtenerTrailerflix();
    res.json(catalogo);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el catálogo' });
  }
});

// 2. GET /titulo/:title -> Búsqueda parcial por título
app.get('/titulo/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const catalogo = await obtenerTrailerflix();
    const resultados = catalogo.filter((item) =>
      item.titulo.toLowerCase().includes(title.toLowerCase())
    );

    if (!resultados.length) {
      return res.status(404).json({ error: 'No se encontró ningún título coincidente' });
    }

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por título' });
  }
});

// 3. GET /categoria/:cat -> Filtrar por categoría (Serie/Película)
app.get('/categoria/:cat', async (req, res) => {
  try {
    const { cat } = req.params;
    const catalogo = await obtenerTrailerflix();
    const resultados = catalogo.filter((item) =>
      item.categoria.toLowerCase().includes(cat.toLowerCase())
    );

    if (!resultados.length) {
      return res.status(404).json({ error: 'No se encontró ninguna categoría coincidente' });
    }

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por categoría' });
  }
});

// =======================================================
// PARTE 2: RUTAS A DESARROLLAR
// =======================================================

// 4. GET /reparto/:act -> Filtrar por actor/actriz
app.get('/reparto/:act', async (req, res) => {
  try {
    const { act } = req.params;
    const catalogo = await obtenerTrailerflix();
    const resultados = catalogo.filter((item) =>
      item.reparto.toLowerCase().includes(act.toLowerCase())
    );

    if (!resultados.length) {
      return res.status(404).json({ error: 'No se encontró ningún actor o actriz coincidente' });
    }

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por reparto' });
  }
});

// 5. GET /trailer/:id -> Obtener tráiler por ID
app.get('/trailer/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const catalogo = await obtenerTrailerflix();
    const item = catalogo.find((elemento) => elemento.id === id);

    if (!item) {
      return res.status(404).json({ error: 'No se encontró un contenido con ese ID' });
    }

    if (!item.trailer) {
      return res.status(404).json({ error: 'No existe tráiler para este contenido' });
    }

    res.json({
      id: item.id,
      titulo: item.titulo,
      trailer: item.trailer
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el tráiler' });
  }
});

// =======================================================
// SERVIDOR
// =======================================================

// Manejo de rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor de Trailerflix corriendo en http://localhost:${PORT}`);
});
