'use strict';

require('dotenv').config();

require('./src/server.js').start(process.env.PORT || 3000);
