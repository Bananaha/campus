(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsCreationController',
        function (
            $scope,
            $timeout,
            appStateService,
            ACTIONS,
            FORMDATAS
        ) {

            $scope.model = {
                dispositif: null
            };

            $timeout(init);

            $scope.opts = FORMDATAS;

            $scope.opts.dispositif = ACTIONS.filter(function(action) {
                return !action.isSession;
            });

            appStateService.isLoading(false);

            function init() {
                $scope.$watch('model.dispositif', onDispositifChange);
            }

            function onDispositifChange(dispositif) {
                if (dispositif === 'CPF' || dispositif === 'CIF') {
                    $scope.model.organisme = true;
                }
            }
        });

}(window, window.angular));
