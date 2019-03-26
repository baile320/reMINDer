/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);

const state = {
  searchTerm: '',
  reminders: [],
  form: {
    _id: '',
    body: '',
    author: '',
    source: '',
    tag: '',
    tags: [],
  },
};

const mutations = {
  DELETE_REMINDER(state, id) {
    // delete reminder id from state.reminders
    for (let i = 0; i < state.reminders.length; i += 1) {
      if (state.reminders[i]._id === id) {
        state.reminders[i].splice(i, 1);
      }
    }
  },
  FETCH_REMINDERS(state, reminders) {
    state.reminders = reminders;
  },
  ADD_REMINDER(state, newReminder) {
    state.reminders.push(newReminder);
  },
  CLEAR_FORM(state) {
    state.form._id = '';
    state.form.body = '';
    state.form.author = '';
    state.form.source = '';
    state.form.tag = '';
    state.form.tags = [];
  },
  updateField,
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  formSubmit: ({ commit }) => {
    // send form to api (if edit, we include ID, else not)
    // send form contents/response to reminders array
    // clear submitted form
  },
  deleteReminder: ({ commit, id }) => {
    // delete from state
    // delete fom mongodb
  },
  fetchReminders: ({ commit }, payload) => {
    const { headers } = payload;
    axios.get(`http://127.0.0.1:8081/api/users/${payload.email}/reminders`, { headers })
      .then((response) => {
        commit('FETCH_REMINDERS', response.data.reminders);
      })
      .catch(err => console.log(err));
  },
};

// getters are functions
const getters = {
  getField,
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
