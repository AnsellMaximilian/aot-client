<template>
  <div id="nav">
    <Header :user="user" />
  </div>
  <router-view @logged-in="setUser" :characters="characters" />
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  created() {},

  methods: {
    setUser(user) {
      this.user = user;
    },
  },
  data() {
    return {
      characters: [],
      user: null,
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

    &.router-link-exact-active {
      color: #e49631;
    }
  }
}
</style>
