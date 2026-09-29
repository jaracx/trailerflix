const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../app');
const User = require('../src/models/User');

const originalFindOne = User.findOne;
const originalCreate = User.create;
const originalFindById = User.findById;

const resetUserMocks = () => {
  User.findOne = originalFindOne;
  User.create = originalCreate;
  User.findById = originalFindById;
};

test('register -> login -> /me works as a real auth flow', async (t) => {
  const user = {
    _id: 'user-123',
    nombre: 'Ana',
    email: 'ana@mail.com',
    password: 'hashed-password',
    comparePassword: async (candidate) => candidate === '123456'
  };

  let userCreated = false;

  User.findOne = async ({ email }) => {
    if (!userCreated && email === 'ana@mail.com') {
      return null;
    }

    return user;
  };

  User.create = async (payload) => {
    userCreated = true;
    return {
      _id: 'user-123',
      nombre: payload.nombre,
      email: payload.email,
      password: payload.password
    };
  };

  User.findById = () => ({
    select: () => ({
      _id: 'user-123',
      nombre: 'Ana',
      email: 'ana@mail.com'
    })
  });

  t.after(resetUserMocks);

  const registerResponse = await request(app)
    .post('/auth/register')
    .send({
      nombre: 'Ana',
      email: 'ana@mail.com',
      password: '123456'
    })
    .expect(201);

  assert.equal(registerResponse.body.user.email, 'ana@mail.com');
  assert.ok(registerResponse.body.token);

  const loginResponse = await request(app)
    .post('/auth/login')
    .send({
      email: 'ana@mail.com',
      password: '123456'
    })
    .expect(200);

  assert.ok(loginResponse.body.token);

  const profileResponse = await request(app)
    .get('/auth/me')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .expect(200);

  assert.equal(profileResponse.body.user.email, 'ana@mail.com');
});
