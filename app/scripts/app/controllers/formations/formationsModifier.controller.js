(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsModifierController',
        function (
            $scope,
            $http,
            $routeParams,
            $timeout,
            appStateService,
            notificationService,
            historyService,
            formatterService,
            config,
            FORMDATAS
        ) {

            var ID = $routeParams.id;

            $scope.opts = FORMDATAS;

            $scope.initialized = false;

            $http({
                    method: 'GET',
                    url: config.urls.formationsDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            function onGetRequestSuccess(res) {
                $scope.model = formatDatas(res.data);
                $timeout(function() {
                    $scope.initialized = true;
                });
            }

            function onGetRequestError() {
                notificationService.warn('Erreur lors de la récupération des données de l\'action ' + ID + '.');
                historyService.back();
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }
        });

}(window, window.angular));
