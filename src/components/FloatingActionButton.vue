<template>
  <div class="floating-action-btn">
    <i :class="[iconClass]"></i>
  </div>
</template>

<script>
export default {
  name: "FloatingActionButton",
  props: {
    iconClass: String,
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;

.floating-action-btn {
  background-color: $secondary;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1.25rem;
  box-shadow: 0.35rem 0.35rem 1rem rgba(39, 39, 39, 0.322);
  border-radius: 10rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
  }
}
</style>
