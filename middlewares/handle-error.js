const { GENERAL_ERROR, INCCORECT_DATA } = require('../utils/status-codes');

module.exports = (err, req, res, next) => {
  if (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(INCCORECT_DATA)
        .send({ message: 'Переданы некорректные данные' });
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
      res
        .status(INCCORECT_DATA)
        .send({ message: 'Ресурс с таким ключем уже существует' });
    } else {
      const statusCode = err.statusCode || GENERAL_ERROR;
      const message = statusCode === GENERAL_ERROR
        ? 'Произошла ошибка'
        : err.message;
      res
        .status(statusCode)
        .send({ message });
    }
  }
  next();
};
