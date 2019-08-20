<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout row wrap>

          <v-flex xs12 text-center>
             <v-img
              :src="require('../assets/logo.svg')"
              class="my-3"
              contain
              height="220"
            ></v-img>
            <h2>Slync.io Twitter API Demo</h2>
            <hr>
          </v-flex>

          <v-flex sm6 card>
            <h3>Backend</h3>
            <ul class="custom-list">
              <li
                v-for="(item, i) in backend"
                :key="i"
              ><a href=item.href target="_blank">{{ item.text }}</a>{{ item.why ? ` – ${item.why}` : '' }}</li>
            </ul>
          </v-flex>

          <v-flex sm5 card>
            <h3>Frontend</h3>
            <ul class="custom-list">
              <li
                v-for="(item, i) in frontend"
                :key="i"
              ><a href=item.href target="_blank">{{ item.text }}</a>{{ item.why ? ` – ${item.why}` : '' }}</li>
            </ul>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'About',

  data () {
    return {
      frontend: [
        {
          text: 'Vue.js',
          href: 'https://github.com/vuejs',
          why: ''
        },
        {
          text: 'Axios',
          href: 'https://www.npmjs.com/package/vue-axios',
          why: 'Ajax library'

        },
        {
          text: 'Vuetify',
          href: 'https://vuetifyjs.com',
          why: 'Material components'
        },
      ],
      backend: [
        {
          text: 'Node',
          href: '',
          why: ''
        },
        {
          text: 'Express',
          href: 'https://www.npmjs.com/package/express',
          why: 'API + endpoints'
        },
         {
          text: 'Twitter',
          href: 'https://www.npmjs.com/package/express',
          why: 'async Twitter npm client library'
        },
      ],
    }
  },

  created () {
    // console.log('** About CREATED **')
  },

  mounted() {
    // console.log('** About MOUNTED **')
  }
}
</script>
<style>
.card {
  padding: 2em 0em 2em 2em;
}
.custom-list li {
  margin-left: -20px;
  line-height: 2.5;
}
.custom-list li:before {
  display: inline-block;
  content: ' ';
  background-image: url('../assets/checkmark.svg');
  background-size: 22px 22px;
  height: 22px;
  width: 22px;
  margin-right: 5px;
  margin-bottom: -4px;
}
</style>
