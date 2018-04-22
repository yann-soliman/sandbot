'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { Jira } = require('./jira.js');
const { Normalizer } = require('./normalizer.js');

const Actions = {
    WELCOME: "Default Welcome Intent",
    TIMING: 'timing',
    ASK_ADD_COMMENT: 'ask-add-comment',
    ADD_COMMENT: 'add-comment'
};

const Parameters = {
    ISSUE_NUMBER: "issue-number",
    TIME_SPENT: "time-spent",
    DATE: "date",
    COMMENT: 'comment',
};


const fulfillment = app => {
    app.intent(Actions.WELCOME, conv => {
            conv.ask("Bonjour maître, comment puis-je vous être utile ?")
        }
    );

    // Log un temps passé sur une tâche
    app.intent(Actions.TIMING, conv => timing(conv));

    async function timing(conv) {
        let issueNumber = conv.parameters[Parameters.ISSUE_NUMBER];
        let timeSpent = conv.parameters[Parameters.TIME_SPENT].amount;
        let unitTimeSpent = conv.parameters[Parameters.TIME_SPENT].unit;
        let inputDate = conv.parameters[Parameters.DATE];

        console.log("issueNumber = " + issueNumber);
        console.log("timeSpent = " + timeSpent);
        console.log("unitTimeSpent = " + timeSpent);
        console.log("date = " + inputDate);

        let issueKey = Normalizer.toJiraIssueKey(issueNumber);
        let jiraTimeSpent = Normalizer.toJiraTimeSpent(timeSpent, unitTimeSpent);
        let date = new Date(inputDate);

        let jira = new Jira();

        try {
            await jira.addWorkLog(issueKey, jiraTimeSpent, date);
            conv.ask("D'accord, qu'avez-vous fait d'autre ?");
        }
        catch(err) {
            console.log("Erreur dans le fulfillment du timing : " + JSON.stringify(err));
            conv.close("Oups... petite erreur technique lors du timing de la tâche...");
        }
    }

    // Demande à rajouter un commentaire
    app.intent(Actions.ASK_ADD_COMMENT, conv => {
        // Sauvegarde la clé dans la "session utilisateur"
        conv.data.issueKey = conv.parameters[Parameters.ISSUE_NUMBER];
        conv.ask("Je vous écoute");
    });


    // Ajoute un commentaire sur une tâche
    app.intent(Actions.ADD_COMMENT, conv => Promise.resolve(comment(conv)));

    async function comment(conv) {
        let issueNumber = conv.data.issueKey;
        let comment = conv.query;

        let issueKey = Normalizer.toJiraIssueKey(issueNumber);
        console.log("issueKey = " + issueKey);
        console.log("comment = " + comment);

        let jira = new Jira();

        try {
            await jira.comment(issueKey, comment);
            conv.ask("C'est fait ! Autre chose maître ?");
        } catch(err) {
            console.log("Erreur dans le fulfillment de l'ajout d'un commentaire : " + err);
            conv.close("Oups, petite erreur technique lors de l'ajout du commentaire sur la tâche...");
        }
    }
};

module.exports = {
    fulfillment: fulfillment
};
