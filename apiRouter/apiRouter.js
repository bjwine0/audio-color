'use strict';
require('dotenv').config();

const request = require('request');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'https://localhost:3000'
});

// spotifyApi.setAccessToken();

router.get('/', loadHome)
router.get('/login', oauth)
router.get('/callback', getToken)
router.get('/nowplaying', getCurrentlyPlaying);

function loadHome(req, res, next) {
  res.status(200).send('welcome');
}

function getToken(req, resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      resp.json({ token: body.access_token });
    }
  });
}

function oauth(req, res, next) {

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/callback'

  const scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
    }))
};

function getCurrentlyPlaying(req, res, next) {
  return spotifyApi.getMyCurrentPlayingTrack()
    .then(data => {
      console.log('req', req.query.code)
      let id = data.body.item.id;
      return spotifyApi.getAudioFeaturesForTrack(id)
    }).then(data => {
      console.log('valence', data.body.valence);
      res.status(200).send(data.body.valence);
    }).catch(err => {
      console.log(err);
    })
}

module.exports = router;