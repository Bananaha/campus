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
            formatterService,
            config,
            FORMDATAS
        ) {

            var ID = $routeParams.id;

            $scope.permissions = FORMDATAS.permissions;

            $http({
                    method: 'GET',
                    url: config.urls.utilisateursDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            function onGetRequestSuccess(res) {
                console.log(res.data.permission);
                $scope.model = formatterService.format(res.data);
                console.log($scope.model.permission);
            }

            function onGetRequestError() {
                notificationService.warn('Erreur lors de la récupération de l\'utilisateur ' + ID + '.');
                historyService.back();
            }

            appStateService.isLoading(false);

        });

}(window, window.angular));
