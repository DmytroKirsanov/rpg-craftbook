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
            getToken: (req) => this.authHelper.getTokenFromHeaders(req),
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
};