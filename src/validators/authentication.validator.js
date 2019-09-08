const jwt = require('express-jwt');
const config = require('../config');

module.exports = class AuthenticationValidator {

    constructor() {}

    requiredAuth() {
        return jwt({
            secret: config.jwtSecret,
            userProperty: 'payload',
            getToken: getTokenFromHeaders,
        })
    }

    noAuth() {
        return jwt({
            secret: config.jwtSecret,
            userProperty: 'payload',
            getToken: getTokenFromHeaders,
            credentialsRequired: false
        })
    }
};

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};