(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('utilisateursController',
        function (
            $scope,
            $http,
            $timeout,
            config,
            appStateService
        ) {

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.utilisateurs,
                    cols: [{
                        label: 'Nom',
                        key: 'nom',
                        sort: true,
                        klass: 'w-100',
                        action: 'detail'
                    }, {
                        label: 'Prénom',
                        key: 'prenom',
                        sort: true,
                        klass: 'w-100',
                        action: 'detail'
                    }, {
                        label: 'Entité',
                        key: 'entite',
                        sort: true,
                        klass: 'col-1'
                    }, {
                        actions: ['modify', 'delete'],
                        klass: 'w-70'
                    }, {
                        label: 'Droits d\'accès',
                        key: 'permission',
                        sort: true,
                        klass: 'w-100'
                    }]
                }
            };

            appStateService.isLoading(false);

        });

}(window, window.angular));
