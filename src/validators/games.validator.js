module.exports = class GamesValidator {
    constructor(joi, container) {
        this.joi = joi;
    }

    createGame() {
        return {
            body: {
                name: this.joi.string().max(30).alphanum().trim().required(),
                version: this.joi.string().max(30).trim().required()
            }
        }
    }
};