// const mongoose = require('mongoose');

// module.exports = mongoose.model('user', userSchema);

const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// подключаем мидлвары, роуты и всё остальное
