<template>
  <form>
    <div class="form-group">
      <label for="reminderBody">Body</label>
      <textarea class="form-control" id="reminderBody" rows="4" placeholder="Add your reminder here... (required)"></textarea>
    </div>
    <div class="form-group">
      <label for="reminderAuthor">Author</label>
      <input type="text" class="form-control" id="reminderAuthor" placeholder="Author (optional)">
    </div>
    <div class="form-group">
      <label for="reminderSource">Source</label>
      <input type="text" class="form-control" id="reminderSource" placeholder="Source (optional)">
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import auth from '../auth';

export default {
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
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
</style>
