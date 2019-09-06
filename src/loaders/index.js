const injector = require('./dependency-injector');

module.exports.load = (app, config) => {
    injector.injectDependencies(config);
    require('./express').loadExpress(app);
};