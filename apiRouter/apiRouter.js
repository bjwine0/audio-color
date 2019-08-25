'use strict';

require('dotenv').config();
const request = require('request');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
<<<<<<< HEAD
=======
const moodApp = require('../app.js');

>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'https://localhost:3000/callback'
});
// spotifyApi.setAccessToken();
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback'
<<<<<<< HEAD
=======

>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
router.get('/', loadHome);
router.get('/login', oauth);
router.get('/callback', getToken);
router.get('/nowplaying', getCurrentlyPlaying);
<<<<<<< HEAD
let access_token = '';
function loadHome(req, res, next) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: access_token,
  });
=======
router.get('/colorize', colorize);

let access_token = '';

function loadHome(req, res, next) {

  const spotifyApi = new SpotifyWebApi({
    accessToken: access_token,
  });

>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
  return spotifyApi.getMe()
    .then(me => {
      res.status(200).send(me.body);
    })
    .catch(console.error)
<<<<<<< HEAD
}
=======
};

>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
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
  request.post(authOptions, function (error, response, body) {
    access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/'
    res.redirect(uri + '?access_token=' + access_token)
  })
<<<<<<< HEAD
}
=======
};

>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
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
  getMood()
<<<<<<< HEAD
  .then(mood => {
    res.status(200).send(mood);
  })
}
const getMood = function () {
  const spotifyApi = new SpotifyWebApi({
    accessToken: 'BQALTPotf8nAqoEo4B7YH-DAWF-4zTFmGahK4wqufZEJZELT6P6xD1hJF97c_5tUNjYba_E2PK2nYn2hxy-6MY4BsjAlttyIpHm1FgfH_qucuyYP8BhnaEGSUbM3K-wTEWua1N524ZgZ4RdF3dfYWtRcNBmLAooauxLJxG3SySnN103KVFdVql2q9A',
  });
=======
    .then(mood => {
      let moodObj = { mood: mood }
      res.status(200).send(moodObj);
    })
};

function colorize(req, res) {
  return getMood()
    .then(mood => {
      let colorSet = moodApp.convertMoodToRGB(mood)
      res.status(200).send(colorSet)
    })
};

const getMood = function () {
  const spotifyApi = new SpotifyWebApi({
    accessToken: 'BQDTmprkGzeyj1OkhKSooKuoPxGEP-Bp3GDUFFBBfenLK7xjW5Lcf1_D8QFrdTpmFruRmhhXujZYJSy27SDwOMISOJAmWsttPe3s7G8-ydaUlHZ4aQ1qu93vdvBTMqtkCJhihjrJglkvM83bdJ__Y4Bm7_3muOKq2PKFYz7MUHf1ufgxFV6Tj-NJ7A',
  });

>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
  return spotifyApi.getMyCurrentPlayingTrack()
    .then(data => {
      let id = data.body.item.id;
      console.log('track name', data.body.item.name)
      return spotifyApi.getAudioFeaturesForTrack(id)
    }).then(data => {
<<<<<<< HEAD
      let valence =  { mood_score: data.body.valence }
=======
      let valence = Math.round((data.body.valence * 10));
>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
      console.log('mood score', valence);
      return valence;
    }).catch(err => {
      console.log(err);
    })
<<<<<<< HEAD
}
// setInterval(getMood, 5000);
module.exports = router;
=======
};


// setInterval(getMood, 5000);

module.exports = router;
>>>>>>> e39930812461f8e1f7661e9a3294921253e81d5a
