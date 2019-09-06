const express = require('express'),
    config = require('./src/config'),
    Container = require('typedi').Container;
    loader = require('./src/loaders');

function startServer() {
    const app = express();
    loader.load(app, config);
    const server = app.listen( config.port, function() {
        const logger = Container.get('logger');
        logger.info('RPG-CRAFTBOOK STARTED!!!');
        logger.info(`Environment mode: "${process.env.CRAFTBOOK_ENV || 'dev'}"`);
        logger.info(`Listening to port: ${server.address().port}`);
    });
}

startServer();