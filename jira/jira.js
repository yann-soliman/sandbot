'use strict';

process.env.DEBUG = 'actions-on-google:*';
const JiraClient = require('jira-connector');
const DateUtils = require('date-and-time');

class Jira {

    constructor() {
        this.jira = new JiraClient({
            host: 'localhost',
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
    async addWorkLog(issueKey, timeSpent, date) {

        console.log("adding worklog...");
        console.log("issueKey = " + issueKey);
        console.log("timeSpent = " + timeSpent);
        console.log("date = " + date);

        return this.jira.issue.addWorkLog({
                issueKey: issueKey,
                worklog: {
                    "started": DateUtils.format(date, 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'), //"2018-04-16T21:00:00.000+0000",
                    "timeSpent": timeSpent
                }
            }
        );

    }

    // Ajoute un commentaire sur la tâche
    // issueKey : la clé de la tâche (ex : PAO-12345)
    // comment : le commentaire à ajouter
    async comment(issueKey, comment) {

        console.log("adding comment...");
        console.log("issueKey = " + issueKey);
        console.log("comment = " + comment);

        return this.jira.issue.addComment({
                issueKey: issueKey,
                comment: comment
            },
        );
    }
}

module.exports = {
    Jira: Jira
};