require('./config');

const authConfig = {
  domain: process.env.VUE_APP_AUTH_DOMAIN,
  fullDomain: `${process.env.VUE_APP_AUTH_DOMAIN}.auth0.com`,
  clientId: `${process.env.VUE_APP_CLIENT_ID}`,
  redirectUri: `${process.env.VUE_APP_URI}/callback`,
  aud: `${process.env.VUE_APP_AUD}/api/`,
  logoutUri: `${process.env.VUE_APP_URI}/`,
};

module.exports.authConfig = authConfig;
