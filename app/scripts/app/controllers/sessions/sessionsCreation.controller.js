(function (global) {
    'use strict';

    angular.module('campus.app')
    .controller('sessionsCreationController',
        function (
            $scope,
            $http,
            $routeParams,
            notificationService,
            formatterService,
            historyService,
            config,
            ACTIONS,
            FORMDATAS
        ) {

            var ID = $routeParams.id;

            $scope.model = {};

            $scope.opts = FORMDATAS;

            $http({
                    method: 'GET',
                    url: config.urls.formationsDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            function onGetDetailSuccess(res) {
                var allowSessionCreation = false,
                    type = res.data.type;

                allowSessionCreation = ACTIONS.some(function(action) {
                    return action.id === type && !action.isSession;
                });

                if (allowSessionCreation) {
                    $scope.model.type = res.data.type;
                    fillInheritedData(res.data);
                } else {
                    notificationService.warn('Vous ne pouvez pas créer de session pour cette action.')
                    historyService.back();
                }
            }

            function onGetDetailError() {
                historyService.back();
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

            function fillInheritedData(data) {
                var inheritedKeys = ['activite', 'categorie', 'client', 'nature', 'nomOrganisme', 'organisme', 'produit'];
                inheritedKeys.forEach(function(key) {
                    if (angular.isDefined(data[key])) {
                        $scope.model[key] = data[key];
                    }
                });
            }

        });

}(window));
