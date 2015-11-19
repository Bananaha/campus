(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('loginController',
        function (
            $scope,
            $http,
            $location,
            notificationService,
            userService,
            config
        ) {

            $scope.model = {};

            userService.set(null);

            $scope.forgottenPassword = function() {
                notificationService.warn('Veuillez contacter votre administrateur de site.');
            };

            $scope.submit = function() {
                sendRequest();
            };

            function sendRequest() {
                $http({
                    method: 'POST',
                    url: config.urls.login,
                    params: $scope.model
                })
                .then(onSubmitSuccess, onSubmitError);
            }

            function onSubmitSuccess(res) {
                userService.set(res.data);
                $location.url('/home');
            }

            function onSubmitError() {
                notificationService.warn('Identifiants invalides.');
            }

        });

}(window, window.angular));
