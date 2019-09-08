const Container = require('typedi').Container;
const router = require('express').Router();
const AuthController = Container.get('AuthController');
const AuthenticationValidator = Container.get('AuthenticationValidator');

router.post('/', AuthenticationValidator.noAuth(), (...args) => AuthController.register(...args));

router.post('/login', AuthenticationValidator.noAuth(), (...args) => AuthController.login(...args));

// Test route
router.get('/current/:email',
    AuthenticationValidator.requiredAuth(),
    (...args) => AuthController.getAuthed(...args));

module.exports = router;