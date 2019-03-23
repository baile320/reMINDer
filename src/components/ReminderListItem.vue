<template>
  <div>
    {{reminder.body}}
  </div>
</template>

<script>

export default {
  name: "ReminderListItem",
  props: ["reminder"],
  components: {
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
</style>
