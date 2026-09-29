const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegisterInput, validateLoginInput } = require('../services/authValidation');

const JWT_SECRET = process.env.JWT_SECRET || 'trailerflix_secret_dev';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      nombre: user.nombre
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const validation = validateRegisterInput({ nombre, email, password });

    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const cleanedNombre = String(nombre).trim();
    const cleanedEmail = String(email).trim().toLowerCase();

    const usuarioExistente = await User.findOne({ email: cleanedEmail });

    if (usuarioExistente) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese email' });
    }

    const nuevoUsuario = await User.create({
      nombre: cleanedNombre,
      email: cleanedEmail,
      password
    });

    const token = generateToken(nuevoUsuario);

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      token,
      user: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = validateLoginInput({ email, password });

    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const cleanedEmail = String(email).trim().toLowerCase();
    const usuario = await User.findOne({ email: cleanedEmail });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordValida = await usuario.comparePassword(password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(usuario);

    return res.json({
      message: 'Login correcto',
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const usuario = req.user;

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    return res.json({
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error.message);
    return res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
