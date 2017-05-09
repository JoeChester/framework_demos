let config = require('./config.json');
let caminte = require('caminte');

let schema = new caminte.Schema(config.db.driver, config.db);

let Todo = require('./models/Todo')(schema);

module.exports = schema;