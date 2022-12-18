const { NOT_FOUND } = require('../utils/errors');

class CardNotFoundError extends Error {
  constructor(message) {
    super(message || 'Карточка не найдена');
    this.statusCode = NOT_FOUND;
  }
}

module.exports = CardNotFoundError;
