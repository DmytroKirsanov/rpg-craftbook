const validationErrorResponse = require('./validation-error-response');
const unexpectedErrorResponse = require('./unexpected-error-responce');
const unauthorizedResponse = require('./unauthorized-error.response');
const invalidCredentialsResponse = require('./invalid-credentials-error.response');
const successResponse = require('./success.reponse');
const forbiddenResponse = require('./forbidden-error.response');
module.exports = {
    successResponse,
    validationErrorResponse,
    unexpectedErrorResponse,
    unauthorizedResponse,
    invalidCredentialsResponse,
    forbiddenResponse
};