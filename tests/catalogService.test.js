const test = require('node:test');
const assert = require('node:assert/strict');

const { paginateCatalog, normalizeText } = require('../src/services/catalogService');

const catalogo = [
  { id: 1, titulo: 'Back to the Future', categoria: 'Película', reparto: 'Michael J. Fox' },
  { id: 2, titulo: 'The Matrix', categoria: 'Película', reparto: 'Keanu Reeves' },
  { id: 3, titulo: 'Coco', categoria: 'Película', reparto: 'Anthony Gonzalez' },
  { id: 4, titulo: 'Dark', categoria: 'Serie', reparto: 'Louis Hofmann' },
  { id: 5, titulo: 'Stranger Things', categoria: 'Serie', reparto: 'Millie Bobby Brown' }
];

test('paginateCatalog devuelve la página correcta y el total', () => {
  const result = paginateCatalog(catalogo, 2, 2);

  assert.equal(result.page, 2);
  assert.equal(result.limit, 2);
  assert.equal(result.total, 5);
  assert.equal(result.totalPages, 3);
  assert.deepEqual(result.data.map(item => item.id), [3, 4]);
});

test('normalizeText elimina tildes y normaliza mayúsculas/minúsculas', () => {
  assert.equal(normalizeText('CATEGORÍA'), 'categoria');
  assert.equal(normalizeText('Película'), 'pelicula');
});
