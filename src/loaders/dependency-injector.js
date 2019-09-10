const Container = require('typedi').Container,
    joi = require('joi'),
    pgp = require('pg-promise')(),
    logger = require('./logger'),
    responseHelpers = require('../helpers/response'),
    authHelpers = require('../helpers/auth'),
    dbHelper = require('../helpers/db'),
    services = require('../services'),
    repositories = require('../repositories'),
    controllers = require('../controllers'),
    validators = require('../validators');

module.exports.injectDependencies = (config) => {
    const db = pgp(config.db);
    Container.set('pgp', pgp);
    Container.set('db', db);
    Container.set('logger', logger);
    Container.set('responseHelpers', responseHelpers);
    Container.set('authHelpers', authHelpers);
    Container.set('dbHelper', new dbHelper());
    Object.keys(repositories)
        .forEach(key => Container.set(key, new repositories[key](Container)));
    Object.keys(services)
        .forEach(key => Container.set(key, new services[key](Container)));
    Object.keys(controllers)
        .forEach(key => Container.set(key, new controllers[key](Container)));
    Object.keys(validators)
        .forEach(key => Container.set(key, new validators[key](joi, Container)));
};