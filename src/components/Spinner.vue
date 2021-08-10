<template>
  <i :class="[iconClass, 'spinner']"></i>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    iconClass: String,
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;

.spinner {
  font-size: 3rem;
  margin-top: 3rem;
  animation: spin 1s linear infinite;
}
</style>
