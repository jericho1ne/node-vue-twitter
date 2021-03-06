/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router/index.js'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

const API_BASE_URL = (process.env.NODE_ENV == 'development')
  ? process.env.VUE_APP_LOCAL_API_URL
  : process.env.VUE_APP_HOSTINEER_URL

console.log(` ************************************** `);
console.log(` VUE is running in [ ${process.env.NODE_ENV} ] mode.`);
console.log(` API URL: [ ${API_BASE_URL} ]`);
console.log(` ************************************** `);

// https://vuetifyjs.com/en/getting-started/quick-start
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';

Vue.use(VueMoment, { moment, }, Vuetify, VueAxios, axios);
Vue.config.productionTip = false

let dataStore = {
  debug: true,

  state: {
    apiUrl: API_BASE_URL,
    tweets: [],
  },

  setTweets (data) {
    if (this.debug) {
      console.log('setTweets called w/', data)
    }
    this.state.tweets = data
  },

  clearTweets () {
    if (this.debug) {
      console.log('clearTweets called')
    }
    this.state.tweets = []
  }
}

new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify,
  template: '<App/>',

  data: {
    state: dataStore.state,
    tweets: []
  }
})
