const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');

dotenv.config();

const app = express();

// Apply Middlewares
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(history());

app.use(express.static('dist'));

// Apply Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Apply routes
require('./routes')(app);

module.exports = app;
