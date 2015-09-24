(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('lastSessionsController',
        function (
            config,
            $scope,
            $http
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.lastSessions,
                    params: {
                        from: 0,
                        size: 3
                    }
                })
                .then(function(res) {
                    onResponse(res.data);
                });

            function onResponse(data) {
                $scope.lastSessions = data;
            }
        });

}(window, window.angular));