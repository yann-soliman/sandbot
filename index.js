'use strict';

// Imports
const express = require('express');
const { dialogflow } = require('actions-on-google');
const { fulfillment } = require('./jira/fulfillment.js');

// Configuration express
const exp = express();
exp.use(express.json());
exp.get('/', (req, resp) => resp.status(404).send("Try with a post..."));


const app = dialogflow().use(fulfillment);

exp.use(app);

// Listening...
exp.set('port', process.env.PORT || 8081);
exp.listen(exp.get('port'), () =>
    console.log('App is running on ' + exp.get('port'))
);