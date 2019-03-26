<template>
  <form>
    <div class="form-group">
      <h5>Body</h5>
      <textarea
        class="form-control"
        id="reminderBody"
        rows="4"
        placeholder="Add your reminder here... (required)"
        v-model="body"
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
        v-model="author"
      >
    </div>
    <div class="form-group">
      <h5>Source</h5>
      <input
        type="text"
        class="form-control"
        id="reminderSource"
        placeholder="Source (optional)"
        v-model="source"
      >
    </div>
    <h5>Tags</h5>
    <div class="form-group">
      <vue-tags-input
        class="form-group"
        v-model="tag"
        :tags="tags"
        @tags-changed="newTags => tags = newTags"
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
import { mapFields } from 'vuex-map-fields';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'EditReminder',
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
      const payload = {
        headers: { authorization: this.$auth.getAuthHeader().Authorization },
        submission: {
          body: this.$store.state.form.body,
          author: this.$store.state.form.author,
          source: this.$store.state.form.source,
          tags: this.$store.state.form.tags.map(el => el.text),
        },
        email: this.$auth.user.email,
        _id: this.$store.state.form._id,
      };
      this.$store.dispatch('formSubmit', payload);
    },
    onClear() {
      this.$store.dispatch('clearForm');
    },
  },
  computed: {
    ...mapFields([
      'form.body',
      'form.author',
      'form.source',
      'form.tag',
      'form.tags',
    ]),
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
