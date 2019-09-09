const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    encryptPassword: (password, salt) => crypto.pbkdf2Sync(password.toString(), salt, 10000, 512, 'sha512').toString('hex'),
    validatePassword: (validatedPassword, {password, salt}) => {
        return password === crypto.pbkdf2Sync(validatedPassword.toString(), salt, 10000, 512, 'sha512').toString('hex');
    },
    generateSalt: () => {
        return crypto.randomBytes(16).toString('hex')
    },
    generateJWT: ({id, email}) => {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: email,
            id: id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, config.jwtSecret);
    },

    getTokenFromHeaders (req) {
        const { headers: { authorization } } = req;

        if(authorization && authorization.split(' ')[0] === 'Token') {
            return authorization.split(' ')[1];
        }
        return null;
    }
};