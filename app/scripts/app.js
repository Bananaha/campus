'use strict';

/**
 * Main module of the application.
 */
angular.module('campus.app', [
        'ngRoute',
        'ngMessages',
        'angularModalService'
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
