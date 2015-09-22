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
            config
        ) {

            var listKeys = [{
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

            $http({
                    method: 'GET',
                    url: config.urls.accompagnementsDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            $scope.modifier = function() {
                $location.url('/accompagnements/' + $routeParams.id + '/modifier');
            };

            function onGetRequestSuccess(res) {
                $scope.accompagnement = formatDatas(res.data);
            }

            function onGetRequestError() {
                $location.url('/accompagnements');
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
