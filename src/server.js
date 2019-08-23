'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// const PORT = process.env.PORT || 3000;
const app = express();

const apiRouter = require('../apiRouter/apiRouter.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('./public'));

app.use(apiRouter);


module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};