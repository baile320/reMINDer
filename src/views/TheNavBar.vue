<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img src="../../public/favicon-32x32.png" width="40" height="40">
    </a>
    <div>
      <span class="text-muted font-weight-light px-2">{{this.$auth.isAuthenticated() ?  $auth.user.name : ''}}</span>
      <router-link to="/" class="btn btn-outline-secondary btn-sm">Home</router-link>
      <router-link to="/manage" class="btn btn-outline-secondary btn-sm ml-1">Manage</router-link>
      <button
        v-if="!this.$auth.isAuthenticated()"
        class="btn btn-outline-secondary btn-sm ml-1"
        @click.prevent="$auth.login()"
      >
        Login
      </button>
      <button
        v-if="this.$auth.isAuthenticated()"
        class="btn btn-outline-secondary btn-sm ml-1"
        @click.prevent="$auth.logout()"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'TheNavBar',
  data() {
    return { };
  },
};
</script>
