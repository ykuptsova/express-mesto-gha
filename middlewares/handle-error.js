const { GENERAL_ERROR } = require('../utils/errors');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || GENERAL_ERROR;
  const message = statusCode === GENERAL_ERROR
    ? 'Произошла ошибка'
    : err.message;
  res.status(statusCode).send({ message });
  next();
};
