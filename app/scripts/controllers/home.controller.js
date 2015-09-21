(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('homeController',
        function (
            appLoaderService
        ) {

            appLoaderService.set(false);

        });

}(window, window.angular));
