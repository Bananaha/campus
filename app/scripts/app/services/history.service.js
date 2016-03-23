


    angular.module('campus.app').factory('historyService',
        function(
            $window,
            $location
        ) {

            var prevRoute,
                currentRoute,
                hasBack = false;

            this.getBack = function() {
                return prevRoute;
            };

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
                if (prevRoute) {
                    hasBack = true;
                }
            };

            return this;
        }
    );



