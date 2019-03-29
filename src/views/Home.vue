<template>
  <div class="dashboard">
    <TheNavBar></TheNavBar>
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-4">Hello, {{$auth === undefined ? 'New User' : $auth.user.name}}!</h1>
        <hr class="my-4">
        <p class="lead">
        </p>
        <h1 class="display-5">reMINDer</h1>
        <p class="lead">
          A non-intrusive daily reminder app that leverages
          spaced repetition learning techniques.
        </p>
        <h3 class="display-5">Add</h3>
        <p class="lead">
          Simply add material quotes via the web portal, and voila! You'll soon
          be getting periodic e-mails with little gems of knowledge from yourself.
        </p>
        <blockquote class="blockquote">
        <p>This is a something you want to be reminded of, or maybe a motivational quote!</p>
          <cite class="blockquote-footer">This is the author of the quote, and the source</cite>
        </blockquote>
        <h3 class="display-5">Schedule</h3>
        <p class="lead">
            Set it and forget it! Determine how frequently you would like to
            receive notifications, and <strong>reMINDer</strong> will handle the rest.
        </p>
        <p class="lead">
            <strong>reMINDer</strong> will send you periodic e-mails sampling
            from your quotebase which you can then read (or ignore!)
            at your leisure.
        </p>
        <p class="lead">
            We keep track of how frequently a given quote is sent, and the last time
            it was sent, to ensure your daily reminders stay fresh and exciting.
            Don't forget, you have to begin to forget to remember!
        </p>
        <h3 class="display-5">Learn</h3>
        <p class="lead">
            Unlike common popular spaced repetition learning apps that require you
            to allocate time spent focused on the training, <strong>reMINDer</strong> lets
            you sit around and take things as they come!
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavBar from './TheNavBar.vue';

export default {
  name: 'Home',
  components: {
    TheNavBar,
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
.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
blockquote {
  border-left: 2px solid #000;
  padding-left: 10px;
}
</style>
