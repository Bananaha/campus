(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $location,
            config,
            dbActionsService,
            actionsService,
            formatterService
        ) {

            var changeTimeout,
                initialized,
                populations = ['formateurs', 'stagiaires'];

            $scope.participants = {
                stagiaires: [],
                formateurs: []
            };

            $http({
                    method: 'GET',
                    url: config.urls.formationsDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            $scope.$watch('participants', onParticipantsChange, true);

            $timeout(function() {
                initialized = true
            });

            $scope.unarchive = function() {
                if ($scope.formation.archive) {
                    dbActionsService
                        .unarchive(config.urls.formations, $routeParams.id)
                        .then(onUnarchive);
                }
            }

            function onUnarchive() {
                $scope.formation.archive = false;
            }

            function onParticipantsChange() {
                if (initialized) {
                    console.log('onParticipantsChange');
                    $timeout.cancel(changeTimeout);
                    changeTimeout = $timeout(saveUsers, 200);
                }
            }

            function saveUsers() {
                var params = {
                    id: $routeParams.id
                };
                populations.forEach(function(key) {
                    params[key] = $scope.participants[key].map(function(user) {
                        return user.id;
                    });
                });
                dbActionsService
                    .update(config.urls.formationsModification, params)
                    .then(onUpdateSuccess, onUpdateError);
            }

            function onUpdateSuccess(res) {
                if (res.data && res.data.cout) {
                    $scope.formation.cout = res.data.cout;
                }
            }

            function onUpdateError() {
                $scope.formation.cout = {
                    pedagogique: '-',
                    salarial: '-'
                };
            }

            function onGetDetailSuccess(res) {
                var actionConfig = actionsService.getConfig(res.data.type);
                $scope.formation = formatDatas(res.data);

                if (actionConfig.isSession) {
                    $scope.hasUsers = true;
                    $scope.participants = res.data.participants;
                }

                if (actionConfig.showCost) {
                    $scope.showCost = true;
                }
            }

            function onGetDetailError() {
                $location.url('/formations');
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

        });

}(window, window.angular, window.moment));
