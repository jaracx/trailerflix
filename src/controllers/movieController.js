const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { titulo, categoria, genero, reparto, trailer } = req.body;

    const nuevaPelicula = await Movie.create({
      titulo,
      categoria,
      genero,
      reparto,
      trailer
    });

    res.status(201).json({
      message: 'Película creada correctamente',
      movie: nuevaPelicula
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la película', error: error.message });
  }
};

module.exports = {
  getMovies,
  createMovie
};
