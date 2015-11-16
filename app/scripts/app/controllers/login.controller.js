(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('loginController',
        function (
            $scope,
            $http,
            $location,
            userService,
            config
        ) {

            userService.set(null);

            $scope.forgottenPassword = function() {
                console.log('forgottenPassword');
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
                console.log('onSubmitError');
            }

        });

}(window, window.angular));
