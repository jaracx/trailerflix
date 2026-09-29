const Movie = require('../models/Movie');
const { validateMovieInput, sanitizeMoviePayload } = require('../services/movieValidation');

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
    const validation = validateMovieInput(req.body);

    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const payload = sanitizeMoviePayload(req.body);
    const nuevaPelicula = await Movie.create(payload);

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

    const validation = validateMovieInput(datos, { partial: true });
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const payload = sanitizeMoviePayload(datos);
    const movieActualizada = await Movie.findByIdAndUpdate(id, payload, {
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
