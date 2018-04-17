'use strict';

process.env.DEBUG = 'actions-on-google:*';
const JiraClient = require('jira-connector');
const DateUtils = require('date-and-time');

class Jira {
    
    constructor () {
		this.jira = new JiraClient( {
			host: '192.168.81.209',
			port: '8080',
			protocol: 'http',
			basic_auth: {
				username: 'Azerty',
				password: 'azerty'
			}
		});
    }
    
	// Log un temps de travail
	// issueKey : la clé de la tâche (ex : PAO-12345)
	// timeSpent : temps passé sur la tâche au format Jira (ex : 4h)
	// date : date à laquelle charger le temps passé
	// cb : callback de merde à appeler avec l'erreur en param
	// return : dans le callback, retourne une erreur s'il y en a une
	//TODO: Passer en plus l'auteur si c'est possible
    addWorkLog(issueKey, timeSpent, date, cb) {

    	console.log("adding worklog...");
		console.log("issueKey = " + issueKey);
		console.log("timeSpent = " + timeSpent);
        console.log("date = " + date);
		
		this.jira.issue.addWorkLog({
			issueKey: issueKey,
			worklog: {
				"author": {
					"self": "http://192.168.81.209:8080/rest/api/2/user?username=Azerty",
					"name": "CCCC",
					"key": "azerty",
					"emailAddress": "azeqsdaze@qqsd.com"
				},
				"started": DateUtils.format(date, 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'), //"2018-04-16T21:00:00.000+0000",
				"timeSpent": date
			}
		},
			(error, issue) => cb(error, issue)
		);
        
    }

    // Ajoute un commentaire sur la tâche
	// issueKey : la clé de la tâche (ex : PAO-12345)
	// comment : le commentaire à ajouter
    // cb : callback de merde à appeler avec l'erreur en param
    // return : dans le callback, retourne une erreur s'il y en a une
    comment(issueKey, comment, cb) {

        console.log("adding comment...");
        console.log("issueKey = " + issueKey);
        console.log("comment = " + comment);

        this.jira.issue.addComment({
            issueKey: issueKey,
            comment: comment
        },
            (error, issue) => cb(error, issue)
        );

	}
}

module.exports = {
	Jira: Jira
};