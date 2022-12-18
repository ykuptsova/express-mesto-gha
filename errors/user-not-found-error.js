const { NOT_FOUND } = require('../utils/errors');

class UserNotFoundError extends Error {
  constructor(message) {
    super(message || 'Запрашиваемый пользователь не найден');
    this.statusCode = NOT_FOUND;
  }
}

module.exports = UserNotFoundError;
