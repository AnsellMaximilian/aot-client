<template>
  <div class="header">
    <h1>Characters</h1>
    <router-link
      v-if="!!user && user.isAdmin"
      class="cta"
      to="/characters/create"
      >Create New</router-link
    >
  </div>
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
        <div class="controls" v-if="!!user && user.isAdmin">
          <router-link
            :to="`/characters/${character.id}/edit`"
            class="warning button"
            >Edit</router-link
          >
          <button class="danger" @click="deleteCharacter(character.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-else :image="true" />
</template>

<script>
import Spinner from "@/components/Spinner.vue";
export default {
  name: "TitanIndex",
  components: {
    Spinner,
  },
  emits: ["snackbar-set"],
  methods: {
    async deleteCharacter(id) {
      const res = await fetch(process.env.VUE_APP_API_URL +`/characters/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("aot_token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        this.characters = [];
        this.$emit("snackbar-set", {
          message: "Deleted character",
          status: "success",
        });
        await this.fetchCharacters();
        console.log(data);
        return;
      }
      this.$emit("snackbar-set", {
        message: data.message,
        status: "error",
      });
    },
    async fetchCharacters() {
      const res = await fetch(process.env.VUE_APP_API_URL +"/characters");
      const data = await res.json();
      this.characters = data;
    },
  },

  async created() {
    this.fetchCharacters();
  },
  data() {
    return {
      characters: [],
    };
  },
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
.header {
  width: 1000px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 1rem;
  .cta {
    margin-top: 1rem;
    background-color: $secondary;
  }
  // display: flex;
  // justify-content: space-between;
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
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
      button,
      .button {
        text-decoration: none;
        padding: 0.5rem 1rem;
        color: white;
        font-weight: bold;
        border-radius: 10rem;
        border: none;
        margin-left: 1rem;
        cursor: pointer;
        &:hover {
          filter: brightness(0.9);
        }
        &:active {
          transform: scale(0.95);
        }
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
