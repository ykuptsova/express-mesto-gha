const Card = require('../models/card');

const CardNotFoundError = require('../errors/card-not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({
      name, link, owner,
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }
      if (card.owner.toString() !== req.user._id) {
        throw new UnauthorizedError();
      }
      return Card
        .findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send({ data: deletedCard }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      // добавить _id в массив, если его там нет
      { $addToSet: { likes: req.user._id } },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }
      res.send({ data: card });
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }
      res.send({ data: card });
    })
    .catch(next);
};
