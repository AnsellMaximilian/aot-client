<template>
  <div class="form-container">
    <h1>Login</h1>
    <form @submit="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <button>Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../../router/index";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const postData = { email: this.email, password: this.password };
      const res = await fetch(process.env.VUE_APP_API_URL +"/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("aot_token", data.token);
        this.$emit("logged-in", data.user);
        this.$emit("snackbar-set", {
          message: `Successfully logged in as a${
            data.user.isAdmin ? "n Admin." : " Guest"
          }`,
          status: "success",
        });
        router.push("/");
        return;
      }
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
