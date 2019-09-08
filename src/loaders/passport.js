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
        const user = await UserService.findByEmail(email);
        if (!user || !authHelpers.validatePassword(password, user)) {
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }

        return done(null, user);
    }));
};
