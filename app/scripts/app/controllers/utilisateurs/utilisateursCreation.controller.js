(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('utilisateursCreationController',
        function (
            $scope,
            appStateService,
            ACTIONS,
            FORMDATAS
        ) {

            $scope.opts = FORMDATAS;

            $scope.opts.type = ACTIONS.filter(function(action) {
                return !action.isSession;
            });

            appStateService.isLoading(false);
        });

}(window, window.angular));
