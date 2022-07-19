const handleError = require('../utils/handle-error');
const Card = require('../models/card');

const sendNotFoundError = (res) => {
  res.status(404).send({ message: 'Карточка не найдена' });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const createdAt = Date.now();
  const owner = req.user._id;
  Card
    .create({
      name, link, owner, createdAt,
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card
    .remove({ _id: req.params.cardId })
    .then((deletedCard) => {
      if (deletedCard.deletedCount === 0) {
        sendNotFoundError(res);
      } else {
        res.send({ data: deletedCard });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      // добавить _id в массив, если его там нет
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        sendNotFoundError(res);
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      // убрать _id из массива
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        sendNotFoundError(res);
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => handleError(err, res));
};
