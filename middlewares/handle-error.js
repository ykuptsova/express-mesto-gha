const errors = require('../utils/errors');

module.exports = (err, req, res, next) => {
  if (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(errors.INCCORECT_DATA)
        .send({ message: 'Переданы некорректные данные' });
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
      res
        .status(errors.INCCORECT_DATA)
        .send({ message: 'Ресурс с таким ключем уже существует' });
    } else {
      res
        .status(errors.GENERAL_ERROR)
        .send({ message: 'Произошла ошибка' });
    }
  }
  next();
};
