'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const JiraClient = require('jira-connector');

const Actions = {
	WELCOME: "input.welcome",
	TIMING: 'timing',	
};

class Jira {
    
    constructor (req, resp) {
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Body: ${JSON.stringify(req.body)}`);
		
        this.app = new DialogflowApp({ request: req, response: resp });
		
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
    
	// Dispatch vers la bonne méthode en fonction de l'intention
    dispatch () {
        const map = this;
		const action = this.app.getIntent();
		if (!action) {
		  return this.app.ask("J'ai pas compris ce que je dois faire là...");
		}
		map[action]();
    }
    
	// Bienvenue
    [Actions.WELCOME]() {
        this.app.ask("Bonjour maître, comment puis-je vous être utile ?");
    }

    [Actions.TIMING] () {		
	
        let time = this.app.getArgument("time");
        let jiraTask = this.app.getArgument("jira-task");
		
		console.log("time = " + time);
		console.log("jira-task = " + jiraTask);
		
		this.jira.issue.addWorkLog({
			issueKey: 'PAO-1',
			worklog: {
				"self": "http://192.168.81.209:8080/rest/api/2/issue/10000/worklog/10000",
				"author": {
					"self": "http://192.168.81.209:8080/rest/api/2/user?username=Azerty",
					"name": "CCCC",
					"key": "azerty",
					"emailAddress": "azeqsdaze@qqsd.com",
					"avatarUrls": {
						"48x48": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=48",
						"24x24": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=24",
						"16x16": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=16",
						"32x32": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=32"
					},
					"displayName": "BBBB",
					"active": true,
					"timeZone": "GMT"
				},
				"updateAuthor": {
					"self": "http://192.168.81.209:8080/rest/api/2/user?username=Azerty",
					"name": "AAAAA",
					"key": "azerty",
					"emailAddress": "azeqsdaze@qqsd.com",
					"avatarUrls": {
						"48x48": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=48",
						"24x24": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=24",
						"16x16": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=16",
						"32x32": "https://www.gravatar.com/avatar/1f3b342d3c59c1177747e742fd4f1485?d=mm&s=32"
					},
					"displayName": "Lolol",
					"active": true,
					"timeZone": "GMT"
				},
				"comment": "",
				"created": "2018-04-16T21:00:40.035+0000",
				"updated": "2018-04-16T21:00:40.035+0000",
				"started": "2018-04-16T21:00:00.000+0000",
				"timeSpent": "8h",
				"id": "10000",
				"issueId": "10000"
			}
		}, function(error, issue) {
			console.log(error);
			console.log(issue);
		});
		
		this.app.talk("C'est bon");		
        
    }    
}

module.exports = {
	Jira: Jira
};