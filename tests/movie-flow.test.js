const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const Movie = require('../src/models/Movie');
const User = require('../src/models/User');

const originalFind = Movie.find;
const originalCreate = Movie.create;
const originalFindById = Movie.findById;
const originalFindByIdAndUpdate = Movie.findByIdAndUpdate;
const originalFindByIdAndDelete = Movie.findByIdAndDelete;
const originalUserFindById = User.findById;

const resetMovieMocks = () => {
  Movie.find = originalFind;
  Movie.create = originalCreate;
  Movie.findById = originalFindById;
  Movie.findByIdAndUpdate = originalFindByIdAndUpdate;
  Movie.findByIdAndDelete = originalFindByIdAndDelete;
  User.findById = originalUserFindById;
};

test('movie flow: create, fetch, update and delete with valid token', async (t) => {
  const movieId = 'movie-123';

  const createdMovie = {
    _id: movieId,
    titulo: 'Back to the Future',
    categoria: 'Película',
    genero: 'Ciencia Ficción',
    reparto: 'Michael J. Fox',
    trailer: 'https://youtube.com/example'
  };

  const validUser = {
    _id: 'user-123',
    nombre: 'Ana',
    email: 'ana@mail.com'
  };

  User.findById = () => ({
    select: () => validUser
  });

  const authToken = jwt.sign(
    { id: validUser._id, email: validUser.email, nombre: validUser.nombre },
    process.env.JWT_SECRET || 'trailerflix_secret_dev',
    { expiresIn: '1h' }
  );

  Movie.find = async () => [createdMovie];
  Movie.create = async (payload) => ({
    _id: movieId,
    ...payload
  });
  Movie.findById = async () => createdMovie;
  Movie.findByIdAndUpdate = async (_id, payload) => ({
    _id,
    ...payload
  });
  Movie.findByIdAndDelete = async () => createdMovie;

  t.after(resetMovieMocks);

  const createResponse = await request(app)
    .post('/peliculas')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      titulo: 'Back to the Future',
      categoria: 'Película',
      genero: 'Ciencia Ficción',
      reparto: 'Michael J. Fox',
      trailer: 'https://youtube.com/example'
    })
    .expect(201);

  assert.equal(createResponse.body.movie.titulo, 'Back to the Future');

  const listResponse = await request(app)
    .get('/peliculas')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  assert.ok(Array.isArray(listResponse.body));

  const detailResponse = await request(app)
    .get(`/peliculas/${movieId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  assert.equal(detailResponse.body.titulo, 'Back to the Future');

  const updateResponse = await request(app)
    .put(`/peliculas/${movieId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send({ titulo: 'Back to the Future II' })
    .expect(200);

  assert.equal(updateResponse.body.movie.titulo, 'Back to the Future II');

  const deleteResponse = await request(app)
    .delete(`/peliculas/${movieId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  assert.equal(deleteResponse.body.movie.titulo, 'Back to the Future');
});
