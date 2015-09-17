(function (global, angular) {
    'use strict';

    angular.module('campus.app', [
        'ngRoute',
        'ngMessages',
        'ui.bootstrap'
    ])
    .config(function(
            $routeProvider
        ) {

            var basePath = '';

            $routeProvider.
                when('/home', {
                    templateUrl: basePath + 'home.html',
                    controller: 'homeController'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }
    );

}(window, window.angular));
