const router = require('express').Router();

router.use('/api', require('./items.router'));
router.use('/api', require('./games.router'));
router.use('/api/auth', require('./auth.router'));

module.exports = router;