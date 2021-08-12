<template>
  <div class="form-container">
    <h1>Edit</h1>
    <Spinner v-if="loadingOldData" :image="true" />

    <form v-else @submit="handleSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="form-group form-group-radio">
        <span>Gender</span>
        <div class="">
          <input type="radio" id="gender_male" value="male" v-model="gender" />
          <label for="gender_male">Male</label>
        </div>
        <div class="">
          <input
            type="radio"
            id="gender_female"
            value="female"
            v-model="gender"
          />
          <label for="gender_female">Female</label>
        </div>
      </div>
      <div class="form-group">
        <label for="picture">Picture</label>
        <input
          type="file"
          name="picture"
          id="picture"
          @change="handleFileChange"
        />
      </div>
      <div class="form-group">
        <button>Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
export default {
  name: "CharacterEdit",
  components: {
    Spinner,
  },
  data() {
    return {
      name: "",
      gender: "male",
      picture: null,
      loadingOldData: true,
    };
  },
  async created() {
    const res = await fetch(`/characters/${this.$route.params.id}`);
    const data = await res.json();
    if (res.ok) {
      this.name = data.name;
      this.gender = data.gender;
      this.loadingOldData = false;
      return;
    }
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      this.picture = file;
    },
    async handleSubmit(e) {
      e.preventDefault();
      const createData = new FormData();
      createData.append("name", this.name);
      createData.append("gender", this.gender);
      if (this.picture) {
        createData.append("picture", this.picture);
      }
      createData.append("_method", "PUT");
      console.log(createData.get("name"));
      const res = await fetch(`/characters/${this.$route.params.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("aot_token")}`,
        },
        body: createData,
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        this.$emit("snackbar-set", {
          message: "Edited character",
          status: "success",
        });

        return;
      }
      console.log(data);
      this.$emit("snackbar-set", { message: data.message, status: "error" });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
.form-container {
  width: 400px;
  max-width: 100%;
  background-color: $primary;
  margin: 2rem auto;
  padding: 1rem;
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
    &-radio {
      div,
      span {
        margin-bottom: 0.5rem;
      }
    }
    label {
      margin-bottom: 0.5rem;
    }
    input {
      padding: 0.5rem;
      font-size: 1rem;
    }
  }
  button {
    color: white;
    font-weight: bold;
    background-color: $secondary;
    padding: 1rem 2rem;
    border-radius: 10rem;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
