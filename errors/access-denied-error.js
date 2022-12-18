const { UNAUTHORIZED } = require('../utils/status-codes');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message || 'Отказано в доступе');
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AccessDeniedError;
