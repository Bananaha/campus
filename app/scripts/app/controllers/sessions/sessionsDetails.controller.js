(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('sessionsDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            historyService,
            notificationService,
            dbActionsService,
            actionsService,
            formatterService,
            config
        ) {

            var ID = $routeParams.id,
                changeTimeout,
                defaultCout,
                populations = ['formateurs', 'stagiaires'];

            $scope.initialized = false;

            $scope.costChanged = false;

            $scope.participants = {
                stagiaires: [],
                formateurs: []
            };

            $scope.session = {};

            $scope.$watch('participants', onParticipantsChange, true);
            $scope.$watch('session.cout', onCostChange, true);

            getDatas();

            $scope.unarchive = function() {
                if ($scope.session.archive) {
                    dbActionsService
                        .unarchive(config.urls.sessions, ID)
                        .then(onUnarchive);
                }
            };

            $scope.saveCost = function() {
                if ($scope.costChanged) {
                    saveCost();
                }
            };

            $scope.cancelCost = function() {
                if ($scope.costChanged) {
                    console.log('cancelCost');
                    $scope.session.cout = JSON.parse(defaultCout);
                    $timeout(function() {
                        $scope.costChanged = false;
                    });
                }
            };

            function getDatas() {
                $http({
                    method: 'GET',
                    url: config.urls.sessionsDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);
            }

            function onCostChange() {
                if ($scope.initialized) {
                    console.log('onCostChange');
                    $scope.costChanged = true;
                }
            }

            function onUnarchive() {
                $scope.session.archive = false;
            }

            function onParticipantsChange() {
                if ($scope.initialized) {
                    $timeout.cancel(changeTimeout);
                    changeTimeout = $timeout(saveUsers, 200);
                }
            }

            function saveUsers() {
                var params = {
                    id: ID,
                    participants: {}
                };
                populations.forEach(function(key) {
                    params.participants[key] = $scope.participants[key].map(function(user) {
                        return user.id;
                    });
                });
                dbActionsService
                    .update(config.urls.sessionsModification, params)
                    .then(onUpdateSuccess, onUpdateError);
            }

            function saveCost() {
                var params = {
                    id: ID,
                    cout: $scope.session.cout
                };
                dbActionsService
                    .update(config.urls.sessionsModification, params)
                    .then(onUpdateSuccess, onUpdateError);
            }

            function onUpdateSuccess(res) {
                if (res.data && res.data.cout) {
                    $scope.session.cout = res.data.cout;
                    defaultCout = JSON.stringify($scope.session.cout);
                    $timeout(function() {
                        $scope.costChanged = false;
                    });
                }
            }

            function onUpdateError() {
                notificationService.warn('Erreur lors de la mise à jour de la session #' + ID);
            }

            function onGetDetailSuccess(res) {
                $scope.session = formatDatas(res.data);
                $scope.participants = res.data.participants;
                $scope.hasUsers = true;

                if ($scope.session.cout) {
                    console.log('onGetDetailSuccess', $scope.session.cout);
                    defaultCout = JSON.stringify($scope.session.cout);
                }

                if ($scope.session.type === 'CIF') {
                    $scope.coutSettings = {
                        start: res.data.dateDebut,
                        end: res.data.dateFin
                    };
                }

                $timeout(function() {
                    $scope.initialized = true;
                });
            }

            function onGetDetailError() {
                notificationService.warn('Erreur lors de la récupération des données de la session ' + ID + '.');
                historyService.back();
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

        });

}(window, window.angular));
