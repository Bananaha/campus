angular.module('campus.app').controller('formationsAccompagnementCreationController', function (
    $scope,
    $timeout,
    appStateService,
    userService,
    formDatasService,
    ACTIONS
) {
    var opts = formDatasService.get();

    $scope.model = {
        dispositif: null,

        participants: {
            stagiaires: [],
            formateurs: []
        }
    };

    $scope.participantsDetails = {
        stagiaires: [],
        formateurs: []
    };

    opts.entites = userService.get().entites;
    $scope.opts = opts;

    $scope.opts.dispositif = ACTIONS.filter(function(action) {
        return !action.isSession;
    });

    function onParticipantsChange() {
        if (initialized) {
            $timeout.cancel(changeTimeout);
            changeTimeout = $timeout(saveUsers, 200);
        }
    }

    appStateService.isLoading(false);
});
