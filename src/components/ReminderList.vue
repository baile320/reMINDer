<template>
  <div>
    <h1 class="display-5">Reminder List</h1>
      <ul
        class="list-group"
        v-for="reminder in filterRemindersByTag(searchTag)"
        v-bind:key="reminder._id"
      >
        <reminderListItem
          v-bind:reminder="reminder"
          v-on:reminderChange="$emit('reminderChange', reminder)"
          v-on:reminderDelete="$emit('reminderChange')"
          class="list-group-item mt-1"
        >
        </reminderListItem>
      </ul>
  </div>
</template>

<script>
import ReminderListItem from './ReminderListItem.vue';

export default {
  name: 'ReminderList',
  props: ['reminders', 'searchTag'],
  components: {
    ReminderListItem,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    filterRemindersByTag(tag) {
      return this.reminders.filter((reminder) => {
        if (tag === '') { return true; }
        return reminder.tags.includes(tag);
      });
    },
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
</style>
