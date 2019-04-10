/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import auth0 from 'auth0-js';
import Vue from 'vue';

import { authConfig } from '../auth_config';

// exchange the object with your own from the setup step above.
const webAuth = new auth0.WebAuth({
  domain: 'dev-vxw7uzlp.auth0.com',
  redirectUri: 'https://tylerreminderapp.herokuapp.com/callback',
  clientID: process.env.CLIENT_ID,
  audience: 'https://tylerreminderapp.herokuapp.com/api',
  responseType: 'token id_token',
  scope: 'openid profile email',
});

const auth = new Vue({
  computed: {
    token: {
      get() {
        return localStorage.getItem('id_token');
      },
      set(id_token) {
        localStorage.setItem('id_token', id_token);
      },
    },
    accessToken: {
      get() {
        return localStorage.getItem('access_token');
      },
      set(accessToken) {
        localStorage.setItem('access_token', accessToken);
      },
    },
    expiresAt: {
      get() {
        return localStorage.getItem('expires_at');
      },
      set(expiresIn) {
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
      },
    },
    user: {
      get() {
        return JSON.parse(localStorage.getItem('user'));
      },
      set(user) {
        localStorage.setItem('user', JSON.stringify(user));
      },
    },
  },
  methods: {
    login() {
      webAuth.authorize();
    },
    logout() {
      return new Promise(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');
        webAuth.logout({
          returnTo: authConfig.logoutUri, // Allowed logout URL listed in dashboard
          clientID: authConfig.clientId, // Your client ID
        });
      });
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    },
    getAuthHeader() {
      return {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn;
            this.accessToken = authResult.accessToken;
            this.token = authResult.idToken;
            this.user = authResult.idTokenPayload;
            resolve();
          } else if (err) {
            this.logout();
            reject(err);
          }
        });
      });
    },
  },
});

export default {
  install(Vue) {
    Vue.prototype.$auth = auth;
  },
};
