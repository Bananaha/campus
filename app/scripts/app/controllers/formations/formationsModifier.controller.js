(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsModifierController',
        function (
            $scope,
            $http,
            $routeParams,
            notificationService,
            historyService,
            formatterService,
            config
        ) {

            var ID = $routeParams.id;

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
