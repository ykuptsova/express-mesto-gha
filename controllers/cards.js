const errors = require('../utils/errors');
const Card = require('../models/card');

const sendNotFoundError = (res) => {
  res.status(errors.NOT_FOUND).send({ message: 'Карточка не найдена' });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const createdAt = Date.now();
  const owner = req.user._id;
  Card
    .create({
      name, link, owner, createdAt,
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return sendNotFoundError(res);
      }
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(errors.UNAUTHORIZED)
          .send({ message: 'Необходима авторизация' });
      }
      return Card
        .findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => {
          if (deletedCard.deletedCount === 0) {
            sendNotFoundError(res);
          } else {
            res.send({ data: deletedCard });
          }
        });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
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
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
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
    .catch(next);
};
