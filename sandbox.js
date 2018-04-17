'use strict';

let JiraClient = require('jira-connector');

let jira = new JiraClient( {
    host: '192.168.81.209',
	port: '8080',
	protocol: 'http',
    basic_auth: {
        username: 'Azerty',
        password: 'azerty'
    }
});

jira.issue.addWorkLog({
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