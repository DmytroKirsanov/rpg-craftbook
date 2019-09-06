const router = require('express').Router(),
    Container = require('typedi').Container,
    validate = require('express-validation'),
    ItemsValidator = Container.get('ItemsValidator'),
    ItemsController = Container.get('ItemsController');

router.route('/items')
    .get(ItemsController.getItem);

module.exports = router;