const Container = require('typedi').Container,
    db = require('pg-promise'),
    services = require('../services'),
    repositories = require('../repositories');

module.exports.injectDependencies = (config) => {
    const pgp = db()(config.db);
    Container.set('pgp', pgp);
    Object.keys(repositories)
        .forEach(key => Container.set(key, new repositories[key](pgp)));
    Object.keys(services)
        .forEach(key => Container.set(key, new services[key](Container)));

};