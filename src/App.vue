<template>
  <div id="nav">
    <Header :user="user" />
  </div>
  <router-view
    @logged-in="setUser"
    @snackbar-set="setSnackbar"
    :characters="characters"
  />
  <Snackbar
    v-if="snackbarMessage"
    @snackbar-set="setSnackbar"
    :message="snackbarMessage.message"
    :status="snackbarMessage.status"
  />
</template>

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "App",
  components: {
    Header,
    Snackbar,
  },
  async created() {
    const res = await fetch(
      "http://localhost:8000/api/tokens/get-user-from-token",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("aot_token")}`,
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      this.user = data;
      this.setSnackbar({
        message: `Logged in as ${data.name}`,
        status: "success",
      });
      return;
    }
    this.setSnackbar({
      message: "A login attempt has failed. Try logging in a from the form.",
      status: "error",
    });
  },

  methods: {
    setUser(user) {
      this.user = user;
    },
    setSnackbar(snackbarMessage) {
      this.snackbarMessage = snackbarMessage;
    },
  },
  data() {
    return {
      characters: [],
      user: null,
      snackbarMessage: null,
    };
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100%;
  background-color: #161111;
  color: white;
}

#nav {
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active,
    &.router-link-active {
      color: #e49631;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
