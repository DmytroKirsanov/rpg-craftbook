const router = require('express').Router();

router.use('/api', require('./items.router'));
router.use('/api', require('./games.router'));

module.exports = router;