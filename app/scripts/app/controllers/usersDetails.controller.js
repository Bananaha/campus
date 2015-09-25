(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('usersDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $location,
            config,
            appStateService
        ) {

            var that = this,
                listKeys = [{
                    label: 'Adresse mail',
                    key: 'mail'
                }, {
                    label: 'Mot de passe',
                    key: 'password'
                }, {
                    label: 'Entité',
                    key: 'entite'
                }, {
                    label: 'Service',
                    key: 'service'
                }, {
                    label: 'Droits d\'accès',
                    key: 'permission'
                }];

            appStateService.isLoading(false);

            $http({
                    method: 'GET',
                    url: config.urls.usersDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            function onGetDetailSuccess(res) {
                $scope.userDetail = formatDatas(res.data);
            }

            function onGetDetailError() {
                $location.url('/users');
            }

            function formatDatas(datas) {
                var scope = {};
                scope.nom = datas.nom;
                scope.prenom = datas.prenom;
                scope.id = datas.id;
                scope.actions = datas.actions;

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

}(window, window.angular));
