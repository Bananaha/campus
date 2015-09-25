(function (global, angular) {
    'use strict';

    angular.module('campus.app').constant('PERMISSIONS',
        [{
            label: 'Standard',
            value: 0
        }, {
            label: 'Admin',
            value: 1
        }, {
            label: 'Super admin',
            value: 2
        }]
    );

}(window, window.angular));