(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsController',
        function (
            $scope,
            $http,
            $timeout,
            config
        ) {

            $scope.table = {
                filter: null,
                config: {
                    url: config.urls.accompagnements
                }
            };

        });

}(window, window.angular));
