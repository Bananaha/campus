(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('archivesController',
        function (
            $scope,
            config,
            appStateService,
            ACTIONS
        ) {

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.archives,
                    cols: [{
                        label: 'Intitulé',
                        key: 'intitule',
                        sort: true,
                        klass: 'col-1',
                        link: 'formation'
                    }, {
                        label: 'Nb Sessions',
                        key: 'sessions',
                        sort: true,
                        klass: 'w-90'
                    }, {
                        label: 'Auteur',
                        key: 'auteurNom',
                        sort: true,
                        klass: 'w-100',
                        link: 'utilisateur'
                    }, {
                        label: 'Action',
                        key: 'action',
                        sort: true,
                        klass: 'w-70'
                    }, {
                        actions: ['desarchiver'],
                        klass: 'w-30'
                    }, {
                        label: 'Type',
                        key: 'type',
                        sort: true,
                        klass: 'w-70'
                    }]
                }
            };

            $scope.filtersSettings = {
                type: true,
                archive: true
            };

            appStateService.isLoading(false);

        });

}(window, window.angular));
