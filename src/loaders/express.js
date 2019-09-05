const bodyParser = require('body-parser'),
    cors = require('cors'),
    routes = require('../routes');

module.exports.loadExpress = (app) => {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(routes);
};