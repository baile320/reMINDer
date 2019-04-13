import Vue from 'vue';
import Vuex from 'vuex';
import { getField } from 'vuex-map-fields';
import actions from './actions';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);

const getters = {
  getField,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
