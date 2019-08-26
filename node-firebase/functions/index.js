// Firebase required functions
const functions = require('firebase-functions');

// Packages needed to make things happen
const Twitter = require('twitter')
const express = require('express')
const cors = require('cors')


// Get a server up and running
// Use same default port as Firebase for simplicity
let app = express()
let portNumber = 5000

// Get past CORS issues
app.use(cors())

// Grab sensitive info from external file

// If local, check .env for Twitter API keys
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// And in case we're in firebase land, try that config file thing
functions.config();

// Set up config vars to be filled in later
let config = {};

//   "consumer_key": "WaoTjQLbwyGUjFPDs3bM6KMQU",
//   "consumer_secret": "R5PdIs9jzpaMpLfpX3XRCiiy0iDZzTTivrlH0HcY7hG9aCbE8k",
//   "access_token_key": "1163974938052583424-n6WJSWhGVVkLu86x14k0Kz5pt0rHgi",
//   "access_token_secret": "e6Hs6DTYaC8u2deaeZpUcwdxgOyhr6oZfilcMbsGh8qF1"
// }

// Check below determines if we're runnign locally
if (process.env.TWITTER_CONSUMER_KEY != '' ||
  process.env.TWITTER_CONSUMER_KEY == 'undefined' ) {
    config = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    }
} else {
  config = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
  }
}



var client = new Twitter(config);

console.log(client)

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
  // console.log(`getting banner for ${req.params.handle}`)

  var params = {
    screen_name: req.params.handle,
  }

  client.get('users/profile_banner', params, function(t_error, user_banner, t_response) {
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


