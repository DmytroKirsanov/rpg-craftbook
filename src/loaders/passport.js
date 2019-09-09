const passport = require('passport');
const LocalStrategy = require('passport-local');
const Container = require('typedi').Container;
const UserService = Container.get('UserService');
const authHelpers = Container.get('authHelpers');

module.exports.preparePassport = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await UserService.findByEmail(email);
            if (!user || !authHelpers.validatePassword(password, user)) {
                return done(new Error('invalid credentials'));
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }));
};
