const dotenv = require('dotenv');

dotenv.config();

const authDomain = process.env.AUTH_DOMAIN || 'dev-vxw7uzlp';

module.exports.authConfig = {
  domain: authDomain,
  fullDomain: `${authDomain}.auth0.com`,
  clientId: 'usLDsrjOBiuUsEi1TV2Crh93Xn7kHhXv',
  redirectUri: `https://tylerreminderapp.herokuapp.com/callback`,
  aud: `https://tylerreminderapp.herokuapp.com/api`,
  logoutUri: `https://tylerreminderapp.herokuapp.com/`,
};
