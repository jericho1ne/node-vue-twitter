<template>
<v-app>
<v-content>

  <v-container grid-list-sm>
    <v-layout row fill-height>
      <v-flex sm6 offset-sm-3>
        <div class="search-box">
          <!--  Search for username -->
          <div class="input-panel">
            <label for="search-input">Search by a user's twitter handle:</label>
            <v-text-field
              label="Handle / Username"
              required
              @keyup.enter="searchForUser()"
              v-model="handle"
            ></v-text-field>
            <v-btn class="mr-4" @click="searchForUser()">Search for User</v-btn>
          </div>

          <!-- Further narrow down list of tweets (client-side search) -->
          <transition name="fade">
            <div class="input-panel">
              <div v-if="hasTweets">
                <label for="search-input">Search feed:</label>
                <v-text-field
                  label="Search within tweets"
                  required
                  @keyup="trimTweets()"
                  v-model="searchTerm"
                ></v-text-field>
                <v-btn class="mr-4" @click="trimTweets()">Filter Tweets</v-btn>
              </div>
            </div>
          </transition>
          <!-- Loading spinner -->
          <div v-if="loading" class="loading">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container fluid>
    <v-layout row>
      <v-flex sm-12 text-center>
        <div class="banner full-width"
          v-bind:style="{ backgroundImage: 'url(' + banner + ')' }"
        >
          <div>
            <h2 v-if="hasTweets" class="user-handle">{{ displayHandle }}</h2>
            <span v-else class=""><h2>No such user found</h2><br>( or this profile is private ) </span>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

  <v-container>
    <transition name="fade">
      <!-- Display most recent tweets from given user -->
      <div id='list-wrapper' v-if="hasTweets">
        <v-layout row
          v-for="(tweet, idx) in trimTweets()"
          :key="idx"
        >
          <v-flex xs6 sm2 md offset-sm-1 offset-md-2 mb-2>
            <v-card class="data-item transparent" text-center>
              <v-card-text>
                <strong>{{ tweet.created | moment('timezone', 'America/Los_Angeles', 'ddd, MMM Do') }}</strong><br>
                {{ tweet.created | moment('timezone', 'America/Los_Angeles', 'h:mm a') }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 sm2 md1 mb-2>
            <v-card class="avatar transparent">
              <img :src="tweet.avatar">
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md5>
            <v-card>
              <v-card-text>{{ tweet.content }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </transition>
  </v-container>

</v-content>
</v-app>
</template>

<script src=""></script>

<script>
/* eslint-disable */
import ApiCalls from '../services/apiCalls'
import Helpers from '../services/helpers'

export default {
  name: 'Home',

  data () {
    return {
      handle: '',
      displayHandle: '',
      searchTerm: '',
      tweets: [],
      hasTweets: false,
      banner: {},
      loading: true,
      error: null,
    }
  },

  created () {
    //
  },

  mounted() {
    // Populate Danny Trejo data by default
    let handle = 'officialdannyt'
    this.fetchData(handle)
  },

  methods: {
    searchForUser() {
      this.fetchData(this.handle)
    },

    trimTweets() {
      const searchTerm = this.searchTerm
      // console.log(`trimming tweets based on string: ${searchTerm}`)
      return this.tweets.filter(function(twt){
        return twt.content.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
      })
    },

    tweetIsVisible() {
      return true
    },

    fetchData (handle) {
       ApiCalls.getUserData(this.$root.$data.state.apiUrl, 'search', handle)
        .then(response => {
          this.tweets = response
          // If legitimate data returned; Else, user has no tweets
          if (response.length > 2) {
            this.displayHandle = `@${handle}`
            this.hasTweets = true
          } else {
            console.warn("No data returned.")
            this.hasTweets = false
            this.displayHandle = ''
          }
        })
        .catch(error => console.error(error))
        .finally(() => {
          // Remove "Loading..." spinner
           this.loading = false
        })

      ApiCalls.getUserData(this.$root.$data.state.apiUrl, 'banner', handle)
        .then(response => {
          const banner = Helpers.flattenObject(response)
          console.log(banner.url)
          this.banner = (typeof banner.url !== 'undefined')
            ? banner.url
            : ''
        })
        .catch(error => console.log(error))
        .finally(() => {
          // Remove "Loading..." spinner
           this.loading = false
        })
    }
  }
}
</script>

<style src="../assets/css/anims.css"></style>
<style scoped>
/* http://paletton.com/#uid=3000I0kqBM4fHT0luPhxVIIFktE */
.search-box {
  padding: 0.5em 1em;
  background: #fff;
  box-shadow: 0.25em 0.25em 0.35em rgba(0, 0, 0, 0.3);
  margin-bottom: 2em;
}
.banner {
  border-bottom-left-radius: 80px;
  border-top-right-radius: 80px;
  padding: 5em 0;
  opacity: 1;
  background-size: cover;
  min-height: 200px;
  margin: 0;
  border-bottom: 12px solid #BDE400;
  border-left: 2px solid #BDE400;

  border-top: 12px solid #0C78CB;
  border-right: 2px solid #0C78CB;
}
.user-handle {
  letter-spacing: 2px;
  font-size: 2em;
  padding: 1em;
  color: #fff;
  text-shadow: 0.03em 0.05em 0.05em rgba(0, 0, 0, 0.8);
}
.data-item {
  min-height: 76px;
}
.avatar {
  text-align: center;
  padding: .8em;
  border-radius: 50%;
}
.transparent {
  background: none !important;
  box-shadow: none;
}
.input-panel {
  padding: 1em;
  margin-top: 10px;
}
#app {
  margin-top: 0;
}

/*  Overrides  */
.v-btn {
  padding: 0.25em .5em !important;
  height: 32px !important;
}
.v-btn.v-size--default {
  font-size: 0.75rem !important;
}
.theme--light.v-btn {
  background-color: #0C78CB !important;
  color: #fff;
}
.theme--light.v-card {
  border: 1px solid #BBCD67;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
