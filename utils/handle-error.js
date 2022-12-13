const errors = require('./errors');

module.exports = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(errors.INCCORECT_DATA).send({ message: 'Переданы некорректные данные' });
  } else if (err.name === 'MongoServerError' && err.message.startsWith('E11000 duplicate key error collection')) {
    res.status(errors.INCCORECT_DATA).send({ message: 'Ресурс с таким ключем уже существует' });
  } else {
    res.status(errors.GENERAL_ERROR).send({ message: 'Произошла ошибка' });
  }
};
