'use strict'; 
 
 // CLIENT
 const io = require('socket.io-client');
 const socket = io.connect('http://localhost:3000');
 
 socket.on('message', (payload) => {
   console.log('heard', payload);
 });