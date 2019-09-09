<template>
  <v-app>
    <v-app-bar app class="">
      <v-toolbar-title class="header-title">
        <span class="font-weight-light">Twitter API Demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="navbar">
        <v-btn text>
          <router-link class="nav-link" to="/">Home</router-link>
        </v-btn>
        <v-btn text>
          <router-link class="nav-link" to="/about">About</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    // tweets: []
  }),
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

#app,
body {
  font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1rem;
  font-size: 12px;
}

header {
  .header-title {
    font-size: 1.0rem;
    opacity: 0.7;
    letter-spacing: -0.5px;
  }

  .navbar {
    .nav-link {
      padding: .25rem;
      text-decoration: none !important;
    }
  }
}



button.theme--light {
  transition: background-color 0.5s ease;
  padding: 1em;
}
button.theme--light:hover {
  color: #fff;
  background: #7EBAE8 !important;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}

hr {
  border: 0;
  width: 80%;
  margin: 3rem auto;
  height: 2px;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.25);
}

.v-content {
  padding: 1em 0 !important;
}

.full-width {
  display: flex;
  position: relative;
  flex: 1 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
  flex-direction: column;
}

.v-card {
  box-shadow: none !important;
}

.v-toolbar__content {
  height: 46px !important;
  padding: 0px 10px;
}

.list-wrapper {
  margin: 0 1em !important;
  padding: .5em 2em;
}

.v-card__text {
  font-size: .75rem !important;
  line-height: 1.25rem !important;
  padding: 10px !important;
}
</style>
