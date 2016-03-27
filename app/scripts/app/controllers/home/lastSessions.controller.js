angular.module('campus.app').controller('lastSessionsController', function (
    $scope,
    sessionService,
    notificationService
) {

    sessionService.getForUser({size: 3})
        .then(onGetSessionsSuccess, onGetSessionsError);

    function onGetSessionsSuccess(sessions) {
        $scope.lastSessions = sessions;
    }

    function onGetSessionsError() {
        notificationService.warn('Erreur lors de la récupération des dernières sessions.');
    }
});
