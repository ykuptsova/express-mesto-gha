const mongoose = require('mongoose');
const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

// разбираем body в json
app.use(express.json());

// временное решение для авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '62d27b0c7b5bb11cf6325fcf',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/not-found'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
