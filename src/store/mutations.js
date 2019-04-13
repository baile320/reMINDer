/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { VueTagsInput, createTags } from '@johmun/vue-tags-input';
import { getField, updateField } from 'vuex-map-fields';
import { state } from './state';

const mutations = {
  DELETE_REMINDER(state, id) {
    // delete reminder id from state.reminders
    for (let i = 0; i < state.reminders.length; i += 1) {
      if (state.reminders[i]._id === id) {
        state.reminders.splice(i, 1);
      }
    }
  },
  EDIT_REMINDER(state, id) {
    for (let i = 0; i < state.reminders.length; i += 1) {
      if (state.reminders[i]._id === id) {
        state.form._id = state.reminders[i]._id;
        state.form.body = state.reminders[i].body;
        state.form.author = state.reminders[i].author;
        state.form.source = state.reminders[i].source;
        state.form.tag = state.reminders[i].tag;
        if (state.reminders[i].tags[0] !== null) {
          state.form.tags = createTags(state.reminders[i].tags);
        } else {
          state.form.tags = createTags([]);
        }
      }
    }
  },
  FETCH_REMINDERS(state, reminders) {
    state.reminders = [];
    state.reminders.push(...reminders);
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

export default mutations;
