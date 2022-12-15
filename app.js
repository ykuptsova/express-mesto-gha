require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { login, createUser } = require('./controllers/users');

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
  // useCreateIndex: true,
  // useFindAndModify: false,
});

// создаем сервер
const app = express();

// разбираем body в json
app.use(express.json());

// добавляем руты
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/not-found'));

// поднимаем сервер по порту
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
