angular.module('campus.app').constant('FORMDATAS', {
    entites: [
        'B2S AIX',
        'B2S CHALON SAS',
        'B2S DEVELOPPEMENT SAS',
        'B2S LE MANS SAS',
        'B2S PARIS SASU',
        'B2S ROANNE SAS   ',
        'B2S SAS',
        'B2S STRASBOURG SAS',
        'B2S VALENCIENNES SAS',
        'SYMPHONING SAS',
        'SYNOPSYA SAS'
    ],

    services: [
        'Ressources Humaines',
        'Qualité Formation',
        'Direction',
        'Autres fonctions'
    ],

    permission: [{
        label: 'Standard',
        id: 0
    }, {
        label: 'Admin',
        id: 1
    }, {
        label: 'Super admin',
        id: 2
    }],

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

    nature: [{
        label: 'Formation initiale',
        value: 'initiale'
    }, {
        label: 'Formation continue',
        value: 'continue'
    }],

    horaireSouhaite: [{
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
        label: 'Aucune',
        value: 'aucune'
    }, {
        label: 'Formation certifiante',
        value: 'certificat'
    }, {
        label: 'Formation qualifiante',
        value: 'qualification'
    }, {
        label: 'Formation diplômante',
        value: 'diplome'
    }],

    format: [{
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
    }],

    obtention: [{
        label: 'Partielle',
        value: false
    }, {
        label: 'Complète',
        value: true
    }],

    reprisePoste: [{
        label: 'Oui',
        value: true
    }, {
        label: 'Non',
        value: false
    }],

    type: [{
        label: 'Métier',
        value: 'metier'
    }, {
        label: 'Produit',
        value: 'produit'
    }]
});
