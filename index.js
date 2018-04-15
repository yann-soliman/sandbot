'use strict';

// Imports
const express = require('express')
const { Game } = require('./game/game.js')

// Configuration express
const app = express()
app.use(express.json());

// Point d'entré
app.post('/', (req, resp) => new Game(req, resp).dispatch())

// Listening...
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () =>
  console.log('App is running on ' + app.get('port'))
)