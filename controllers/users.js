const errors = require('../utils/errors');
const handleError = require('../utils/handle-error');
const User = require('../models/user');

const sendNotFoundError = (res) => {
  res.status(errors.NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  User.find({ _id: req.params.userId })
    .then((user) => {
      if (user.length === 0) {
        sendNotFoundError(res);
      } else {
        res.send({ data: user[0] });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        sendNotFoundError(res);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        sendNotFoundError(res);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => handleError(err, res));
};
