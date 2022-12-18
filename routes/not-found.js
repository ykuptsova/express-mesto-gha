const router = require('express').Router();
const RouteNotFoundError = require('../errors/route-not-found-error');

router.all('*', (req, res, next) => {
  next(new RouteNotFoundError());
});

module.exports = router;
