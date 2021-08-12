<template>
  <header>
    <div class="navbar">
      <div class="brand"><router-link to="/">Attack On Titan</router-link></div>
      <div class="nav">
        <ul>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/about">Titans</router-link></li>
          <!-- <li><router-link to="/locations">Locations</router-link></li> -->
        </ul>
        <ul class="auth-links">
          <!-- <li><router-link to="/">Sign Up</router-link></li> -->
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li v-else class="account-btn" @click="toggleAccountDropdown">
            <span>{{ user.name }}</span> <i class="fas fa-sort-down"></i>
            <div v-show="accountDropdownOpen" class="dropdown">
              <div class="close-btn" @click="toggleAccountDropdown">
                <span>&times;</span>
              </div>
              <ul>
                <li>My Account</li>
                <hr />
                <li @click="logOut">Logout</li>
              </ul>
            </div>
          </li>
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
  data() {
    return {
      accountDropdownOpen: false,
    };
  },
  methods: {
    toggleAccountDropdown(e) {
      e.stopPropagation();
      this.accountDropdownOpen = !this.accountDropdownOpen;
    },
    logOut(e) {
      e.stopPropagation();
      this.$emit("logged-out");
    },
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
      .account-btn {
        position: relative;
        cursor: pointer;
        .dropdown {
          padding: 1rem 0.5rem 0.5rem;
          background-color: white;
          color: $primary;
          position: absolute;
          width: 10rem;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 100%);
          border-radius: 0.5rem;
          .close-btn {
            margin-left: auto;
            font-size: 1.5rem;
            width: 2rem;
            height: 2rem;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
      & > ul {
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
