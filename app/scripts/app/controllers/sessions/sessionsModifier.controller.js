(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('sessionsModifierController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $route,
            $location,
            formatterService,
            config,
            FORMDATAS
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.sessionsDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            $scope.opts = FORMDATAS;

            function onGetRequestSuccess(res) {
                $scope.model = res.data;
            }

            function onGetRequestError() {
                $location.url('/formations');
            }
        });

}(window, window.angular));
