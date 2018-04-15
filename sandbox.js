'use strict';

const { GSpreadSheet } = require('./connectors/googlespreadsheet.js')

let gss = new GSpreadSheet()
gss.findList("Date auto-école");