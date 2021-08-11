<template>
  <div class="container">
    <h1>Characters</h1>
    <router-view @snackbar-set="onSnackbarSet"></router-view>
  </div>
</template>

<script>
export default {
  name: "CharacterView",
  emits: ["snackbar-set"],
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
</style>
