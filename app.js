require('dotenv').config();
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

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

// 1. GET /catalogo -> Obtener todo el catálogo
app.get('/catalogo', async (req, res) => {
  try {
    const catalogo = await obtenerTrailerflix();
    res.json(catalogo);
  } catch (err) {
    res.status(500).json({ error: 'no se pudo leer la base de datos' });
  }
});

// 2. GET /titulo/:title -> Búsqueda parcial por título
app.get('/titulo/:title', async (req, res) => {
  try {
    const catalogo = await obtenerTrailerflix();
    // convertimos la busqueda en minusculas
    const busqueda = req.params.title.toLowerCase();
    // filtramos el catalogo comparando la busqueda con el titulo de cada item en minusculas
    const resultados = catalogo.filter(item => item.titulo.toLowerCase().includes(busqueda));
    
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados para el título proporcionado' });
    }
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: 'no se pudo leer la base de datos' });
  }
});

// 3. GET /categoria/:cat -> Filtrar por categoría (Serie/Película)
app.get('/categoria/:cat', async (req, res) => {
  try {
    const catalogo = await obtenerTrailerflix();
    const busqueda = req.params.cat.toLowerCase();
    const resultados = catalogo.filter(item => item.categoria.toLowerCase() === busqueda);
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados para la categoría proporcionada' });
    }
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: 'no se pudo leer la base de datos' });
  }
});

// =======================================================
// PARTE 2: RUTAS A DESARROLLAR (Integrante 2)
// =======================================================

// 4. GET /reparto/:act -> Filtrar por actor/actriz
app.get('/reparto/:act', async (req, res) => {
  // TODO: Implementar por Integrante 2
  res.status(501).json({ mensaje: 'Pendiente de implementación' });
});

// 5. GET /trailer/:id -> Obtener tráiler por ID
app.get('/trailer/:id', async (req, res) => {
  // TODO: Implementar por Integrante 2
  res.status(501).json({ mensaje: 'Pendiente de implementación' });
});

// =======================================================
// MANEJO DE RUTAS INEXISTENTES (404) Y SERVIDOR
// =======================================================

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor de Trailerflix corriendo en http://localhost:${PORT}`);
});