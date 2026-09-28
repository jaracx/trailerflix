const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error.message);
    res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'El ID es obligatorio' });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Error al buscar la película:', error.message);
    res.status(500).json({ message: 'Error al buscar la película', error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { titulo, categoria, genero, reparto, trailer } = req.body;

    if (!titulo || !categoria) {
      return res.status(400).json({ message: 'Título y categoría son obligatorios' });
    }

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
    console.error('Error al crear la película:', error.message);
    res.status(400).json({ message: 'Error al crear la película', error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    if (!id) {
      return res.status(400).json({ message: 'El ID es obligatorio' });
    }

    const movieActualizada = await Movie.findByIdAndUpdate(id, datos, {
      new: true,
      runValidators: true
    });

    if (!movieActualizada) {
      return res.status(404).json({ message: 'Película no encontrada para actualizar' });
    }

    res.json({
      message: 'Película actualizada correctamente',
      movie: movieActualizada
    });
  } catch (error) {
    console.error('Error al actualizar la película:', error.message);
    res.status(400).json({ message: 'Error al actualizar la película', error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'El ID es obligatorio' });
    }

    const movieEliminada = await Movie.findByIdAndDelete(id);

    if (!movieEliminada) {
      return res.status(404).json({ message: 'Película no encontrada para eliminar' });
    }

    res.json({
      message: 'Película eliminada correctamente',
      movie: movieEliminada
    });
  } catch (error) {
    console.error('Error al eliminar la película:', error.message);
    res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
