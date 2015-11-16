(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('lastSessionsController',
        function (
            $scope,
            $http,
            notificationService,
            userService,
            config
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.sessions,
                    params: {
                        user: userService.ID,
                        size: 3
                    }
                })
                .then(onGetSessionsSuccess, onGetSessionsError);

            function onGetSessionsSuccess(res) {
                $scope.lastSessions = res.data;
            }

            function onGetSessionsError() {
                notificationService.warn('Erreur lors de la récupération des dernières sessions.');
            }
        });

}(window, window.angular));
