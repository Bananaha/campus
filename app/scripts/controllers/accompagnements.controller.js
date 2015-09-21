(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsController',
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
                    url: config.urls.accompagnements,
                    cols: [{
                        label: 'Intitulé',
                        key: 'intitule',
                        sort: true,
                        klass: 'col-1'
                    }, {
                        label: 'Auteur',
                        key: 'auteur',
                        sort: true,
                        klass: 'w-100'
                    }, {
                        actions: ['modify', 'delete', 'archive'],
                        klass: 'w-90'
                    }, {
                        label: 'N° Action',
                        key: 'action',
                        sort: true,
                        klass: 'w-90'
                    }]
                }
            };

            appLoaderService.set(false);

        });

}(window, window.angular));
