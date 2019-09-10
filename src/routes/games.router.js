const router = require('express').Router(),
    Container = require('typedi').Container,
    validate = require('express-validation'),
    GamesValidator = Container.get('GamesValidator'),
    GamesController = Container.get('GamesController');
const AuthenticationValidator = Container.get('AuthenticationValidator');

router.route('/games')
    .get(AuthenticationValidator.requiredAuth(),
        AuthenticationValidator.isAdmin(),
        (...args) => GamesController.getGames(...args))
    .post(validate(GamesValidator.createGame()), (...args) => GamesController.createGame(...args));

module.exports = router;