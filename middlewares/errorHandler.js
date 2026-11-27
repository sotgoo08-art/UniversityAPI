// Алдааг нэг цэгт боловсруулна. Хамгийн сүүлд бүртгэнэ.
function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    message: statusCode === 500
      ? "Internal server error" // stack trace клиентэд буцаахгүй
      : err.message
  });
}

module.exports = { errorHandler };