<template>
  <div v-if="character" class="show-container">
    <h1>{{ character.name }}</h1>
    <div class="image-container">
      <img :src="character.picture_url" alt="" />
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
  <Spinner v-else :image="true" />
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import router from "@/router/index";

export default {
  name: "TitanShow",
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
        router.push("/characters");

        return;
      }
      this.$emit("snackbar-set", {
        message: data.message,
        status: "error",
      });
    },
  },
  components: {
    Spinner,
  },
  props: {
    user: Object,
  },
  async created() {
    console.log(this.user);
    const res = await fetch(process.env.VUE_APP_API_URL +`/characters/${this.$route.params.id}`);
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
.show-container {
  margin-bottom: 2rem;
  padding: 0 1rem;

  h1 {
    margin-bottom: 2rem;
  }
  .controls {
    padding: 1rem;
    display: flex;
    justify-content: center;
    button,
    .button {
      text-decoration: none;
      padding: 0.75rem 1.25rem;
      color: white;
      font-weight: bold;
      border-radius: 10rem;
      border: none;
      margin: 0 1rem;
      cursor: pointer;
      font-size: 1.25rem;
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
  .image-container {
    width: 400px;
    aspect-ratio: 1/1;
    max-width: 100%;
    margin: 0 auto;
    max-width: 100%;
    overflow: hidden;
    border-radius: 50%;
    border: 1rem solid white;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
