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
            config
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.sessionsDetails,
                    params: {
                        id: $routeParams.id
                    }
                })
                .then(onGetRequestSuccess, onGetRequestError);

            function onGetRequestSuccess(res) {
                $scope.model = formatDatas(res.data);
            }

            function onGetRequestError() {
                $location.url('/formations');
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

        });

}(window, window.angular));
