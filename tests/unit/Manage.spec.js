import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Manage from '@/views/Manage.vue';
import ReminderList from '@/components/ReminderList.vue';
import ReminderListItem from '@/components/ReminderListItem.vue';
import TheNavBar from '@/views/TheNavBar.vue';
import EditReminder from '@/components/EditReminder.vue';

import reminders from '../utils/reminders';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ReminderList.vue', () => {
  // it('should render the Nav Bar, a ReminderList, several Reminders, and EditReminder', () => {
  //   const state = {
  //     reminders,
  //     searchTerm: '',
  //   };

  //   const store = new Vuex.Store({
  //     state,
  //   });
  //   const wrapper = shallowMount(Manage, {
  //     methods: {
  //       fetchReminders: () => {},
  //     },
  //     store,
  //     localVue,
  //   });

  //   expect(wrapper.find(ReminderList).length).toBe(1);
  //   expect(wrapper.find(TheNavBar).length).toBe(1);
  //   expect(wrapper.findAll(EditReminder).length).toBe(1);
  //   expect(wrapper.findAll(ReminderListItem).length).toBe(reminders.length);
  // });

  it('should update the searchTerm item in store', () => {
  });
});
