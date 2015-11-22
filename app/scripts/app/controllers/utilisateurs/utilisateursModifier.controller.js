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

            $scope.permission = formDatasService.get().permission;

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
                var data = ['entites', 'id', 'mail', 'nom', 'password', 'permission', 'prenom', 'service']
                    .reduce(function(obj, key) {
                        if (res.data[key]) {
                            obj[key] = res.data[key];
                        }
                        return obj;
                    }, {});
                console.log(data);
                $scope.model = formatterService.format(data);
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
