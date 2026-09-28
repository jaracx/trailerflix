const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [2, 'El título debe tener al menos 2 caracteres']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    trim: true,
    enum: {
      values: ['Película', 'Serie'],
      message: 'La categoría debe ser "Película" o "Serie"'
    }
  },
  genero: {
    type: String,
    default: 'Sin género',
    trim: true
  },
  reparto: {
    type: String,
    default: '',
    trim: true
  },
  trailer: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
