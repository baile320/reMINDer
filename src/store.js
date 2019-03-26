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

const actions = {
  formSubmit: ({ commit }, payload) => {
    const {
      headers,
      _id,
      email,
      submission,
    } = payload;

    // send form to api (if edit, we include ID and patch, else post)
    if (_id !== '') {
      submission._id = _id;
      axios.patch(`http://127.0.0.1:8081/api/users/${email}/reminders/${_id}`, submission, { headers })
        .then((response) => {
          console.log(response);
          commit('CLEAR_FORM');
        })
        .catch(err => console.log(err));
    } else {
      axios.post(`http://127.0.0.1:8081/api/users/${email}/reminders/`, submission, { headers })
        .then((response) => {
          console.log(response);
          commit('CLEAR_FORM');
        })
        .catch(err => console.log(err));
    }
    // send form contents/response to reminders array
    // clear submitted form
  },
  deleteReminder: ({ commit }, payload) => {
    const { headers, _id } = payload;
    // delete fom mongodb
    console.log(_id);
    axios.delete(`http://127.0.0.1:8081/api/users/${payload.email}/reminders/${_id}`, { headers })
    // delete from state
      .then(() => commit('DELETE_REMINDER'))
      .catch(err => console.log(err));
  },
  fetchReminders: ({ commit }, payload) => {
    const { headers } = payload;
    axios.get(`http://127.0.0.1:8081/api/users/${payload.email}/reminders`, { headers })
      .then((response) => {
        commit('FETCH_REMINDERS', response.data.reminders);
      })
      .catch(err => console.log(err));
  },
  clearForm: ({ commit }) => {
    commit('CLEAR_FORM');
  },
};

const getters = {
  getField,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
