<template>
  <div class="dashboard">
    <TheNavBar></TheNavBar>
    <div class="container">
      <h1 class="display-5">Search</h1>
      <textarea
        class="form-control"
        v-model="searchTerm"
        id="search"
        rows="1"
        placeholder="Search"
      >
      </textarea>
      <ReminderList></ReminderList>
      <h1 class="display-5">Add</h1>
      <EditReminder></EditReminder>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import TheNavBar from './TheNavBar.vue';
import EditReminder from '../components/EditReminder.vue';
import ReminderList from '../components/ReminderList.vue';

export default {
  name: 'Manage',
  components: {
    TheNavBar,
    EditReminder,
    ReminderList,
  },
  data() {
    return {
    };
  },
  created() {
    const payload = {
      headers: { authorization: this.$auth.getAuthHeader().Authorization },
      email: this.$auth.user.email,
    };
    this.$store.dispatch('fetchReminders', payload);
  },
  computed: {
    ...mapFields([
      'searchTerm',
    ]),
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
</style>
