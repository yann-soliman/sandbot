'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');

const Actions = {
	START_GAME: "input.welcome",
	GUESS_NUMBER: 'guess_number',	
};

const Parameters = {
	NUMBER_ARGUMENT: 'number'
};

class Game {
    
    constructor (req, resp) {
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Body: ${JSON.stringify(req.body)}`);
		
        this.app = new DialogflowApp({ request: req, response: resp });
        this.data = this.app.data;
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
    
	// Initialisation d'une nouvelle partie
    [Actions.START_GAME]() {
        this.data.randomNumber = Math.floor(Math.random() * 100);
        console.log("randomNumber = " + this.data.randomNumber);
        this.app.ask("allez go, devine un nombre entre 1 et 100");
    }

	// Devine un nombre
    [Actions.GUESS_NUMBER] () {
        console.log("randomNumber = " + this.data.randomNumber);
        let number = this.app.getArgument(Parameters.NUMBER_ARGUMENT);
        if (number > this.data.randomNumber) {
            this.app.ask("Le nombre est plus petit que " + number);
        }
        else if (number < this.data.randomNumber) {
            this.app.ask("Le nombre est plus grand que " + number);
        }
        else {
            this.app.tell("Bravo, vous avez trouvé le nombre !");
        }
    }    
}

module.exports = {
	Game: Game
};