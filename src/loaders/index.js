const injector = require('./dependency-injector');

module.exports.load = (app, config) => {
    injector.injectDependencies(config);
    require('./passport').preparePassport();
    require('./express').loadExpress(app);
};