(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('usersController',
        function (
            $scope,
            $http,
            $timeout,
            config,
            appLoaderService
        ) {

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.users,
                    cols: [{
                        label: 'Nom',
                        key: 'nom',
                        sort: true,
                        klass: 'w-100'
                    }, {
                        label: 'Prénom',
                        key: 'prenom',
                        sort: true,
                        klass: 'w-100'
                    }, {
                        label: 'Entité',
                        key: 'entite',
                        sort: true,
                        klass: 'col-1'
                    }, {
                        actions: ['modify', 'delete'],
                        klass: 'w-70'
                    }, {
                        label: 'Admin',
                        key: 'admin',
                        sort: true,
                        klass: 'w-70'
                    }]
                }
            };

            appLoaderService.set(false);

        });

}(window, window.angular));
