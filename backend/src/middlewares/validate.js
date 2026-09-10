export const validate = (schema) => (request, _response, next) => {
  const result = schema.safeParse(request.body);
  if (!result.success) {
    const error = new Error('Revisá los datos ingresados.');
    error.status = 422;
    error.details = result.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }));
    return next(error);
  }
  request.validatedBody = result.data;
  return next();
};
