<template>
  <header>
    <!-- <h1>Attack on Titan</h1> -->
    <div class="navbar">
      <div class="brand"><router-link to="/">Attack On Titan</router-link></div>
      <div class="nav">
        <ul>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/titans">Titans</router-link></li>
          <li><router-link to="/locations">Locations</router-link></li>
        </ul>
        <ul class="auth-links">
          <!-- <li><router-link to="/">Sign Up</router-link></li> -->
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li v-else>{{ user.name }}</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
header {
  h1 {
    margin: 0;
  }
  background-color: $primary;
  color: white;
  padding: 1rem;
  .navbar {
    display: flex;
    .brand {
      margin-right: 1rem;
      font-weight: bold;
    }
    .nav {
      flex-grow: 1;
      display: flex;
      .auth-links {
        margin-left: auto;
      }
      ul {
        display: flex;
        a {
          display: inline-block;
          margin-left: 0.75rem;
        }
      }
    }
  }
}
</style>
