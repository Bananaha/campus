(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsController',
        function (
        	$scope,
            config,
            appStateService,
            ACTIONS
        ) {

        	 $scope.filters = ACTIONS.map(function(action) {
                return {
                    label: action.label,
                    value: action.id
                };
            });

            $scope.table = {
                filters: {},
                config: {
                    url: config.urls.formations,
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
                        actions: ['modify', 'delete', 'archive'],
                        klass: 'w-70'
                    }, {
                        label: 'Type',
                        key: 'type',
                        sort: true,
                        klass: 'w-70'
                    }]
                }
            };

            appStateService.isLoading(false);

        });

}(window, window.angular));