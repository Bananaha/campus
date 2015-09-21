(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('archivesController',
        function (
            $scope,
            $http,
            $timeout,
            config,
            appLoaderService
        ) {

            $scope.filters = [{
                label: 'CPF',
                value: 'CPF'
            }, {
                label: 'Employeur',
                value: 'employeur'
            }, {
                label: 'CIF',
                value: 'CIF'
            }];

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.archives,
                    cols: [{
                        label: 'Intitulé',
                        key: 'intitule',
                        sort: true,
                        klass: 'col-1'
                    }, {
                        label: 'Nb Sessions',
                        key: 'sessions',
                        sort: true,
                        klass: 'w-80'
                    }, {
                        label: 'Auteur',
                        key: 'auteur',
                        sort: true,
                        klass: 'w-100'
                    }, {
                        label: 'Action',
                        key: 'action',
                        sort: true,
                        klass: 'w-70'
                    }, {
                        actions: ['details', 'modify', 'delete'],
                        klass: 'w-70'
                    }, {
                        label: 'Nature',
                        key: 'nature',
                        sort: true,
                        klass: 'w-70'
                    }]
                }
            };

            appLoaderService.set(false);

        });

}(window, window.angular));
