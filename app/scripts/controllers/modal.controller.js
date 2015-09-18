(function (global, angular) {
    'use strict';

    angular.module('campus.app').controller('modalController',
        function (
            $scope,
            $timeout,
            close
        ) {
            $scope.show = false;

            $timeout(show, 10);

            $scope.close = function() {
                hide();
                $timeout(close, 600);
            };

            function show() {
                $scope.show = true;
            }

            function hide() {
                $scope.show = false;
            }

        });

}(window, window.angular));
