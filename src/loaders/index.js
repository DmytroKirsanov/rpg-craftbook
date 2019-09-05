const express = require('./express'),
    injector = require('./dependency-injector');

module.exports.load = (app, config) => {
    express.loadExpress(app);
    injector.injectDependencies(config);
};