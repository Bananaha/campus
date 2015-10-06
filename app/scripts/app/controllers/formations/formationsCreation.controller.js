(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsCreationController',
        function (
            $scope,
            config,
            appStateService,
            ACTIONS,
            FORMDATAS
        ) {

            console.log('formationsCreationController');
            
            $scope.opts = FORMDATAS;
            
            $scope.opts.type = ACTIONS.filter(function(action) {
                return !action.isSession;
            });

            appStateService.isLoading(false);

        });

}(window, window.angular));
