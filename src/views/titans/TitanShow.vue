<template>
  <div v-if="titan" class="container">
    {{ titan.name }}
  </div>
  <Spinner v-else iconClass="fas fa-smile-beam" />
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "TitanShow",
  components: {
    Spinner,
  },
  async created() {
    console.log(this.$route.params.id);
    const res = await fetch(`/titans/${this.$route.params.id}`);
    const data = await res.json();
    if (res.ok) {
      this.titan = data;
      return;
    }
    console.log(data);
  },
  data() {
    return {
      titan: null,
    };
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
</style>
