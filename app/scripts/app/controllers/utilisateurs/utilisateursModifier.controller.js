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
            formDatasService,
            config
        ) {

            var ID = $routeParams.id;

            $scope.permissions = formDatasService.get().permissions;

            $scope.initialized = false;

            $http({
                    method: 'GET',
                    url: config.urls.utilisateursDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            function onGetRequestSuccess(res) {
                $scope.model = formatterService.format(res.data);
                $timeout(function() {
                    $scope.initialized = true;
                });
            }

            function onGetRequestError() {
                notificationService.warn('Erreur lors de la récupération de l\'utilisateur ' + ID + '.');
                historyService.back();
            }

            appStateService.isLoading(false);

        });

}(window, window.angular));
