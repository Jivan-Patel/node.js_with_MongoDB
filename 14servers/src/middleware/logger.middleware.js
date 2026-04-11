function logger(req, res, next) {
  console.log('Middleware executed');
  next();
}

module.exports = logger;