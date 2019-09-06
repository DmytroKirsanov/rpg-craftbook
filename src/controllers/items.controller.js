module.exports = class ItemsController {

    constructor(Container) {
    }

    getItem(req, res) {
        res.send('Hi!');
        res.end();
    }
};