const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.URI || 'localhost';
const apiPort = process.env.API_PORT || 8080;

exports.checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-vxw7uzlp.auth0.com/.well-known/jwks.json',
  }),
  aud: `http://${url}:${apiPort}/api/`,
  issuer: 'https://dev-vxw7uzlp.auth0.com/',
  algorithms: ['RS256'],
});

exports.getUserInfo = (req, res, next) => {
  const { authorization } = req.headers;
  const headers = {
    authorization,
  };
  axios.get('https://dev-vxw7uzlp.auth0.com/userinfo', { headers })
    .then((response) => {
      res.locals.user = response.data;
    })
    .catch(err => console.log(err))
    .finally(data => next(null, data));
};
