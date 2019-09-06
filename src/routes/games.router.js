const router = require('express').Router(),
    Container = require('typedi').Container,
    validate = require('express-validation'),
    GamesValidator = Container.get('GamesValidator'),
    GamesController = Container.get('GamesController');

router.route('/games')
    .post(validate(GamesValidator.createGame()), (...args) => GamesController.createGame(...args));

module.exports = router;