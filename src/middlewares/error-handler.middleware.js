module.exports = class ErrorHandlerMiddleware {
    constructor(container) {
        this.logger = container.get('logger');
        this.responseHelpers = container.get('responseHelpers');
    }

    handleError(err, req, res, next) {
        this.logger.error(err.message);
        if (err.message === 'validation error') {
            return res.send(this.responseHelpers.validationErrorResponse(err));
        }
        res.send(this.responseHelpers.unexpectedErrorResponse());
    }
};