const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');

dotenv.config();

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(history());

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-vxw7uzlp.auth0.com/.well-known/jwks.json',
  }),
  aud: 'http://localhost:8081/api/',
  issuer: 'https://dev-vxw7uzlp.auth0.com/',
  algorithms: ['RS256'],
});

// This route doesn't need authentication
app.get('/api/public', (req, res) => {
  console.log(req.url);
  console.log(req.headers);
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
  });
});

// This route need authentication
app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
  });
});

const checkScopes = jwtAuthz(['read:messages']);

app.get('/api/private-scoped', checkJwt, checkScopes, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
  });
});

module.exports = app;
