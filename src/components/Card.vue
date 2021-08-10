<template>
  <div>
    <div class="card">
      <div class="card-header"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  prpps: {
    items: Array,
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
  max-width: 100%;
}
</style>
