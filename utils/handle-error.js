module.exports = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
