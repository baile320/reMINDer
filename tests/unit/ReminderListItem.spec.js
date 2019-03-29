import { mount } from '@vue/test-utils';
import ReminderListItem from '@/components/ReminderListItem.vue';
import reminders from '../utils/reminders';

describe('ReminderListItem.vue', () => {
  const wrapper = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders[0],
      },
    },
  });

  const wrapperNoAuthorNoTags = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders[1],
      },
    },
  });

  const wrapperNoSource = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders[2],
      },
    },
  });

  const wrapperNoAuthorNoSource = mount(ReminderListItem, {
    propsData: {
      reminder: {
        ...reminders[3],
      },
    },
  });

  it('displays a quote', () => {
    expect(wrapper.find('blockquote').text())
      .toContain('Well as, one judge said to the other');
  });

  it('displays author & source appropriately in all cases', () => {
    expect(wrapper.find('cite').text())
      .toContain('William S Burroughs, Naked Lunch');
    expect(wrapperNoAuthorNoTags.find('cite').text())
      .toContain('Naked Lunch');
    expect(wrapperNoSource.find('cite').text())
      .toContain('William S Burroughs');
    expect(wrapperNoAuthorNoSource.find('cite'))
      .toMatchObject({});
  });

  it('displays tags appropriately', () => {
    expect(wrapper.find('footer').text())
      .toContain(reminders[0].tags.join(', '));
    expect(wrapperNoAuthorNoTags.find('footer'))
      .toMatchObject({});
  });

  it('contains an edit button', () => {
    expect(wrapper.find('button.btn-primary').text())
      .toContain('Edit');
  });

  it('contains a delete button', () => {
    expect(wrapper.find('button.btn-danger').text())
      .toContain('Delete');
  });

  it('runs onDelete and onEdit when clicked', () => {
    const deleteMock = jest.fn();
    const editMock = jest.fn();
    const wrapperNewMethods = mount(ReminderListItem, {
      propsData: {
        reminder: {
          ...reminders[0],
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
