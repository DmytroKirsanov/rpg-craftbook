const Container = require('typedi').Container;
const router = require('express').Router();
const passport = require('passport');
const validate = require('express-validation');
const AuthController = Container.get('AuthController');
const AuthenticationValidator = Container.get('AuthenticationValidator');

router.post('/',
    validate(AuthenticationValidator.credentials()),
    (...args) => AuthController.register(...args));

router.post('/login',
    validate(AuthenticationValidator.credentials()),
    passport.authenticate('local', { session: false }),
    (...args) => AuthController.login(...args));

// Test route
router.get('/current/:email',
    AuthenticationValidator.requiredAuth(),
    (...args) => AuthController.getAuthed(...args));

module.exports = router;