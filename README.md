# Vue + Node Twitter Client w/ Firebase deployment

https://node-twitter.firebaseapp.com/

## Local Setup
* Run `npm install` in **both** `node-api` and `vue-ui` folders
* Place your twitter API key/secrets in a `node-api/.env` dotfile
* To start the Express server: `node app.js` in `node-api` folder (will run on localhost:3000)
* To build the Vue.js UI: `npm run serve` in `vue-ui` folder (will run on localhost:3001)
* Open up a browser to http://localhost:3001

NOTE: to ensure that the Twitter API calls are working, use the `test` route: http://localhost:3000/test

## Deploy to Firebase
* [Install Firebase](https://firebase.google.com/docs/cli) + set up [Hosting](https://firebase.google.com/docs/hosting/quickstart)
* OPTIONAL: if you already had Firebase installed, you may be prompted to update via `firebase serve --only hosting`
