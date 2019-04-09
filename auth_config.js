const dotenv = require('dotenv');

dotenv.config();

const url = process.env.URI || 'localhost';
const apiPort = process.env.PORT || process.env.API_PORT;
const hostPort = process.env.PORT || process.env.HOST_PORT;
const clientId = process.env.CLIENT_ID || 'usLDsrjOBiuUsEi1TV2Crh93Xn7kHhXv';
const authDomain = process.env.AUTH_DOMAIN || 'dev-vxw7uzlp';

module.exports.authConfig = {
  domain: authDomain,
  fullDomain: `${authDomain}.auth0.com`,
  clientId,
  redirectUri: `${process.env.URI}/callback`,
  aud: `${process.env.URI}/api/`,
  logoutUri: `${process.env.URI}/logout`,
};
