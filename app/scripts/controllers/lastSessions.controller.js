(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('lastSessionsController',
        function (
            config,
            $scope,
            $http
        ) {
            var data = {
                from: 0,
                size: 3
            };

            $http({
                    method: 'GET',
                    url: config.urls.lastSessions,
                    params: data
                })
                .then(function(res) {
                    onResponse(res.data);
                });

            function onResponse(data) {
                console.log(data);
                $scope.lastSessions = data;
            }
        });

}(window, window.angular));