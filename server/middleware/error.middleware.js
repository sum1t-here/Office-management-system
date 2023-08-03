const errorMiddleware = (err, req, res, next) => {
  // Set the status code for the error response. If not provided, default to 500 (Internal Server Error).
  err.statusCode = err.statusCode || 500;
  // Set the error message for the response. If not provided, default to 'Something went wrong'.
  err.message = err.message || 'Something went wrong';
  // Return a JSON response with the status code, error message, and the error stack trace.
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export default errorMiddleware;
