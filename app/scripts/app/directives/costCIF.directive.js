(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('costCIF', function (
            $timeout
        ) {
            return {
                restrict: 'E',
                scope: {
                    settings: '='
                },
                templateUrl: 'cost.html',
                link: function ($scope, element) {
                    console.log(element);
                }
            };
        }
    );
}(window, window.angular));
