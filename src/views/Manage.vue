<template>
  <div class="dashboard">
    <TheNavBar></TheNavBar>
    <div class="container">
      <h1 class="display-5">Search</h1>
      <textarea
        class="form-control"
        id="search"
        rows="1"
        placeholder="Search"
        v-model="searchTag"
      >
      </textarea>
      <ReminderList
        v-bind:reminders="reminders"
        v-bind:searchTag="searchTag"
        @reminderChange="onChange"
        @reminderDelete="onChange"
      >
      </ReminderList>
      <h1 class="display-5">Add</h1>
      <EditReminder
        @reminderChange="onChange"
        v-bind:form="form"
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
      searchTag: "",
      reminders: [],
      form: {
        _id: "",
        body: "",
        author: "",
        source: "",
        tag: "",
        tags: [],
      },
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
    onChange (reminder) {
      // if a reminder is provided, we put it in the edit form
      if (reminder) {
        this.$data.form._id = reminder._id;
        this.$data.form.body = reminder.body;
        this.$data.form.author = reminder.author;
        this.$data.form.source = reminder.source;
        // this is a hack to get the vue-tags-input library to work nicely
        this.$data.form.tags = reminder.tags.map(el => {
          return { text: el, tiClasses: "ti-valid" }
        });
      }
      // if we add or delete, we re-fetch the reminders
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
