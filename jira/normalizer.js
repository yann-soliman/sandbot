'use strict';

process.env.DEBUG = 'actions-on-google:*';
const DateUtils = require('date-and-time');

class Normalizer {

	// "Colle" une chaîne de caractère séparée par des espaces
	// ex : le test => letest
	static assembleString(str) {
		return str.split(" ").reduce((accumulator, currentValue) => accumulator.concat(currentValue.trim()), "");
	}

	// Converti un temps au format Jira
	// ex : 8 heures => 8h
	static toJiraTimeSpent(time, unit) {
		let jiraUnit;
		switch(unit) {
            case "jour":
            case "jours":
                jiraUnit = "d";
                break;
            case "heure":
            case "heures":
                jiraUnit = "h";
                break;
            case "minute":
            case "minutes":
                jiraUnit = "m";
                break;
            case "seconde":
            case "secondes":
                jiraUnit = "s";
                break;
		}
		return time.trim().concat(jiraUnit);
	}

	static toDate(strDate) {

	}

}

module.exports = {
    Normalizer: Normalizer
};