const errors = require('./errors');

module.exports = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(errors.INCCORECT_DATA).send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(errors.GENERAL_ERROR).send({ message: 'Произошла ошибка' });
  }
};
