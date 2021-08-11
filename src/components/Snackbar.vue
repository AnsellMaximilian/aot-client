<template>
  <div v-if="message && status" :class="['snackbar', status]">
    <span>{{ message }}</span>
    <span class="close-btn" @click="closeSnackbar">&times;</span>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    message: String,
    status: String,
  },
  methods: {
    closeSnackbar() {
      this.$emit("snackbar-set", null);
    },
  },
  emits: ["snackbarSet"],
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;

.snackbar {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  &.error {
    background-color: rgb(255, 161, 161);
    color: rgb(124, 0, 0);
  }
  &.success {
    background-color: rgb(91, 228, 57);
    color: rgb(21, 90, 36);
  }
  .close-btn {
    font-size: 1.25rem;
    margin-left: 1rem;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
