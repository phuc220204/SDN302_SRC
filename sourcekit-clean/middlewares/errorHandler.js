const notFound = (req, res, next) => {
  const err = new Error(`Not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  } else if (err.code === 11000) {
    status = 400;
    message = `Duplicate value for: ${Object.keys(err.keyValue || {}).join(', ')}`;
  } else if (err.name === 'CastError') {
    status = 400;
    message = `Invalid id: ${err.value}`;
  }

  res.status(status).json({ error: { status, message } });
};

module.exports = { notFound, errorHandler };
