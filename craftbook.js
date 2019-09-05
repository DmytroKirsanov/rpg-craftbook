const express = require('express'),
    config = require('./src/config'),
    loader = require('./src/loaders');

app = express();
loader.load(app, config);

const server = app.listen( config.port, function() {
    console.log('Listening on port ' + server.address().port);
});