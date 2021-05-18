'use strict';

//////////////////////////
////// Dependencies /////
////////////////////////

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//////////////////////////
////// Imports      /////
////////////////////////

// ROUTES

const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');

// Error Handlers

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');


////////////////////////
////// Middleware /////
//////////////////////

const logger = require('./middleware/logger.js');

// Parsing json
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Global middleware
app.use(logger);

////////////////////////
////// Routes     /////
//////////////////////

app.get('/', homeHandler);
app.use('/api/v1/clothes/', clothesRouter);
app.use('/api/v1/food/', foodRouter);

// Error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

// homeHandler

function homeHandler(req, res) {
  res.send('Hello From the Other side');
}


module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}/`);
    });
  },
};


