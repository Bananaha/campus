(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('documentationController',
        function (
            config,
            $scope,
            $http
        ) {
            var data = {
                from: 0,
                size: 6
            };

            $http({
                    method: 'GET',
                    url: config.urls.documentation,
                    params: data
                })
                .then(function(res) {
                    onResponse(res.data);
                });

            function onResponse(data) {
                console.log(data);
                $scope.docs = data;
            }
        });

}(window, window.angular));