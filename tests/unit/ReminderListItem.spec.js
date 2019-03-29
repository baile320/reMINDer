import { shallowMount } from '@vue/test-utils';
import ReminderListItem from '@/components/ReminderListItem.vue';
import reminders from '../utils/reminders';

describe('ReminderListItem.vue', () => {
  it('Displays a quote', () => {
    // const wrapper = shallowMount(ReminderListItem);
    console.log(reminders);
  });
  it('Displays author & source appropriately in all cases', () => {

  });
  it('Displays tags appropriately', () => {

  });
  it('Displays a quote', () => {

  });
  it('Contains an edit button', () => {

  });
  it('onEdit runs when Edit button is clicked', () => {
    // note: test of mutations etc in Vuex testing file
  });
  it('Contains a delete button', () => {

  });
  it('onDelete runs when Delete button is clicked', () => {
    // note: test of mutations etc in Vuex testing file
  });
});
