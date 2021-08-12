<template>
  <div class="form-container">
    <h1>Create</h1>
    <form @submit="handleSubmit" enctype="multipart/form-data">
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
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          v-model="description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="name">Height</label>
        <input
          type="number"
          name="height"
          id="height"
          placeholder="Height in meters"
          v-model="height"
        />
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
export default {
  name: "TitanCreate",
  data() {
    return {
      name: "",
      picture: null,
      height: 0,
      description: "",
    };
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
      createData.append("height_m", this.height);
      createData.append("description", this.description);
      if (this.picture) {
        createData.append("picture", this.picture);
      }
      console.log(createData.get("name"));
      const res = await fetch(process.env.VUE_APP_API_URL +"/titans", {
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
        this.$emit("snackbar-set", {
          message: "Created titan",
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
    input,
    textarea {
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
