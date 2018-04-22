'use strict';

process.env.DEBUG = 'actions-on-google:*';
const DateUtils = require('date-and-time');

class Normalizer {

	// Transforme le numéro envoyé en clé Jira
	// ex : 123 => PAO-123
	static toJiraIssueKey(number) {
		return "PAO-".concat(number)
	}

	// Converti un temps au format Jira
	// ex : 8 heures => 8h
	static toJiraTimeSpent(time, unit) {
		let jiraUnit;
		switch(unit) {
            case "jour":
                jiraUnit = "d";
                break;
            case "heure":
                jiraUnit = "h";
                break;
            case "minute":
                jiraUnit = "m";
                break;
            case "seconde":
                jiraUnit = "s";
                break;
		}
		return time.toString().concat(jiraUnit);
	}

}

module.exports = {
    Normalizer: Normalizer
};