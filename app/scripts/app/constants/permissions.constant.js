(function (global, angular) {
    'use strict';

    angular.module('campus.app').constant('PERMISSIONS',
        [{
            label: 'Standard',
            id: 0
        }, {
            label: 'Admin',
            id: 1
        }, {
            label: 'Super admin',
            id: 2
        }]
    );

}(window, window.angular));