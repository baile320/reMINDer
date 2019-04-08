import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Callback from './views/Callback.vue';
import Manage from './views/Manage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
    },
  ],
});

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/callback' || router.app.$auth.isAuthenticated()) {
    return next();
  }
  router.app.$auth.login({ target: to.path });
});

export default router;
