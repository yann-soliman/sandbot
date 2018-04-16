'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const { GSpreadSheet } = require('../connectors/googlespreadsheet.js')
const Ssml = require('../ssml.js').SSML;
const date = require('date-and-time');

const Actions = {
	WELCOME: "input.welcome",
	NEXT_SESSION: 'next-session',	
};

class AutoEcole {
    
    constructor (req, resp) {
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Body: ${JSON.stringify(req.body)}`);
		
        this.app = new DialogflowApp({ request: req, response: resp });
    }
    
	// Dispatch vers la bonne méthode en fonction de l'intention
    dispatch () {
        const map = this;
		const action = this.app.getIntent();
		if (!action) {
		  return this.app.ask("Pouvez répéter ?");
		}
		map[action]();
    }
    
	// Bienvenue
    [Actions.WELCOME]() {
        this.app.ask("Chom Riep Sour Bong Tou, que puis-je faire pour vous ?");
    }

	// Trouve la prochaine session d'auto-école
    [Actions.NEXT_SESSION] () {		
	
		let cbFindColumn = listNextSession => {
			
			let today = new Date();
			
			//Cherche la session la plus proche
			let nextSession = listNextSession.reduce((accumulator, currentValue) => {
				//Cas à la marge
				if(accumulator === undefined && !isNaN(Date.parse(currentValue.value))) {
					return currentValue;
				}
				if(isNaN(Date.parse(currentValue.value))) {
					return accumulator
				}
				
				// diff en heures, la diff la plus petite l'emporte
				let currentValueDate = new Date(currentValue.value);
				let diff = date.subtract(currentValueDate, today).toHours();
				let accumulatorDate = new Date(accumulator.value);
				let bestDiff = date.subtract(accumulatorDate, today).toHours();
				return diff < bestDiff ? currentValue : accumulator;
			}, undefined);
			
			let dateNextSession = new Date(nextSession.value);
			
			// Date au format yyyy-MM-dd
			let dateString = date.format(dateNextSession, 'YYYY-MM-DD'); 	
			// Heure au format hh:mm
			let timeString = date.format(dateNextSession, 'HH:mm');			
			
			const response = new Ssml();
			response.say("La date de la prochaine session d'auto-école est le");
			response.date(dateString);
			response.say("à");
			response.timeNoSeconds(timeString);
			
			this.app.tell(response.toString());
		};
		
		let gss = new GSpreadSheet()
		gss.findColumn("Date auto-école", cbFindColumn);			
        
    }    
}

module.exports = {
	AutoEcole: AutoEcole
};