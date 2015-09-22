(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('homeController',
        function (
            appStateService
        ) {

            appStateService.isLoading(false);

        });

}(window, window.angular));
