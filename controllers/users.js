const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');
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
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    res.status(errors.BAD_REQUEST).send({ message: 'Поля email и password обязательны' });
    return;
  }

  if (password.length < 8) {
    res.status(errors.BAD_REQUEST).send({ message: 'Пароль должен быть от 8-ми символов' });
    return;
  }

  if (!isEmail(email)) {
    res.status(errors.BAD_REQUEST).send({ message: 'Некорректный email' });
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => handleError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return false;
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        res.status(errors.INCORRECT_CREDENTIALS).send({ message: 'Неправильные почта или пароль' });
        return;
      }
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: userId },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
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
