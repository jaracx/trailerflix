const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    default: 'Sin género'
  },
  reparto: {
    type: String,
    default: ''
  },
  trailer: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
