<template>
  <div v-if="titan" class="show-container">
    <h1>{{ titan.name }}</h1>
    <div class="images">
      <div class="image-container">
        <img :src="titan.picture_url" alt="" />
      </div>
      <router-link
        :to="`/characters/${titan.shifter.id}`"
        v-if="titan.shifter"
        class="shifter-image-container"
      >
        <img :src="titan.shifter.picture_url" alt="" />
      </router-link>
    </div>
    <div class="info">
      {{ titan.description }}
    </div>
    <div class="controls" v-if="!!user && user.isAdmin">
      <router-link :to="`/titans/${titan.id}/edit`" class="warning button"
        >Edit</router-link
      >
      <button class="danger" @click="deleteTitan(titan.id)">Delete</button>
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
    async deleteTitan(id) {
      const res = await fetch(process.env.VUE_APP_API_URL + `/titans/${id}`, {
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
          message: "Deleted titan",
          status: "success",
        });
        router.push("/titans");

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
    const res = await fetch(
      process.env.VUE_APP_API_URL + `/titans/${this.$route.params.id}`
    );
    const data = await res.json();
    if (res.ok) {
      console.log(data);
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
.show-container {
  overflow: hidden;
  padding: 0 1rem;
  max-width: 100%;
  width: 950px;
  margin: 0 auto 2rem;

  h1 {
    margin-bottom: 2rem;
  }
  .info {
    margin-top: 2rem;
    font-size: 1.25rem;
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
  .images {
    position: relative;
    width: min-content;
    margin: 0 auto;
    max-width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    .image-container {
      width: 300px;
      height: 300px;
      position: relative;
      max-width: 100%;
      margin: 0 auto;
      max-width: 100%;
      overflow: hidden;
      border-radius: 50%;
      border: 1rem solid white;
      @media screen and (min-width: 700px) {
        width: 400px;
        height: 400px;
      }
    }
    .shifter-image-container {
      display: block;
      border-radius: 50%;
      position: absolute;
      border: 0.5rem solid $secondary;
      width: 40%;
      height: 40%;
      overflow: hidden;
      right: 0;
      top: 75%;
      transform: translate(15%, -50%);
      img {
        &:hover {
          filter: brightness(0.7);
        }
      }
    }
  }
}
</style>
