(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $route,
            $location,
            config,
            utilisateursService,
            dbActionsService,
            actionsService
        ) {

            var changeTimeout,
                populations = ['formateurs', 'stagiaires'],
                listKeys = [{
                    label: 'Type',
                    key: 'type'
                }, {
                    label: 'Client',
                    key: 'client'
                }, {
                    label: 'Durée',
                    key: 'duree'
                }, {
                    label: 'Activité',
                    key: 'activite'
                }, {
                    label: 'Produit',
                    key: 'produit'
                }, {
                    label: 'Date de début',
                    key: 'from',
                    date: true
                }, {
                    label: 'Date de fin',
                    key: 'to',
                    date: true
                }];

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

            function onParticipantsChange() {
                $timeout.cancel(changeTimeout);
                changeTimeout = $timeout(saveUsers, 200);
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
                var scope = {};
                scope.id = datas.id;
                scope.intitule = datas.intitule;
                scope.action = datas.action;
                scope.auteur = datas.auteur;
                scope.cout = datas.cout;

                scope.list = listKeys.map(function(obj) {
                    var value;
                    if (datas[obj.key]) {
                        value = datas[obj.key];
                        if (obj.date) {
                            value = moment(value).format('DD/MM/YYYY');
                        }
                        return {
                            label: obj.label,
                            value: value
                        };
                    }
                });
                return scope;
            }

        });

}(window, window.angular, window.moment));
