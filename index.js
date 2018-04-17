'use strict';

// Imports
const express = require('express');
const { Game } = require('./game/game.js');
const { AutoEcole } = require('./auto-ecole/auto-ecole.js');
const { Jira } = require('./jira/jira.js');

// Configuration express
const app = express();
app.use(express.json());

// Point d'entré
//app.post('/', (req, resp) => new Game(req, resp).dispatch())
app.post('/', (req, resp) => new AutoEcole(req, resp).dispatch());
//app.post('/', (req, resp) => new Jira(req, resp).dispatch())
app.get('/', (req, resp) => resp.status(404).send("Try with a post..."));

// Listening...
app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), () =>
  console.log('App is running on ' + app.get('port'))
);