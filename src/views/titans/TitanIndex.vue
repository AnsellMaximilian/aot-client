<template>
  <div class="header">
    <h1>Titans</h1>
    <router-link v-if="!!user && user.isAdmin" class="cta" to="/titans/create"
      >Create New</router-link
    >
  </div>
  <div class="list" v-if="titans.length > 0">
    <div class="card" v-for="titan in titans" :key="titan.id">
      <div class="card-header">
        <router-link :to="`/titans/${titan.id}`"> {{ titan.name }}</router-link>
      </div>
      <div class="card-body">
        <img :src="titan.picture_url" alt="" />
        <div class="info">
          <div>
            <span>Name:</span> <span>{{ titan.name }}</span>
          </div>
          <div>
            <span>Description:</span> <span>{{ titan.description }}</span>
          </div>
          <div>
            <span>Height:</span> <span>{{ titan.height_m }}</span>
          </div>
        </div>
        <div class="controls" v-if="!!user && user.isAdmin">
          <router-link :to="`/titans/${titan.id}/edit`" class="warning button"
            >Edit</router-link
          >
          <button class="danger" @click="deletetitan(titan.id)">Delete</button>
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
    async deletetitan(id) {
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
        this.titans = [];
        this.$emit("snackbar-set", {
          message: "Deleted titan",
          status: "success",
        });
        await this.fetchtitans();
        console.log(data);
        return;
      }
      this.$emit("snackbar-set", {
        message: data.message,
        status: "error",
      });
    },
    async fetchtitans() {
      const res = await fetch(process.env.VUE_APP_API_URL + "/titans");
      const data = await res.json();
      this.titans = data;
    },
  },

  async created() {
    this.fetchtitans();
  },
  data() {
    return {
      titans: [],
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
