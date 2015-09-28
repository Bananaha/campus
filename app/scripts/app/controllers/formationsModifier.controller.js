(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsModifierController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $route,
            $location,
            config
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.formationsDetails,
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
                ['from', 'to'].forEach(function(key) {
                    if (datas[key]) {
                        datas[key] = new Date(datas[key]);
                    }
                });
                return datas;
            }

        });

}(window, window.angular));
