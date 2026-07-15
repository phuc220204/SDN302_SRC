// 404 cho route không tồn tại
const notFound = (req, res, next) => {
  const err = new Error(`Not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

// Error handler cuối chuỗi: dịch lỗi Mongoose sang status code đúng
const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    // vi phạm required/min/max trong schema -> lỗi phía client
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  } else if (err.code === 11000) {
    // vi phạm unique index (E11000)
    status = 400;
    message = `Duplicate value for: ${Object.keys(err.keyValue || {}).join(', ')}`;
  } else if (err.name === 'CastError') {
    // :id sai định dạng ObjectId
    status = 400;
    message = `Invalid id: ${err.value}`;
  }

  // LƯU Ý: res.status(...) là HÀM, không phải res.status = ...
  res.status(status).json({ error: { status, message } });
};

module.exports = { notFound, errorHandler };
