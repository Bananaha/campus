angular.module('campus.app').controller('utilisateursCreationController', function (
    $scope,
    appStateService,
    ACTIONS,
    FORMDATAS
) {

    $scope.opts = FORMDATAS;

    $scope.opts.dispositif = ACTIONS.filter(function(action) {
        return !action.isSession;
    });

    appStateService.isLoading(false);
});
