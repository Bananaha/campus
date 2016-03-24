angular.module('campus.app').controller('sessionsModifierController', function (
    $scope,
    $http,
    $routeParams,
    notificationService,
    historyService,
    formDatasService,
    sessionService,
    config
) {

    var ID = $routeParams.id;

    sessionService.getById(ID).then(onGetRequestSuccess, onGetRequestError);

    $scope.opts = formDatasService.get();

    function onGetRequestSuccess(data) {
        if (data.archive) {
            notificationService.warn('La session ' + ID + ' est archivée. Vous ne pouvez pas la modifier.');
            historyService.back();
        }
        $scope.model = data;
    }

    function onGetRequestError() {
        notificationService.warn('Erreur lors de la récupération des données de la session ' + ID + '.');
        historyService.back();
    }
});
