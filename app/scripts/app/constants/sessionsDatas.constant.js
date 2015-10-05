(function (global, angular) {
    'use strict';

    angular.module('campus.app').constant('SESSIONSDATAS',
        {
            avisEmployeur: [{
                label: 'En cours',
                value: 'enCours'
            }, {
                label: 'Acceptée',
                value: 'acceptee'
            }, {
                label: 'Refusée',
                value: 'refusee'
            }, {
                label: 'Reportée',
                value: 'reportee'
            }],

            avisFongecif: [{
                label: 'En cours',
                value: 'enCours'
            }, {
                label: 'Acceptée',
                value: 'acceptee'
            }, {
                label: 'Refusée',
                value: 'refusee'
            }, {
                label: 'Reportée',
                value: 'reportee'
            }],

            categorie: [{
                label: 'Formation initiale',
                value: 'initiale'
            }, {
                label: 'Formation continue',
                value: 'continue'
            }],

            horaiteSouhaite: [{
                label: 'PTT',
                value: 'PTT'
            }, {
                label: 'HTT',
                value: 'HTT'
            }],

            organisme: [{
                label: 'Interne',
                value: false
            }, {
                label: 'Externe',
                value: true
            }],

            temps: [{
                label: 'Temps plein',
                value: 'plein'
            }, {
                label: 'Temps partiel',
                value: 'partiel'
            }],

            validation: [{
                label: 'Formation certifiante',
                value: 'certificat'
            }, {
                label: 'Formation qualifiante',
                value: 'qualification'
            }, {
                label: 'Formation diplômante',
                value: 'diplome'
            }],

            nature: [{
                label: 'Adaptation',
                value: 'adaptation'
            }, {
                label: 'Développement',
                value: 'developpement'
            }, {
                label: 'VAE',
                value: 'VAE'
            }, {
                label: 'Bilan de compétences',
                value: 'bilanCompetences'
            }, {
                label: 'Professionnalisation',
                value: 'professionnalisation'
            }]

        }
    );

}(window, window.angular));
