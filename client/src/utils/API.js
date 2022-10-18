// var dotenv = require('dotenv')
// var dotenvExpand = require('dotenv-expand')

// var myEnv = dotenv.config()
// dotenvExpand(myEnv)

// Should be OK now.
const spotifyApi = process.env.SPOTIFYLINK


// make a search to spotify api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchSpotify = (query) => {
    return fetch(spotifyApi);
  };
  