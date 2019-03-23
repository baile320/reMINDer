<template>
  <div class="dashboard">
    <TheNavBar></TheNavBar>
    <div class="container">
      <h1 class="display-5">Search</h1>
      <textarea>placeholder</textarea>
      <ReminderList
        v-bind:reminders="reminders"
      >
      </ReminderList>
      <h1 class="display-5">Add</h1>
      <EditReminder
        @saved="onSave"
      ></EditReminder>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "../auth";
import TheNavBar from "./TheNavBar";
import EditReminder from "../components/EditReminder";
import ReminderList from "../components/ReminderList";

export default {
  name: "Manage",
  components: {
    TheNavBar,
    EditReminder,
    ReminderList
  },
  data() {
    return {
      reminders: [],
    };
  },
  mounted() {
    const headers = {
      authorization: this.$auth.getAuthHeader().Authorization,
    }
    axios.get(`http://127.0.0.1:8081/api/users/${this.$auth.user.email}/reminders`, { headers })
      .then(response => {
        const { reminders } = response.data;
        this.$data.reminders = reminders;
      })
      .catch(err => console.log(err));
  },
  methods: {
    onSave (reminder) {
      // this is horrible. fix this.
      const headers = {
        authorization: this.$auth.getAuthHeader().Authorization,
      }
      axios.get(`http://127.0.0.1:8081/api/users/${this.$auth.user.email}/reminders`, { headers })
        .then(response => {
          const { reminders } = response.data;
          this.$data.reminders = reminders;
        })
      .catch(err => console.log(err));
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
</style>
