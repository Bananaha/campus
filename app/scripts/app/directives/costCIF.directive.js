(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('costCIF', function () {
        return {
            restrict: 'E',
            scope: {
                settings: '='
            },
            templateUrl: 'cost.html',
            link: function ($scope) {
            }
        };
    });
}(window, window.angular));
