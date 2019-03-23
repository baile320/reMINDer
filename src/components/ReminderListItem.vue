<template>
  <div>
    <blockquote class="blockquote">
      {{reminder.body}}
      <cite class="blockquote-footer">{{reminder.author}}, {{reminder.source}}</cite>
      <footer class="tags">tags: {{reminder.tags.join(', ')}}</footer>
    </blockquote>
    <button
      type="button"
      class="btn btn-primary float-left"
      v-on:click="onSave"
    >
      Edit
    </button>
    <button
      type="button"
      class="btn btn-danger float-right"
      v-on:click="onDelete"
    >
      Delete
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth';

export default {
  name: "ReminderListItem",
  props: ["reminder"],
  components: {
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    onDelete() {
      const headers = {
        authorization: this.$auth.getAuthHeader().Authorization,
      }
      axios.delete(
        `http://127.0.0.1:8081/api/users/${this.$auth.user.email}/reminders/${this.reminder._id}`,
        { headers })
          .then(() => this.$emit('reminderDelete'))
          .catch(err => console.log(err));
      },
    onSave() {
      this.$emit('reminderChange', this.reminder._id);
    }
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
.tags {
  font-size: 0.75em;
}
</style>
