(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('homeController',
        function (
            config,
            $scope,
            $http
        ) {

            $http.get(config.urls.lastSessions).then(function(res) {
                $scope.lastSessions = res.data;
            });

            $scope.reporting = {
                options: [{
                    label: 'Nombre de formations continues',
                    id: 'formationsContinues'
                }, {
                    label: 'Nombre de sessions ouvertes',
                    id: 'sessionsOuvertes'
                }, {
                    label: 'Budget dépensé en formation',
                    id: 'budgetDepenseFormation'
                }],
                from: {
                    value: null,
                    opened: false
                },
                to: {
                    value: null,
                    opened: false
                }
            };

            $scope.open = function(name) {
                $scope.reporting[name].opened = true;
            };
        });

}(window, window.angular));