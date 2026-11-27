// Хүсэлт бүрийн method, URL, status code, хугацааг Terminal дээр бүртгэнэ
function logger(req, res, next) {
  const startedAt = Date.now();

  res.on("finish", () => {
    const elapsed = Date.now() - startedAt;
    console.log(
      `${new Date().toISOString()} ${req.method} ` +
      `${req.originalUrl} ${res.statusCode} ${elapsed}ms`
    );
  });

  next();
}

module.exports = logger;