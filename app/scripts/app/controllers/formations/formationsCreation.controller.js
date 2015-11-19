(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('formationsCreationController',
        function (
            $scope,
            $timeout,
            appStateService,
            userService,
            formDatasService,
            ACTIONS
        ) {

            var opts = formDatasService.get();

            $scope.model = {
                dispositif: null
            };

            $timeout(init);

            opts.entites = userService.get().entite;
            $scope.opts = opts;

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
