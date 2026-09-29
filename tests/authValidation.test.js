const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateRegisterInput,
  validateLoginInput
} = require('../src/services/authValidation');

test('validateRegisterInput rechaza nombre, email o password vacíos', () => {
  const resultado = validateRegisterInput({
    nombre: 'Ana',
    email: '',
    password: '123456'
  });

  assert.deepEqual(resultado, {
    valid: false,
    message: 'Email es obligatorio'
  });
});

test('validateRegisterInput rechaza password demasiado corta', () => {
  const resultado = validateRegisterInput({
    nombre: 'Ana',
    email: 'ana@mail.com',
    password: '123'
  });

  assert.deepEqual(resultado, {
    valid: false,
    message: 'La contraseña debe tener al menos 6 caracteres'
  });
});

test('validateLoginInput acepta credenciales válidas', () => {
  const resultado = validateLoginInput({
    email: 'ana@mail.com',
    password: '123456'
  });

  assert.deepEqual(resultado, { valid: true });
});
