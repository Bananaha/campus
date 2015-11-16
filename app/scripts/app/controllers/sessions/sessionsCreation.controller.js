(function (angular) {
    'use strict';

    angular.module('campus.app')
    .controller('sessionsCreationController',
        function (
            $scope,
            $http,
            $routeParams,
            $timeout,
            notificationService,
            formatterService,
            historyService,
            config,
            ACTIONS,
            FORMDATAS
        ) {

            var ID = $routeParams.id;

            $scope.initialized = false;

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
                    dispositif = res.data.dispositif;

                allowSessionCreation = ACTIONS.some(function(action) {
                    return action.id === dispositif && !action.isSession;
                });

                if (allowSessionCreation) {
                    $scope.model.dispositif = res.data.dispositif;
                    fillInheritedData(res.data);
                } else {
                    notificationService.warn('Vous ne pouvez pas créer de session pour cette action.');
                    historyService.back();
                }

                $timeout(function() {
                    $scope.initialized = true;
                });
            }

            function onGetDetailError() {
                historyService.back();
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

}(window.angular));
