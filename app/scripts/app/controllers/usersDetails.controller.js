(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('usersDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            config,
            appStateService
        ) {

            appStateService.isLoading(false);

        });

}(window, window.angular));
