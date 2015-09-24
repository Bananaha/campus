(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('historyService',
        function(
            $window,
            $location
        ) {

            var prevRoute,
                currentRoute,
                hasBack = false;

            this.hasBack = function() {
                return hasBack;
            };

            this.back = function() {
                var route;
                if (prevRoute) {
                    $window.history.back();
                } else {
                    route = $location.url().split('/');
                    route.pop();
                    $location.url(route.join('/'));
                }
            };

            this.onLocationChange = function() {
                prevRoute = currentRoute;
                currentRoute = $location.url();
                hasBack = true;
            };

            return this;
        }
    );

}(window, window.angular));
