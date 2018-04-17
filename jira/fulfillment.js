'use strict';

process.env.DEBUG = 'actions-on-google:*';
let async = require('async');
const { DialogflowApp } = require('actions-on-google');
const { Jira } = require('./jira.js');
const { Normalizer } = require('./normalizer.js');

const Actions = {
    WELCOME: "input.welcome",
    TIMING: 'timing',
    COMMENT: 'comment',
    QUIT: 'quit'
};

const Parameters = {
    ISSUE_KEY: "issue-key",
    TIME_SPENT: "time-spent",
    UNIT_TIME_SPENT: "unit-time-spent",
    DATE: "date",
    COMMENT: 'comment',
};

class Fulfillment {

    constructor (req, resp) {
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Body: ${JSON.stringify(req.body)}`);

        this.app = new DialogflowApp({ request: req, response: resp });
        this.jira = new Jira();
    }

    // Dispatch vers la bonne méthode en fonction de l'intention
    dispatch () {
        const map = this;
        const action = this.app.getIntent();
        if (!action) {
            return this.app.ask("Je n'ai pas compris ce que je dois faire là...");
        }
        map[action]();
    }

    // Bienvenue
    [Actions.WELCOME]() {
        this.app.ask("Bonjour maître, comment puis-je vous être utile ?");
    }

    // Log un temps passé sur une tâche
    [Actions.TIMING] () {

        let issueKey = this.app.getArgument(Parameters.ISSUE_KEY);
        let timeSpent = this.app.getArgument(Parameters.TIME_SPENT);
        let unitTimeSpent = this.app.getArgument(Parameters.UNIT_TIME_SPENT);
        //TODO: voir comment les dates sont envoyées
        let date = this.app.getArgument(Parameters.DATE);

        console.log("issueKey = " + issueKey);
        console.log("timeSpent = " + timeSpent);
        console.log("unitTimeSpent = " + unitTimeSpent);
        console.log("date = " + date);

        let normalizedIssueKey = Normalizer.assembleString(issueKey)
        let jiraTimeSpent = Normalizer.toJiraTimeSpent(timeSpent, unitTimeSpent);

        async.series([
            step => this.jira.addWorkLog(issueKey, jiraTimeSpent, date, step)
        ],
            err => {
                console.log("Erreur dans le fulfillment du timing : " + err);
                this.app.talk("Oups... petite erreur technique lors du timing de la tâche...");
            }
        );

        //TODO: Déplacer la suite dans le async.series ?
        this.app.talk("C'est bon");

    }

    // Ajoute un commentaire sur une tâche
    [Actions.COMMENT] () {

        //TODO: normalize this
        let issueKey = this.app.getArgument(Parameters.ISSUE_KEY);
        let comment = this.app.getArgument(Parameters.COMMENT);

        console.log("issueKey = " + issueKey);
        console.log("comment = " + comment);

        async.series([
                step => this.jira.comment(jiraTask, comment, step)
            ],
            err => {
                console.log("Erreur dans le fulfillment de l'ajout d'un commentaire : " + err);
                this.app.talk("Oups, petite erreur technique lors de l'ajout du commentaire sur la tâche...");
            }
        );

        //TODO: Déplacer la suite dans le async.series ?
        this.app.ask("C'est fait ! Autre chose maître ?");

    }

    // Sortir
    [Actions.QUIT] () {
        this.app.talk("A bientôt maître.");
    }
}

module.exports = {
    Fulfillment: Fulfillment
};