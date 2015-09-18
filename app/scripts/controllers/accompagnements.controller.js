(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsController',
        function (
            $scope,
            $http,
            config
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.accompagnements,
                    params: {
                        from: 0,
                        size: 60
                    }
                })
                .then(function(res) {
                    onResponse(res.data);
                });

            function onResponse(data) {
                $scope.actions = data;
            }

        });

}(window, window.angular));
