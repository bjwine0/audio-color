'use strict';

const temporal = require('temporal');
const five = require('johnny-five'); 
const raspi = require('raspi-io').RaspiIO; 

//////////////////////////////////////////////////

const rgbOne = function(duration) {
  const board = new five.Board({ 
    io: new raspi(), 
  });
  board.on('ready', function() {
    console.log(duration);
    // Initialize the RGB LED
    var led = new five.Led.RGB([3, 0, 5]);
    
    var i = 0;
    var j = 0;
    var rainbow = ["512ef0"]//, "9966FF", "666699", "cc00ff", "130613", "4da6ff", "000099"];
    var inten = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100,90, 80 ,70, 60, 50, 40 ,30, 20];
    
    this.loop(1000, function() {
      
      led.color(rainbow[i++])
        led.intensity(inten[j++]);
      
      if (i === rainbow.length) {
        i = 0;
      }
      if (j === inten.length){
        j = 0;
      }
      
    })
  });  
}

///////////////////////////////////////////

const rgbTwo = function(duration) {
  const board = new five.Board({ 
    io: new raspi(), 
  });
  board.on('ready', function() {
    console.log(duration);
    // Initialize the RGB LED
    var led = new five.Led.RGB([3, 0, 5]);
    
    var i = 0;
    var j = 0;
    var rainbow = ["b8711d"]//,"23147c","666699", "cc00ff", "130613", "4da6ff", "000099"];
    var inten = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100,90, 80 ,70, 60, 50, 40 ,30, 20];
    
    this.loop(1000, function() {
      
      led.color(rainbow[i++])
        led.intensity(inten[j++]);
      
      if (i === rainbow.length) {
        i = 0;
      }
      if (j === inten.length){
        j = 0;
      }
      
    })
  });  
}


////////////////////////////////////////////////

const rgbThree = function(duration) {
  const board = new five.Board({ 
    io: new raspi(), 
  });
  board.on('ready', function() {
    console.log(duration);
    // Initialize the RGB LED
    var led = new five.Led.RGB([3, 0, 5]);
    
    var i = 0;
    var j = 0;
    var rainbow = ["f7f975"]//,"23147c","666699", "cc00ff", "130613", "4da6ff", "000099"];
    var inten = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100,90, 80 ,70, 60, 50, 40 ,30, 20];
    
    this.loop(1000, function() {
      
      led.color(rainbow[i++])
        led.intensity(inten[j++]);
      
      if (i === rainbow.length) {
        i = 0;
      }
      if (j === inten.length){
        j = 0;
      }
      
    })
  });  
}
// Working on this
// for (i =0;i<rainbow.length;i++){
//   for (j=0;j<inten.length;j++){
//     console.log(i, j);
//     setTimeout( () => {
//       led.color(rainbow[i])
//       led.intensity(inten[j])
//     },500);
    
    
//   }
// }

module.exports = {rgbOne, rgbTwo, rgbThree, temporal, five, raspi};
