function error(error, request, response, next) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const stack = error.stack || "";
  response.status(status).json({
    status,
    message,
    stack,
  });
}

module.exports = error;
