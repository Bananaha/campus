(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('usersModifierController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $location,
            config,
            appStateService

        ) {

            $scope.permissions = [{
                label: 'Standard',
                value: 0
            }, {
                label: 'Admin',
                value: 1
            }, {
                label: 'Super admin',
                value: 2
            }];

            $http({
                    method: 'GET',
                    url: config.urls.usersDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            function onGetRequestSuccess(res) {
                $scope.model = {
                    nom: res.data.nom,
                    password: res.data.password,
                    permission: res.data.permission,
                    id: res.data.id
                };

                $scope.prenom = res.data.prenom;
            }

            function onGetRequestError() {
                $location.url('/users');
            }

            appStateService.isLoading(false);

        });

}(window, window.angular));
