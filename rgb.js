'use strict';
var serialport = require("serialport");
serialport.list(function(err, ports) {
    console.log(ports);

});
//const Tessel = require('tessel-io');
const temporal = require('temporal');
const five = require('johnny-five'); 
const raspi = require('raspi-io').RaspiIO; 
 
const board = new five.Board({ 
    io: new raspi(), 
    
});



// board.on("ready", function() {
//     var a = new five.Led.RGB([ 3, 0, 5 ]);
  
    
  
//     this.repl.inject({
//       a: a
      
//     });
  
//     a.strobe(500);
//     //b.strobe(1000);
// });

// board.on('ready', () => {
//   // Create an Led on pin 7 on header P1 (GPIO4) and strobe it on/off
//   const ledR = new five.Led('P1-15');
//   const ledB = new five.Led('P1-18');
//   const ledG = new five.Led('P1-11');
//   led.strobe(500);
// });

// board.on("ready", function() {
//   var rgb = new five.Led.RGB([3, 0, 5]);
//   var index = 0;
//   var rainbow = ["FFFF00", "1F618D", "48C9B0", "95A5A6", "FFEB3B", "3333FF", "BA68C8"];

//   this.loop(500, function() {
//     rgb.strobe(rainbow[index++]);// color
//     if (index === rainbow.length) {
//       index = 0;
//       //rgb.strobe(4000);
//     }
//   });
// });


// board.on("ready", function() {

//   // Initialize the RGB LED
//   var led = new five.Led.RGB({
//     pins: {
//       red: 3,
//       green: 0,
//       blue: 5
//     }
//   });

//   // RGB LED alternate constructor
//   // This will normalize an array of pins in [r, g, b]
//   // order to an object (like above) that's shaped like:
//   // {
//   //   red: r,
//   //   green: g,
//   //   blue: b
//   // }
//   var led = new five.Led.RGB([3,0,5]);

//   // Add led to REPL (optional)
//   this.repl.inject({
//     led: led
//   });

//   // Turn it on and set the initial color
//   led.on();
//   led.color("#FFFF00");

//   led.blink(1000);

// });

// board.on("ready", function() {

//   // Initialize the RGB LED
//   var led = new five.Led.RGB([3, 0, 5]);

//   // Set to full intensity red
//   console.log("100% red");
//   led.color("#FF0000");

//   temporal.queue([{
//     // After 3 seconds, dim to 30% intensity
//     wait: 3000,
//     task: function() {
//       console.log("30% red");
//       led.intensity(30);
//     }
//   }, {
//     // 3 secs then turn blue, still 30% intensity
//     wait: 3000,
//     task: function() {
//       console.log("30% blue");
//       led.color("#0000FF");
//     }
//   }, {
//     // Another 3 seconds, go full intensity blue
//     wait: 3000,
//     task: function() {
//       console.log("100% blue");
//       led.intensity(100);
//     }
//   }, ]);
// });

// board.on("ready", function() {
//   var led = new five.Led(13);
//   led.on();


//   this.on("exit", function() {
//     led.off();
//   });
// });

// board.on("ready", function() {
//   console.log("Ready event. Repl instance auto-initialized!");

//   var led = new five.Led(13);

//   this.repl.inject({
//     // Allow limited on/off control access to the
//     // Led instance from the REPL.
//     on: function() {
//       led.on();
//     },
//     off: function() {
//       led.off();
//     }
//   });
// });

board.on("ready", () => {
  var led = new five.Led(3);

  led.fade({
    easing: "linear",
    duration: 5000,
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    keyFrames: [0, 250, 25, 150, 100, 125],
    onstop() {
      console.log("Animation stopped");
    }
  });

  // Toggle the led after 2 seconds (shown in ms)
  board.wait(5000, () => led.fadeOut());
});