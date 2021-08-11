<template>
  <div class="list" v-if="characters.length > 0">
    <div class="card" v-for="character in characters" :key="character.id">
      <div class="card-header">
        <router-link :to="`/characters/${character.id}`">
          {{ character.name }}</router-link
        >
      </div>
      <div class="card-body">
        <img :src="character.picture_url" alt="" />
        <div class="info">
          <div>
            <span>Full Name:</span> <span>{{ character.name }}</span>
          </div>
          <div>
            <span>Gender:</span> <span>{{ character.gender }}</span>
          </div>
        </div>
        <div class="controls">
          <button class="warning">Edit</button>
          <button class="danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-else :image="true" />
  <FloatingActionButton iconClass="fas fa-plus" />
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import FloatingActionButton from "@/components/FloatingActionButton.vue";
export default {
  name: "Header",
  components: {
    Spinner,
    FloatingActionButton,
  },
  emits: ["snackbar-set"],

  async created() {
    const res = await fetch("/characters");
    const data = await res.json();
    this.characters = data;
  },
  data() {
    return {
      characters: [],
    };
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}
.card {
  width: 250px;
  max-width: 100%;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  .card-header {
    background-color: $secondary;
    padding: 1rem;
    // color: $primary;
    font-weight: bold;
    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
      aspect-ratio: 1.5/1;
      display: block;
    }
    .info {
      background-color: $primary;
      padding: 1rem;
      text-align: left;
      flex-grow: 1;
      & > div {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
    .controls {
      background-color: $secondary;
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      button {
        padding: 0.5rem 1rem;
        color: white;
        font-weight: bold;
        border-radius: 10rem;
        border: none;
        margin-left: 1rem;
        &.danger {
          background-color: rgb(211, 0, 0);
        }
        &.warning {
          background-color: rgb(255, 208, 0);
        }
      }
    }
  }
}
</style>
