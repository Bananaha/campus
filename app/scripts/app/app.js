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
                when('/formations', {
                    templateUrl: basePath + 'formations.html',
                    controller: 'formationsController'
                }).
                when('/formations/:id', {
                    templateUrl: basePath + 'formations-details.html',
                    controller: 'formationsDetailsController'
                }).
                when('/formations/:id/modifier', {
                    templateUrl: basePath + 'formations-modifier.html',
                    controller: 'formationsModifierController'
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
                when('/utilisateurs', {
                    templateUrl: basePath + 'utilisateurs.html',
                    controller: 'utilisateursController'
                }).
                when('/utilisateurs/:id', {
                    templateUrl: basePath + 'utilisateurs-details.html',
                    controller: 'utilisateursDetailsController'
                }).
                when('/utilisateurs/:id/modifier', {
                    templateUrl: basePath + 'utilisateurs-modifier.html',
                    controller: 'utilisateursModifierController'
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
