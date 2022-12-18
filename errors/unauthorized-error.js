const { UNAUTHORIZED } = require('../utils/errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Необходима авторизация');
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
