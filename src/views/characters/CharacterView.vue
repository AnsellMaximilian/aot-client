<template>
  <div class="container">
    <router-view @snackbar-set="onSnackbarSet" :user="user"></router-view>
  </div>
</template>

<script>
export default {
  name: "CharacterView",
  emits: ["snackbar-set"],
  props: {
    user: Object,
  },
  methods: {
    onSnackbarSet(snackbarMessage) {
      this.$emit("snackbar-set", snackbarMessage);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
.container {
  padding-top: 1rem;
}
</style>
