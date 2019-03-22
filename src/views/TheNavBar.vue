<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img src="../../public/favicon-32x32.png" width="40" height="40">
    </a>
    <div>
      <img :src="$auth.user.picture" width="30" height="30">
      <span class="text-muted font-weight-light px-2">{{$auth.user.name}}</span>
      <router-link to="/" class="btn btn-outline-secondary btn-sm">Home</router-link>
      <router-link to="/manage" class="btn btn-outline-secondary btn-sm ml-1">Manage</router-link>
      <router-link to="/logout" class="btn btn-outline-secondary btn-sm ml-1" @click="$auth.logout()">Logout</router-link>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return { };
  },
};
</script>
