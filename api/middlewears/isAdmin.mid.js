const createError = require('http-errors');

module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  } else {
    next(createError(403));
  }
}