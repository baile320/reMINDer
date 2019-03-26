<template>
  <div>
    <h1 class="display-5">Reminder List</h1>
      <ul
        class="list-group"
        v-for="(reminder) in this.$store.state.reminders"
        v-bind:key="reminder._id"
      >
        <reminderListItem
          v-bind:reminder="reminder"
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
      return this.$store.state.reminders.filter((reminder) => {
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
