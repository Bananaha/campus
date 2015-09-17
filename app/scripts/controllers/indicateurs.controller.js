(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('indicateursController',
        function (
            config,
            $scope,
            $http
        ) {

            $http.get(config.urls.indicateurs)
            .then(function(res) {
                onResponse(res.data);
            });

            function onResponse(data) {
                $scope.indicateurs = data;
            }
        });

}(window, window.angular));