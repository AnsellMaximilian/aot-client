<template>
  <div v-if="character" class="container">
    {{ character.name }}
  </div>
</template>

<script>
export default {
  name: "CharacterShow",
  async created() {
    const res = await fetch(
      `http://localhost:8000/api/characters/${this.$route.params.id}`
    );
    const data = await res.json();
    console.log(data);
    this.character = data;
  },
  data() {
    return {
      character: null,
    };
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
</style>
