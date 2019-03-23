<template>
  <form>
    <div class="form-group">
      <label for="reminderBody">Body</label>
      <textarea
        class="form-control"
        id="reminderBody"
        rows="4"
        placeholder="Add your reminder here... (required)"
        v-model="form.body"
      >
      </textarea>
    </div>
    <div class="form-group">
      <label for="reminderAuthor">Author</label>
      <input
        type="text"
        class="form-control"
        id="reminderAuthor"
        placeholder="Author (optional)"
        v-model="form.author"
      >
    </div>
    <div class="form-group">
      <label for="reminderSource">Source</label>
      <input
        type="text"
        class="form-control"
        id="reminderSource"
        placeholder="Source (optional)"
        v-model="form.source"
      >
    </div>
    <div class="form-group">
      <vue-tags-input
        class="form-group"
        v-model="form.tag"
        :tags="form.tags"
        @tags-changed="newTags => form.tags = newTags"
      />
    </div>
    <button
      type="button"
      class="btn btn-primary float-left"
      v-on:click="onSave"
    >
      Save
    </button>
    <button
      type="button"
      class="btn btn-danger float-right"
      v-on:click="onClear"
    >
      Clear
    </button>
  </form>
</template>

<script>
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";
import auth from "../auth";

export default {
  name: "EditReminder",
  components: {
    VueTagsInput,
  },
  data() {
    return {
      form: {
        body: "",
        author: "",
        source: "",
        tag: "",
        tags: [],
      }
    };
  },
  mounted() {
  },
  methods: {
    onSave(event) {
      const headers = {
        authorization: this.$auth.getAuthHeader().Authorization,
      }
      const submission = {
        body: this.$data.form.body,
        author: this.$data.form.author,
        source: this.$data.form.source,
        tags: this.$data.form.tags.map(el => el.text),
      }
      axios.post(`http://127.0.0.1:8081/api/users/${this.$auth.user.email}/reminders/`, submission, { headers })
        .then(() => {
          this.$emit('reminderChange')
          this.onClear();
        })
        .catch(err => console.log(err));
    },
    onClear() {
      const self = this;
      Object.keys(this.$data.form).forEach(function(key,index) {
          if (typeof self.$data.form[key] === 'string') {
            self.$data.form[key] = '';
          } else if (Array.isArray(self.$data.form[key])) {
            self.$data.form[key] = [];
          }
      });
    }
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
/* FIX THE TAGS STYLING */
.vue-tags-input {
  max-width: 100%;
}
.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
</style>
