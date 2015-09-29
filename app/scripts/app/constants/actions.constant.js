(function (global, angular) {
    'use strict';

    angular.module('campus.app').constant('ACTIONS',
        [{
            label: 'CPF',
            id: 'CPF',
            abbr: 'CPF'
        }, {
            label: 'CIF',
            id: 'CIF',
            abbr: 'CIF'
        }, {
            label: 'Employeur',
            id: 'employeur',
            abbr: 'Empl.'
        }, {
            label: 'Accompagnement',
            id: 'accompagnement',
            abbr: 'Acc.',
            isSession: true,
            showCost: true
        }]
    );

}(window, window.angular));
