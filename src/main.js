import Vue from 'vue';
import App from './App.vue';
import router from './router';
import auth from './auth';
import store from './store/index';

Vue.use(auth);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
