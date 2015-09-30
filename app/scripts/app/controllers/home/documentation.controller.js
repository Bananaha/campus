(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('documentationController',
        function (
            config,
            $scope,
            $http
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.documentation,
                    params: {
                        from: 0,
                        size: 6
                    }
                })
                .then(function(res) {
                    onResponse(res.data);
                });

            function onResponse(data) {
                $scope.docs = data;
            }
        });

}(window, window.angular));