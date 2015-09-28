(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('utilisateursModifierController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $location,
            config,
            appStateService,
            PERMISSIONS

        ) {

            $scope.permissions = PERMISSIONS.map(function(permission) {
                return {
                    label: permission.label,
                    value: permission.id
                }
            });

            $http({
                    method: 'GET',
                    url: config.urls.utilisateursDetails,
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
