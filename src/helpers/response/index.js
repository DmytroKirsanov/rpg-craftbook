const validationErrorResponse = require('./validation-error-response');
const unexpectedErrorResponse = require('./unexpected-error-responce');
const unauthorizedResponse = require('./unauthorized-error.response');
const invalidCredentialsResponse = require('./invalid-credentials-error.response');
module.exports = {
    validationErrorResponse,
    unexpectedErrorResponse,
    unauthorizedResponse,
    invalidCredentialsResponse
};