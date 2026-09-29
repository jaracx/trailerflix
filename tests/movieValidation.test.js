const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateMovieInput,
  sanitizeMoviePayload
} = require('../src/services/movieValidation');

test('validateMovieInput rechaza título vacío', () => {
  const resultado = validateMovieInput({
    titulo: '   ',
    categoria: 'Película'
  });

  assert.deepEqual(resultado, {
    valid: false,
    message: 'El título es obligatorio'
  });
});

test('validateMovieInput rechaza categoría inválida', () => {
  const resultado = validateMovieInput({
    titulo: 'Back to the Future',
    categoria: 'Documental'
  });

  assert.deepEqual(resultado, {
    valid: false,
    message: 'La categoría debe ser "Película" o "Serie"'
  });
});

test('sanitizeMoviePayload normaliza texto y deja valores por defecto', () => {
  const resultado = sanitizeMoviePayload({
    titulo: '  back to the future  ',
    categoria: 'película',
    genero: '  ciencia ficción  ',
    reparto: '  Michael J. Fox  ',
    trailer: '  https://youtube.com/abc  '
  });

  assert.deepEqual(resultado, {
    titulo: 'Back to the Future',
    categoria: 'Película',
    genero: 'Ciencia Ficción',
    reparto: 'Michael J. Fox',
    trailer: 'https://youtube.com/abc'
  });
});
