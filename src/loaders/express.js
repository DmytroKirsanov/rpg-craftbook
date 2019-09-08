const bodyParser = require('body-parser'),
    cors = require('cors'),
    Container = require('typedi').Container,
    middlewares = require('../middlewares'),
    routes = require('../routes');

module.exports.loadExpress = (app) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(routes);
    app.use((err, req, res, next) => {
        new middlewares.ErrorHandlerMiddleware(Container).handleError(err, req, res, next)
    });
};