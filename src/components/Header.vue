<template>
  <header>
    <div class="navbar">
      <div class="brand"><router-link to="/">Attack On Titan</router-link></div>
      <div class="menu-btn" @click="navOpen = !navOpen">
        <span></span><span></span><span></span>
      </div>
      <div :class="{ nav: true, open: navOpen }">
        <ul>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/titans">Titans</router-link></li>
          <li><router-link to="/docs">Docs</router-link></li>
          <!-- <li><router-link to="/locations">Locations</router-link></li> -->
        </ul>
        <ul class="auth-links">
          <!-- <li><router-link to="/">Sign Up</router-link></li> -->
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li v-else class="account-btn" @click="toggleAccountDropdown">
            <span>{{ user.name }} <i class="fas fa-sort-down"></i></span>
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
      navOpen: false,
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
    flex-wrap: wrap;
    @media screen and (min-width: 700px) {
      flex-wrap: nowrap;
    }
    .menu-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      margin-left: auto;
      @media screen and (min-width: 700px) {
        display: none;
      }
      & > span {
        width: 1.75rem;
        height: 0.15rem;
        background-color: white;
        display: block;
      }
    }
    .brand {
      margin-right: 1rem;
      font-weight: bold;
    }
    .nav {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      @media screen and (min-width: 700px) {
        flex-wrap: nowrap;
        height: auto;
        width: auto;
      }
      // small
      width: 100%;
      height: 0;
      overflow: hidden;
      @media screen and (min-width: 700px) {
        overflow: visible;
      }
      &.open {
        height: auto;
        overflow: visible;
      }
      .auth-links {
        margin-left: auto;
      }
      .account-btn {
        position: relative;
        cursor: pointer;
        display: block;
        .dropdown {
          padding: 1rem 0.5rem 0.5rem;
          background-color: white;
          color: $primary;
          position: absolute;
          width: 10rem;
          bottom: 0;
          left: 0;
          transform: translate(0, 100%);
          border-radius: 0.5rem;
          z-index: 10000;
          color: rgba(0, 0, 0, 0.678);
          @media screen and (min-width: 700px) {
            bottom: 0;
            right: 0;
            transform: translate(0, 100%);
          }
          ul {
            li:hover {
              color: black;
            }
          }
          .close-btn {
            margin-left: auto;
            font-size: 1.5rem;
            width: 2rem;
            height: 2rem;
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              color: black;
            }
          }
        }
      }
      & > ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        @media screen and (min-width: 700px) {
          flex-wrap: nowrap;
          width: auto;
        }
        li {
          width: 100%;
          text-align: left;
        }
        a,
        span {
          display: inline-block;
          width: 100%;
          padding: 0.5rem 0;
          @media screen and (min-width: 700px) {
            margin-left: 0.75rem;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
