function createError(message, status = 500) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function handleError(err, req, res, next) {
  const statusCode = err.status || 500;

  console.error(`[${req.method}] ${req.originalUrl} -> ${err.message}`);

  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor'
  });
}

module.exports = {
  createError,
  handleError
};
