'use strict';
const rgb = require('./rgb.js');

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}

const validateParam = function (num) {
  if (num < 0 || num > 10 || typeof num !== 'number') {
    throw 'invalid parameter';
  }
  else {
    console.log('good value', num)
    return true;
  }
}

const convertMoodToRGB = (valence) => {
  
  validateParam(valence)

  let groupOne = range(0, 4);
  let groupTwo = range(4, 7);
  let groupThree = range(7, 11);

  if (groupOne.includes(valence)) {
    console.log('group one');
    rgb.rgbOne()
  }
  if (groupTwo.includes(valence)) {
    console.log('group two');
    rgb.rgbTwo()
  }
  if (groupThree.includes(valence)) {
    console.log('group three');
    rgb.rgbThree()
  }
};

module.exports = {range, validateParam, convertMoodToRGB}
