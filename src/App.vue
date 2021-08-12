<template>
  <div class="main-content">
    <div>
      <div id="nav">
        <Header :user="user" @logged-out="logOut" />
      </div>
      <router-view
        @logged-in="setUser"
        @snackbar-set="setSnackbar"
        :characters="characters"
        :user="user"
      />
    </div>
    <footer>
      <div>
        <i class="fab fa-github"></i>
        Made by
        <a href="https://ansellmaximilian.github.io">Ansell Maximilian</a>
      </div>
    </footer>
  </div>
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
    const authToken = localStorage.getItem("aot_token");
    // If there's an auth token in local storage, attempt to log in user.
    if (authToken) {
      const res = await fetch(
        "http://localhost:8000/api/tokens/get-user-from-token",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
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
    }
  },

  methods: {
    setUser(user) {
      this.user = user;
    },
    setSnackbar(snackbarMessage) {
      this.snackbarMessage = snackbarMessage;
    },
    logOut() {
      this.user = null;
      localStorage.removeItem("aot_token");
      this.setSnackbar({
        message: "Sucessfully logged out.",
        status: "success",
      });
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
$primary: #2a1d1d;
$secondary: #e49631;
* {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
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
.cta {
  padding: 1rem 2rem;
  font-weight: bold;
  border: none;
  color: white;
  border-radius: 10rem;
  background-color: $primary;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
footer {
  background-color: $secondary;
  color: white;
  padding: 2rem;
  font-size: 1.15rem;
  a {
    color: $primary;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
}

.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
