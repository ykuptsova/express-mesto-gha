require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const handleError = require('./middlewares/handle-error');
const { login, createUser } = require('./controllers/users');
const { LINK } = require('./utils/regex');

// разбираем настройки окружения
const { PORT = 3000, NODE_ENV } = process.env;
if (NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'dev-secret';
}

// конфигурируем базу данных
mongoose.set('strictQuery', true);

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// создаем сервер
const app = express();

// разбираем body в json
app.use(express.json());

// добавляем руты
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(LINK),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/not-found'));

// обрабатываем ошибки централизованно
app.use(errors());
app.use(handleError);

// поднимаем сервер по порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
