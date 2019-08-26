// Firebase required functions
const functions = require('firebase-functions');

// Packages needed to make things happen
const Twitter = require('twitter')
const express = require('express')
const cors = require('cors')


// Get a server up and running
// Use same default port as Firebase for simplicity
let app = express()
let portNumber = 5001

// Get past CORS issues
app.use(cors())

// If local, check .env for Twitter API keys
// (appending them to `process.env`)
require('dotenv').config()
// And in case we're in firebase land, try that this automatic thing
// (pre-fills a `config` var)
const firebaseConfig = functions.config()

// Set up config vars to be filled in later
let twitterConfig = {};

// Check below determines if we're runnign locally
if (process.env.TWITTER_CONSUMER_KEY != '' ||
  process.env.TWITTER_CONSUMER_KEY == 'undefined' ) {
    twitterConfig = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    }
} else {
  twitterConfig = {
    consumer_key: firebaseConfig.consumer_key,
    consumer_secret: firebaseConfig.consumer_secret,
    access_token_key: firebaseConfig.access_token_key,
    access_token_secret: firebaseConfig.access_token_secret
  }
}

// Initialize Twitter API client
var client = new Twitter(twitterConfig);

/**
 * :test
 *
 * Make sure Twitter API auth works
 * URL example: http://localhost:3000/test/
 * @return Either an error, or a valid response containing current user's info
 */
app.get('/test/', (req, res) => {
  client.get('account/verify_credentials', function(t_error, t_response) {
    if (t_error) {
      res.json(t_error)
    } else {
      res.json(t_response);
    }
  })
})
/**
 * :search
 *
 * Returns tweets from a given username/handle
 * URL example: http://localhost:3000/search/mihaidonttweet
 * @param handle
 * @return List of most recent X number of tweets
 */
app.get('/search/:handle', (req, res) => {
  // console.log(`getting latest tweets for ${req.params.handle}`)

  var params = {
    screen_name: req.params.handle,
    count: 20,
  }

  client.get('statuses/user_timeline', params, function(t_error, user_tweets, t_response) {

    if (!t_error) {
      if (user_tweets.length == undefined) {
        res.json({ error: 'User has no tweets!'})
      }
      let tweetData = []

      let i = 0, dataLength = user_tweets.length

      for (i; i < dataLength; i++) {
        tweetData.push({
          tweetid: user_tweets[i].id,
          created: user_tweets[i].created_at,
          content: user_tweets[i].text,
          avatar: user_tweets[i].user.profile_image_url_https
        })
      }
      res.json(tweetData);
    } else {
      res.json(t_error)
    }
  });
})
/**
 * :banner
 *
 * Get a user's banner
 * URL example: http://localhost:3000/banner/mihaidonttweet
 * @param handle
 * @return PNG banner from twitter's image CDN
 */
app.get('/banner/:handle', (req, res) => {
  console.log(`getting banner for ${req.params.handle}`)

  var params = {
    screen_name: req.params.handle,
  }

  client.get('users/profile_banner', params, function(t_error, user_banner, t_response) {
    console.log(user_banner)

    if (!t_error) {
      res.json(user_banner);
    } else {
      res.json(t_error)
    }
  });
})
// Listen for incoming requests
.listen(portNumber);

// console.log("Server running at http://localhost:" + portNumber + "/");


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);


