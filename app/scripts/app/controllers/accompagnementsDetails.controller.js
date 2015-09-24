(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $route,
            $location,
            config,
            usersService
        ) {

            var that = this,
                changeTimeout,
                usersInitialized = false,
                populations = ['formateurs', 'participants'],
                populationLoaded = {},
                listKeys = [{
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
                    url: config.urls.accompagnementsDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            $scope.$watch('model', onModelChange, true);

            $scope.modifier = function() {
                $location.url('/accompagnements/' + $routeParams.id + '/modifier');
            };

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
                $http({
                    method: 'POST',
                    url: config.urls.accompagnementsDetailsUpdateUser,
                    params: params
                });
            }

            function onGetRequestSuccess(res) {
                $scope.accompagnement = formatDatas(res.data);

                populations.forEach(function(population) {
                    if (res.data[population] && res.data[population].length) {
                        usersService
                            .getUsers(res.data[population])
                            .then(onGetUsers.bind(that, population));
                    } else {
                        populationLoaded[population] = true;
                    }
                });

                updateUsersVisibility();
            }

            function onGetRequestError() {
                $location.url('/accompagnements');
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
                scope.intitule = datas.intitule;
                scope.action = datas.action;
                scope.auteur = datas.auteur;

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