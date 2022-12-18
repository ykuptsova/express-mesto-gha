const { NOT_FOUND } = require('../utils/status-codes');

class RouteNotFoundError extends Error {
  constructor(message) {
    super(message || 'Путь не найден');
    this.statusCode = NOT_FOUND;
  }
}

module.exports = RouteNotFoundError;
