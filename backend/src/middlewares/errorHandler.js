export function notFound(request, _response, next) {
  const error = new Error(`Ruta no encontrada: ${request.method} ${request.originalUrl}`);
  error.status = 404;
  next(error);
}

export function errorHandler(error, request, response, _next) {
  let status = error.status || 500;
  let message = error.message || 'Error interno del servidor.';
  if (error.name === 'ValidationError') { status = 422; message = 'Los datos no cumplen el formato requerido.'; }
  if (error.code === 11000) { status = 409; message = `Ya existe un registro con ese ${Object.keys(error.keyPattern || {})[0] || 'valor'}.`; }
  if (error.name === 'MulterError') {
    status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    message = error.code === 'LIMIT_FILE_SIZE' ? 'La imagen supera el tamaño máximo permitido.' : 'No se pudo procesar la imagen seleccionada.';
  }
  if (status >= 500) console.error(`${request.method} ${request.originalUrl}:`, error);
  const payload = { message };
  if (error.details) payload.errors = error.details;
  if (process.env.NODE_ENV !== 'production' && status >= 500) payload.stack = error.stack;
  response.status(status).json(payload);
}
