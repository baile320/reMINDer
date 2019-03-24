<template>
  <form>
    <div class="form-group">
      <h5>Body</h5>
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
      <h5>Author</h5>
      <input
        type="text"
        class="form-control"
        id="reminderAuthor"
        placeholder="Author (optional)"
        v-model="form.author"
      >
    </div>
    <div class="form-group">
      <h5>Source</h5>
      <input
        type="text"
        class="form-control"
        id="reminderSource"
        placeholder="Source (optional)"
        v-model="form.source"
      >
    </div>
    <h5>Tags</h5>
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
import axios from 'axios';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'EditReminder',
  props: ['form'],
  components: {
    VueTagsInput,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    onSave() {
      const headers = {
        authorization: this.$auth.getAuthHeader().Authorization,
      };
      let submission = {
        body: this.form.body,
        author: this.form.author,
        source: this.form.source,
        tags: this.form.tags.map(el => el.text),
      };
      // if we pass in an id, we patch
      if (this.form._id !== '') {
        submission = { _id: this.form._id, ...submission };
        axios.patch(`http://127.0.0.1:8081/api/users/${this.$auth.user.email}/reminders/${this.form._id}`, submission, { headers })
          .then(() => {
            this.$emit('reminderChange');
            this.onClear();
          })
          .catch(err => console.log(err));
      } else {
      // else we post
        axios.post(`http://127.0.0.1:8081/api/users/${this.$auth.user.email}/reminders/`, submission, { headers })
          .then(() => {
            this.$emit('reminderChange');
            this.onClear();
          })
          .catch(err => console.log(err));
      }
    },
    onClear() {
      const self = this;
      Object.keys(this.form).forEach((key) => {
        if (typeof self.form[key] === 'string') {
          self.form[key] = '';
        } else if (Array.isArray(self.form[key])) {
          self.form[key] = [];
        }
      });
    },
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
