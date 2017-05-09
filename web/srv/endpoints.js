let config = require('./config.json');
let express = require('express');
let schema = require('./models');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();
app.use(bodyParser.json());
app.use(cors());

let Todos = require('./endpoints/todos');
app.use('/api/todos', Todos);

module.exports = app;