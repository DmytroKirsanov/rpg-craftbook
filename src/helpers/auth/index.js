const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    encryptPassword: (password, salt) => crypto.pbkdf2Sync(password.toString(), salt, 10000, 512, 'sha512').toString('hex'),

    validatePassword: (passwordToValidate, {password, salt}) => {
        return password === crypto.pbkdf2Sync(passwordToValidate.toString(), salt, 10000, 512, 'sha512').toString('hex');
    },

    generateSalt: () => {
        return crypto.randomBytes(16).toString('hex')
    },

    generateJWT: ({account_id, email, admin_level, locale}) => {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            id: account_id,
            email: email,
            aLevel: admin_level,
            locale,
            exp: parseInt(expirationDate.getTime() / 1000, 10)
        }, config.jwtSecret);
    },

    decodeJWT: (token) => {
        return jwt.verify(token, config.jwtSecret);
    },

    getTokenFromHeaders (req) {
        const { headers: { authorization } } = req;

        if(authorization && authorization.split(' ')[0] === 'Token') {
            return authorization.split(' ')[1];
        }
        return null;
    }
};