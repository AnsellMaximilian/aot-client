<template>
  <div v-if="character" class="container">
    {{ character.name }}
  </div>
  <Spinner v-else iconClass="fas fa-smile-beam" />
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "CharacterShow",
  components: {
    Spinner,
  },
  async created() {
    const res = await fetch(`/characters/${this.$route.params.id}`);
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      this.character = data;
      return;
    }
    console.log(data);
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
