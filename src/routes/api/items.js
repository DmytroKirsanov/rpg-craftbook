const router = require('express').Router();

router.get('/item', function(req, res) {
    res.send('Hi!');
    res.end();
});

module.exports = router;