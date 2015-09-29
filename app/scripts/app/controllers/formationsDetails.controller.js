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
            dbActionsService
        ) {

            var that = this,
                changeTimeout,
                usersInitialized = false,
                populations = ['formateurs', 'participants'],
                populationLoaded = {},
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

            $scope.model = {
                participants: [],
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

            return;

            $scope.$watch('model', onModelChange, true);

            function onModelChange() {
                if (usersInitialized) {
                    $timeout.cancel(changeTimeout);
                    changeTimeout = $timeout(saveUsers, 200);
                }
            }

            function saveUsers() {
                var params = {
                    id: $routeParams.id
                };
                populations.forEach(function(key) {
                    params[key] = $scope.model[key].map(function(user) {
                        return user.id;
                    });
                });
                dbActionsService
                    .update(config.urls.formationsModification, params)
                    .then(onUpdateSuccess, onUpdateError);
            }

            function onUpdateSuccess(res) {
                if (res.data) {
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
                $scope.formation = formatDatas(res.data);

                populations.forEach(function(population) {
                    if (res.data[population] && res.data[population].length) {
                        utilisateursService
                            .getUsers(res.data[population])
                            .then(onGetUsers.bind(that, population));
                    } else {
                        populationLoaded[population] = true;
                    }
                });

                updateUsersVisibility();
            }

            function onGetDetailError() {
                $location.url('/formations');
            }

            function onGetUsers(population, res) {
                $scope.model[population] = res.data;
                populationLoaded[population] = true;
                updateUsersVisibility();
            }

            function updateUsersVisibility() {
                var allPopulationLoaded = populations.every(function(population) {
                    return populationLoaded[population];
                });
                if (allPopulationLoaded) {
                    $scope.showUsers = true;
                    $timeout(function() {
                        usersInitialized = true;
                    });
                }

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