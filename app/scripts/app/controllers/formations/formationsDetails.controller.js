(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            config,
            historyService,
            dbActionsService,
            actionsService,
            formatterService
        ) {

            var ID = $routeParams.id,
                changeTimeout,
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
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.sessions,
                    params: {
                        action: ID,
                        archives: false
                    },
                    cols: [{
                        label: 'Ref',
                        key: 'reference',
                        sort: true,
                        klass: 'col-1',
                        link: 'session'
                    }, {
                        label: 'Date de début',
                        key: 'from',
                        sort: true,
                        klass: 'w-90'
                    }, {
                        label: 'Date de fin',
                        key: 'to',
                        sort: true,
                        klass: 'w-90'
                    }, {
                        label: 'auteur',
                        key: 'auteurNom',
                        sort: true,
                        klass: 'w-100',
                        link: 'utilisateur'
                    }, {
                        actions: ['modify', 'delete', 'archive'],
                        klass: 'w-70'
                    }, {
                        label: 'N°',
                        key: 'session',
                        sort: true,
                        klass: 'w-70',
                        link: 'session'
                    }]
                }
            };

            $scope.filtersSettings = {
                archive: true
            };

            $scope.unarchive = function() {
                if ($scope.formation.archive) {
                    dbActionsService
                        .unarchive(config.urls.formations, ID)
                        .then(onUnarchive);
                }
            };

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
                    id: ID
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

                $scope.hasSessions = !actionConfig.isSession;

                if (actionConfig.isSession) {
                    $scope.hasUsers = true;
                    $scope.participants = res.data.participants;
                }

                if (actionConfig.showCost) {
                    $scope.showCost = true;
                }

                $scope.$watch('participants', onParticipantsChange, true);

                $timeout(function() {
                    $scope.$apply();
                    initialized = true;
                });
            }

            function onGetDetailError() {
                notificationService.warn('Erreur lors de la récupération des données de l\'action ' + ID + '.')
                historyService.back();
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

        });

}(window, window.angular, window.moment));
