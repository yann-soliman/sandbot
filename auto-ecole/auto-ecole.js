'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const { GSpreadSheet } = require('../connectors/googlespreadsheet.js')
const Ssml = require('../ssml.js').SSML;

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
			let dateNextSession = new Date(listNextSession[1].value);
			
			// Date au format yyyy-MM-dd
			let dateString = dateNextSession.getFullYear() + "-" + dateNextSession.getMonth().toString().padStart(2, "0") + "-" + dateNextSession.getDate();		
			// Heure au format hh:mm:ss
			let timeString = dateNextSession.getHours().toString().padStart(2, "0") + ":" + dateNextSession.getMinutes().toString().padStart(2, "0") + ":" + dateNextSession.getSeconds().toString().padStart(2, "0");
			
			
			const response = new Ssml();
			response.say("La date de la prochaine session d'auto-école est le");
			response.date(dateString);
			response.say("à");
			response.time(timeString);
			
			this.app.tell(response.toString());
		};
		
		let gss = new GSpreadSheet()
		gss.findColumn("Date auto-école", cbFindColumn);			
        
    }    
}

module.exports = {
	AutoEcole: AutoEcole
};