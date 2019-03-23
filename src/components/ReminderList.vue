<template>
  <div>
    <h1 class="display-5">Reminder List</h1>
    <ul>
      <li v-for="reminder in reminders" v-bind:key="reminder._id">
        <reminderListItem v-bind:reminder="reminder"></reminderListItem>
      </li>
    </ul>
  </div>
</template>

<script>
import ReminderListItem from "../components/ReminderListItem";

export default {
  name: "ReminderList",
  props: ["reminders"],
  components: {
    ReminderListItem
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
</style>
