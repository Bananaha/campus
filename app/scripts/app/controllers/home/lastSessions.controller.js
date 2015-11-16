(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('lastSessionsController',
        function (
            $scope,
            $http,
            notificationService,
            config
        ) {

            var ID = '1314654dsf';

            $http({
                    method: 'GET',
                    url: config.urls.sessions,
                    params: {
                        user: ID,
                        size: 3
                    }
                })
                .then(onGetSessionsSuccess, onGetSessionsError);

            function onGetSessionsSuccess(res) {
                console.log(res.data);
                $scope.lastSessions = res.data;
            }

            function onGetSessionsError() {
                notificationService.warn('Erreur lors de la récupération des dernières sessions.');
            }
        });

}(window, window.angular));
