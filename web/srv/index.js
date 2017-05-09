let chalk = require('chalk');
let config = require('./config.json');
let express = require('express');
let app = require('./endpoints');

express.static.mime.define({'application/json': ['json']});

console.log("Starting Express App");
app.listen(config.express.port, function () {
    console.log('Started Server on Port ' 
        + config.express.port + '. ' 
        + chalk.blue('Have fun! :)')
    );
});