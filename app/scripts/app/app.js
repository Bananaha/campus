(function (global, angular) {
    'use strict';

    angular.module('campus.app', [
        'ngRoute',
        'ngMessages',
        'ui.bootstrap',
        'LocalStorageModule',
        'angularModalService',
        '720kb.tooltips'
    ])
    .config(function(
            $routeProvider,
            localStorageServiceProvider,
            tooltipsConfigProvider,
            datepickerPopupConfig
        ) {

            var basePath = '';

            localStorageServiceProvider.setPrefix('campusApp');

            datepickerPopupConfig.clearText = 'Annuler';
            datepickerPopupConfig.closeText = 'Fermer';
            datepickerPopupConfig.currentText = 'Aujourd\'hui';
            datepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
            datepickerPopupConfig.showButtonBar = false;

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
                when('/accompagnements/:id', {
                    templateUrl: basePath + 'accompagnements-details.html',
                    controller: 'accompagnementsDetailsController'
                }).
                when('/accompagnements/:id/modifier', {
                    templateUrl: basePath + 'accompagnements-modifier.html',
                    controller: 'accompagnementsModifierController'
                }).
                when('/users', {
                    templateUrl: basePath + 'users.html',
                    controller: 'usersController'
                }).
                when('/users/:id', {
                    templateUrl: basePath + 'users-details.html',
                    controller: 'usersDetailsController'
                }).
                when('/users/:id/modifier', {
                    templateUrl: basePath + 'users-modifier.html',
                    controller: 'usersModifierController'
                }).
                when('/archives', {
                    templateUrl: basePath + 'archives.html',
                    controller: 'archivesController'
                }).
                otherwise({
                    redirectTo: '/home'
                });

            tooltipsConfigProvider.options({
              speed: 'fast',
              size: 'small'
            });
        }
    );

}(window, window.angular));
