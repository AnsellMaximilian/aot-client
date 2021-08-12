<template>
  <div class="home">
    <div class="hero">
      <div>
        <h1>Attack on Titan API</h1>
        <p>Get data for things Attack on Titan related.</p>
      </div>
      <router-link to="/docs" class="cta"> See the Docs </router-link>
    </div>
    <div class="container">
      <article class="api-item">
        <h2>Characters</h2>
        <div class="api-item__content">
          <div class="image-container">
            <img alt="character" src="../assets/character-default.png" />
          </div>
          <p>
            Get data for characters on Attack on Titan. The data is available
            through the <code>/characters</code> endpoint for all the
            characters, and <code>/characters/{id}</code> for individual
            individual characters--where <code>{id}</code> is the character's
            id.
          </p>
        </div>
      </article>
      <article class="api-item">
        <h2>Titans</h2>
        <div class="api-item__content">
          <div class="image-container">
            <img alt="character" src="../assets/titan-default.jpg" />
          </div>
          <p>
            Get data for titans on Attack on Titan. The data is available
            through the <code>/titans</code> endpoint for all the titans, and
            <code>/titans/{id}</code> for individual individual titans--where
            <code>{id}</code> is the titan's id.
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
$primary: #2a1d1d;
$secondary: #e49631;

.hero {
  h1 {
    margin: 0;
    font-size: 3rem;
  }
  p {
    margin: 0;
    font-size: 1.5rem;
  }
  background-color: $secondary;
  // color: $primary;
  color: white;
  padding: 3rem 1rem;
  .cta {
    padding: 1rem 2rem;
    font-weight: bold;
    border: none;
    color: white;
    border-radius: 10rem;
    background-color: $primary;
    cursor: pointer;
    display: inline-block;
    margin: 0 auto;
    margin-top: 1.5rem;
    text-decoration: none;
  }
}
.container {
  width: 1000px;
  max-width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

.api-item {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 0.25rem solid white;
  h2 {
    margin-bottom: 1.5rem;
  }
  &:last-child {
    border-bottom: 0;
  }

  &:nth-child(odd) {
    @media screen and (min-width: 700px) {
      p {
        margin-left: 1rem;
        text-align: left;
      }
    }
  }
  &:nth-child(even) {
    @media screen and (min-width: 700px) {
      p {
        margin-right: 1rem;
        text-align: right;
      }
      .image-container {
        order: 1;
      }
    }
  }

  .api-item__content {
    p {
      flex: 1 1;
      font-size: 1.15rem;
    }
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 700px) {
      flex-direction: row;

      .image-container {
        margin-bottom: 0;
      }
    }
  }
  .image-container {
    // flex: 1 1 initial;
    width: 17.5rem;
    height: 17.5rem;
    margin: 0 auto 1.5rem;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
