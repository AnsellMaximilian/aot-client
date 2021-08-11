<template>
  <div class="spinner">
    <img v-if="image" src="../assets/sc-logo.png" alt="" />
    <i v-else :class="[iconClass]"></i>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    iconClass: String,
    image: String,
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;

.spinner {
  font-size: 3rem;
  margin: 3rem auto;
  animation: spin 1s linear infinite;
  img {
    width: 5rem;
    .img {
      width: 100%;
    }
  }
}
</style>
