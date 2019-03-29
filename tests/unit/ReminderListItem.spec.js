import { mount } from '@vue/test-utils';
import ReminderListItem from '@/components/ReminderListItem.vue';
import reminders from '../utils/reminders';

describe('ReminderListItem.vue', () => {
  const wrapper = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders.reminder1,
      },
    },
  });

  const wrapperNoAuthorNoTags = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders.reminder2,
      },
    },
  });

  const wrapperNoSource = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders.reminder3,
      },
    },
  });

  const wrapperNoAuthorNoSource = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders.reminder4,
      },
    },
  });

  it('Displays a quote', () => {
    expect(wrapper.find('blockquote').text())
      .toContain('Well as, one judge said to the other');
  });

  it('Displays author & source appropriately in all cases', () => {
    expect(wrapper.find('cite').text())
      .toContain('William S Burroughs, Naked Lunch');
    expect(wrapperNoAuthorNoTags.find('cite').text())
      .toContain('Naked Lunch');
    expect(wrapperNoSource.find('cite').text())
      .toContain('William S Burroughs');
    expect(wrapperNoAuthorNoSource.find('cite'))
      .toMatchObject({});
  });

  it('Displays tags appropriately', () => {
    expect(wrapper.find('footer').text())
      .toContain(reminders.reminder1.tags.join(', '));
    expect(wrapperNoAuthorNoTags.find('footer'))
      .toMatchObject({});
  });

  it('Contains an edit button', () => {
    expect(wrapper.find('button.btn-primary').text())
      .toContain('Edit');
  });

  it('Contains a delete button', () => {
    expect(wrapper.find('button.btn-danger').text())
      .toContain('Delete');
  });

  it('onDelete and onEdit run when clicked', () => {
    const deleteMock = jest.fn();
    const editMock = jest.fn();
    const wrapperNewMethods = mount(ReminderListItem, {
      propsData: {
        reminder: {
          ...reminders.reminder1,
        },
      },
      methods: {
        onEdit: editMock,
        onDelete: deleteMock,
      },
    });

    wrapperNewMethods.find('button.btn-primary').trigger('click');
    expect(editMock.mock.calls.length).toBe(1);

    wrapperNewMethods.find('button.btn-danger').trigger('click');
    expect(deleteMock.mock.calls.length).toBe(1);
  });
});
