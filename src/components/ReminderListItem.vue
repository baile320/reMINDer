<template>
  <div>
    <blockquote class="blockquote">
      {{reminder.body}}
      <!-- display full if author & source -->
      <cite
        class="blockquote-footer"
        v-if="reminder.author !== '' && reminder.source !== ''"
      >
        {{reminder.author}}, {{reminder.source}}
      </cite>
      <!-- don't display if whichever is provided -->
      <cite
        class="blockquote-footer"
        v-else-if="reminder.author !== '' || reminder.source !== ''"
      >
        {{reminder.author + reminder.source}}
      </cite>
      <!-- don't display if no author & no source -->
      <footer
        class="tags"
        v-if="reminder.tags.length > 0"
      >
        tags: {{reminder.tags.join(', ')}}
      </footer>
    </blockquote>
    <p class="">
      Sent Count: {{reminder.sentCount}}
      <br/>
      Last Sent: {{formatLastSent(reminder.lastSent)}}
    </p>
    <button
      type="button"
      class="btn btn-primary float-left"
      v-on:click="onEdit"
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
import moment from 'moment';

export default {
  name: 'ReminderListItem',
  props: ['reminder'],
  data() {
    return {
    };
  },
  methods: {
    formatLastSent(date) {
      return moment(date).fromNow();
    },
    onEdit() {
      this.$store.dispatch('editReminder', this.reminder._id);
    },
    onDelete() {
      const payload = {
        headers: { authorization: this.$auth.getAuthHeader().Authorization },
        email: this.$auth.user.email,
        _id: this.reminder._id,
      };
      this.$store.dispatch('deleteReminder', payload);
    },
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
