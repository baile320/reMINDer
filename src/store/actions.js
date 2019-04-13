import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const actions = {
  editReminder: ({ commit }, id) => {
    commit('EDIT_REMINDER', id);
  },
  formSubmit: ({ commit, state }, payload) => {
    const {
      headers,
      email,
    } = payload;

    const submission = {
      body: state.form.body,
      author: state.form.author,
      source: state.form.source,
      tags: state.form.tags.map(el => el.text),
    };
    const { _id } = state.form;

    // send form to api (if edit, we include ID and patch, else post)
    if (_id !== '') {
      submission._id = _id;
      axios.patch(`${process.env.VUE_APP_URI}/api/users/${email}/reminders/${_id}`, submission, { headers })
        .then((response) => {
          commit('FETCH_REMINDERS', response.data.reminders);
          commit('CLEAR_FORM');
        })
        .catch(err => console.log(err));
    } else {
      axios.post(`${process.env.VUE_APP_URI}/api/users/${email}/reminders/`, submission, { headers })
        .then((response) => {
          commit('FETCH_REMINDERS', response.data.reminders);
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
    axios.delete(`${process.env.VUE_APP_URI}/api/users/${payload.email}/reminders/${_id}`, { headers })
    // delete from state
      .then(() => commit('DELETE_REMINDER', _id))
      .catch(err => console.log(err));
  },
  fetchReminders: ({ commit }, payload) => {
    const { headers } = payload;
    axios.get(`${process.env.VUE_APP_URI}/api/users/${payload.email}/reminders`, { headers })
      .then((response) => {
        commit('FETCH_REMINDERS', response.data.reminders);
      })
      .catch(err => console.log(err));
  },
  clearForm: ({ commit }) => {
    commit('CLEAR_FORM');
  },
};

export default actions;
