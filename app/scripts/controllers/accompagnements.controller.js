(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            config,
            appStateService
        ) {

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.accompagnements,
                    cols: [{
                        label: 'Intitulé',
                        key: 'intitule',
                        sort: true,
                        klass: 'col-1',
                        action: 'detail'
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

            appStateService.isLoading(false);

        });

}(window, window.angular));
