module.exports = class ItemsValidator {
    constructor(joi, container) {
        this.joi = joi;
    }

    createItem() {
        const joi = this.joi;
        return {
            body: {
                gameId: joi.number().positive().required(),
            }
        }
    }
};