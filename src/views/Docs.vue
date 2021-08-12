<template>
  <div>
    <div class="container">
      <div :class="{ sidebar: true, open: sidebarOpen }">
        <div class="sidebar__toggle" @click="sidebarOpen = !sidebarOpen">
          <i class="fas fa-chevron-right"></i>
        </div>
        <ul>
          <li>
            <router-link to="#characters">Characters</router-link>
          </li>
          <li>
            <router-link to="#titans">Titans</router-link>
          </li>
          <li>
            <router-link to="#characters">Locations</router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <h1>Documentation <i class="fas fa-book"></i></h1>
        <div class="sections">
          <section id="characters">
            <h2>Characters</h2>
            <p>
              The endpoints for the characters are all prefixed with
              <code>/characters</code>, which is also the endpoint to get a list
              of all characters. The api for getting individual characters can
              be reached with <code>/characters/{id}</code>, where
              <code>id</code> is the id of the character.
            </p>
          </section>
          <section id="titans">
            <h2>Titans</h2>
            <p>
              The endpoints for the titans are all prefixed with
              <code>/titans</code>, which is also the endpoint to get a list of
              all titans. The api for getting individual titans can be reached
              with <code>/titans/{id}</code>, where <code>id</code> is the id of
              the titan.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docs",
  data() {
    return {
      sidebarOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;
$sidebar-width: 35px;
$sidebar-open-width: 125px;
$transition-duration: 0.25s;
h1 {
  margin: 1rem 0;
  font-size: 1.75rem;
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100%;
  position: relative;
  flex-grow: 1;

  .sidebar {
    background-color: $primary;
    width: $sidebar-width;
    transition: width $transition-duration;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    &__toggle {
      padding: 0.25rem;
      cursor: pointer;
      transition: transform $transition-duration;
    }
    ul {
      opacity: 0;
      text-align: left;
      li {
        a {
          padding: 0.5rem;
          display: block;
          text-decoration: none;
          width: 100%;
          color: inherit;
          &:hover {
            text-decoration: underline;
            color: $secondary;
          }
        }
      }
    }
    &.open {
      width: $sidebar-open-width;

      ul {
        opacity: 1;
      }
      .sidebar__toggle {
        transform: rotate(180deg);
        width: 3rem;
        margin-left: auto;
      }
    }
  }
  .content {
    margin-left: $sidebar-width;
    margin-bottom: 2rem;
    .sections {
      text-align: left;
      section {
        padding-left: 0.5rem;
        margin-top: 2rem;
      }
    }
  }
  @media screen and (min-width: 700px) {
    grid-template-columns: 200px 1fr;
    .content {
      margin-left: 0;
      h1 {
        font-size: 2rem;
      }
    }
    .sidebar,
    .sidebar.open {
      position: relative;
      width: 100%;
      &__toggle {
        display: none;
      }
      ul {
        opacity: 1;
        margin-top: 1rem;
      }
    }
  }
}
</style>
