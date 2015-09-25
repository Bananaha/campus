(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('usersModifierController',
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
