(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('form', function () {
        return {
            restrict: 'A',
            scope: {
                conf: "=form"
            },
            transclude: false,
            link: function ($scope, element) {
                console.log(element, $scope.conf);

                $scope.test = "yoMama";
            }
        };
    });

}(window, window.angular));
