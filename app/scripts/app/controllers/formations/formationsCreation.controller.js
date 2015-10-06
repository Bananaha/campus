(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsCreationController',
        function (
            $scope,
            config,
            appStateService
        ) {

            console.log('formationsCreationController');

            appStateService.isLoading(false);

        });

}(window, window.angular));
