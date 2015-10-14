(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('utilisateursModifierController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            appStateService,
            notificationService,
            historyService,
            config,
            FORMDATAS
        ) {

            var ID = $routeParams.id;

            $scope.permissions = FORMDATAS.permissions.map(function(permission) {
                return {
                    label: permission.label,
                    value: permission.id
                }
            });

            $http({
                    method: 'GET',
                    url: config.urls.utilisateursDetails,
                    params: {
                        id: ID
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
                notificationService.warn('Erreur lors de la récupération de l\'utilisateur ' + ID + '.');
                historyService.back();
            }

            appStateService.isLoading(false);

        });

}(window, window.angular));
