const { INCORRECT_CREDENTIALS } = require('../utils/errors');

class IncorrectCredentialsError extends Error {
  constructor(message) {
    super(message || 'Неправильные почта или пароль');
    this.statusCode = INCORRECT_CREDENTIALS;
  }
}

module.exports = IncorrectCredentialsError;
