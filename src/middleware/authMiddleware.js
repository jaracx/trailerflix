const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'trailerflix_secret_dev';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const usuario = await User.findById(decoded.id).select('-password');

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no válido' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
