function validateRegisterInput({ nombre, email, password }) {
  if (!nombre || !String(nombre).trim()) {
    return { valid: false, message: 'Nombre es obligatorio' };
  }

  if (!email || !String(email).trim()) {
    return { valid: false, message: 'Email es obligatorio' };
  }

  if (!password || !String(password).trim()) {
    return { valid: false, message: 'La contraseña es obligatoria' };
  }

  const cleanedEmail = String(email).trim();
  const cleanedPassword = String(password).trim();

  if (!/^\S+@\S+\.\S+$/.test(cleanedEmail)) {
    return { valid: false, message: 'Email no válido' };
  }

  if (cleanedPassword.length < 6) {
    return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
  }

  return { valid: true };
}

function validateLoginInput({ email, password }) {
  if (!email || !String(email).trim()) {
    return { valid: false, message: 'Email es obligatorio' };
  }

  if (!password || !String(password).trim()) {
    return { valid: false, message: 'La contraseña es obligatoria' };
  }

  const cleanedEmail = String(email).trim();
  const cleanedPassword = String(password).trim();

  if (!/^\S+@\S+\.\S+$/.test(cleanedEmail)) {
    return { valid: false, message: 'Email no válido' };
  }

  if (cleanedPassword.length < 6) {
    return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
  }

  return { valid: true };
}

module.exports = {
  validateRegisterInput,
  validateLoginInput
};
