const router = require('express').Router();
const errors = require('../utils/errors');

router.all('*', (req, res) => {
  res.status(errors.NOT_FOUND).send({ message: 'Путь не найден' });
});

module.exports = router;
