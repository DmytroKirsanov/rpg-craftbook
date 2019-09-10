const jwt = require('express-jwt');
const config = require('../config');

module.exports = class AuthenticationValidator {

    constructor(joi, container) {
        this.authHelpers = container.get('authHelpers');
        this.joi = joi;
    }

    requiredAuth() {
        return jwt({
            secret: config.jwtSecret,
            userProperty: 'payload',
            getToken: (req) => this.authHelpers.getTokenFromHeaders(req)
        })
    }

    noAuth() {
        return jwt({
            secret: config.jwtSecret,
            userProperty: 'payload',
            getToken: (req) => this.authHelpers.getTokenFromHeaders(req),
            credentialsRequired: false
        })
    }

    credentials() {
        return {
            body: {
                email: this.joi.string().email().trim().required(),
                password: this.joi.string().min(6).required()
            }
        }
    }

    isAdmin(levelRequired) {
        return (req, res, next) => {
            const token = this.authHelpers.getTokenFromHeaders(req);
            levelRequired = levelRequired || 1;
            try {
                const {aLevel} = this.authHelpers.decodeJWT(token);
                aLevel >= levelRequired ? next() : next(new Error('forbidden'))
            } catch (e) {
                next(e);
            }
        }
    }
};