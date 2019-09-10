module.exports = class ItemsController {

    constructor(container) {
    }

    getItem(req, res) {
        res.send('Hi!');
        res.end();
    }
};