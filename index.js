'use strict';
/**
 * Application entry point, requires
 * src/server.js and starts server on
 * PORT or 3000
 */
require('./src/server.js').start(process.env.PORT || 3000);