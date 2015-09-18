(function (global, angular) {
    'use strict';

    angular.module('campus.app', [
        'ngRoute',
        'ngMessages',
        'ui.bootstrap',
        'angularModalService',
        '720kb.tooltips'
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
                when('/training', {
                    templateUrl: basePath + 'training.html',
                    controller: 'trainingController'
                }).
                when('/accompagnements', {
                    templateUrl: basePath + 'accompagnements.html',
                    controller: 'accompagnementsController'
                }).
                when('/users', {
                    templateUrl: basePath + 'users.html',
                    controller: 'usersController'
                }).
                when('/archives', {
                    templateUrl: basePath + 'archives.html',
                    controller: 'archivesController'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }
    );

}(window, window.angular));
