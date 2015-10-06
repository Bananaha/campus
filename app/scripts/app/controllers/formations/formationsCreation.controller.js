(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsCreationController',
        function (
        	$scope,
            config,
            appStateService
        ) {

            appStateService.isLoading(false);

        });

}(window, window.angular));
