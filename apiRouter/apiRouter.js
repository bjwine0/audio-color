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
  redirectUri: 'https://localhost:3000/callback'
});

// spotifyApi.setAccessToken();
let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:3000/callback'
  
router.get('/', loadHome)
router.get('/login', oauth)
router.get('/callback', getToken)
router.get('/nowplaying', getCurrentlyPlaying);

function loadHome(req, res, next) {
  res.status(200).send('welcome');
}

function getToken(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    let access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/'
    res.redirect(uri + '?access_token=' + access_token)
  })
}

function oauth(req, res, next) {

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = 'http://localhost:3000/callback'

  const scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
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