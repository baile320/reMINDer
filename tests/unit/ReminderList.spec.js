import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import ReminderList from '@/components/ReminderList.vue';
import ReminderListItem from '@/components/ReminderListItem.vue';
import reminders from '../utils/reminders';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ReminderList.vue', () => {

  it('renders the correct number of ReminderListItems', () => {
    const state = {
      reminders,
      searchTerm: '',
    };

    const store = new Vuex.Store({
      state,
    });
    const wrapper = mount(ReminderList, { store, localVue });
    expect(wrapper.findAll(ReminderListItem).length).toBe(reminders.length);
  });

  it('filters the ReminderListItems by a tag', () => {
    const state = {
      reminders,
      searchTerm: 'Law',
    };

    const store = new Vuex.Store({
      state,
    });
    const wrapper = mount(ReminderList, { store, localVue });
    const numReminders = reminders.filter(reminder => reminder.tags.includes('Law')).length
    expect(wrapper.findAll(ReminderListItem).length).toBe(numReminders);
  });
});
