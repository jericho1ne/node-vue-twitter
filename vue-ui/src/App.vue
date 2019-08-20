<template>
  <v-app>
    <v-app-bar app class="">
      <v-toolbar-title class="text-uppercase">
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


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

#app,
body {
  font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1rem;
}

ul#navlinks {
  list-style-type: none;
  display: inline-flex;
  margin-left: 20%;
  margin-right: 20%;
  overflow: hidden;
  border-top: 2px solid #eeeeee;
  border-bottom: 4px solid #cccccc;
}
a.nav-link {
  padding: 1rem 2.25rem;
  text-decoration: none !important;
}

button.theme--light {
  transition: background-color 0.5s ease;
}
button.theme--light:hover {
  color: #fff;
  background:rgb(160, 221, 241) !important;
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

</style>
