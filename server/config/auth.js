const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
require('../../config');

exports.checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-vxw7uzlp.auth0.com/.well-known/jwks.json',
  }),
  audience: `${process.env.VUE_APP_AUD}/api/`,
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
