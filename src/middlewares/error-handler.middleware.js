module.exports = class ErrorHandlerMiddleware {
    constructor(container) {
        this.logger = container.get('logger');
        this.responseHelpers = container.get('responseHelpers');
    }

    handleError(err, req, res) {
        this.logger.error(err.message);
        switch (err.message) {
            case 'validation error':
                res.send(this.responseHelpers.validationErrorResponse(err));
                break;
            case 'invalid credentials':
                res.send(this.responseHelpers.invalidCredentialsResponse());
                break;
            case 'No authorization token was found':
                res.send(this.responseHelpers.unauthorizedResponse());
                break;
            case 'forbidden':
                res.send(this.responseHelpers.forbiddenResponse());
                break;
            default:
                res.send(this.responseHelpers.unexpectedErrorResponse());
        }
    }
};