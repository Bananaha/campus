angular.module('campus.app').controller('sessionsModifierController', function (
    $scope,
    $http,
    $routeParams,
    notificationService,
    historyService,
    formDatasService,
    config
) {

    var ID = $routeParams.id;

    $http({
            method: 'GET',
            url: config.urls.sessionsDetails,
            params: {
                id: ID
            }
        })
        .then(onGetRequestSuccess, onGetRequestError);

    $scope.opts = formDatasService.get();

    function onGetRequestSuccess(res) {
        if (res.data.archive) {
            notificationService.warn('La session ' + ID + ' est archivée. Vous ne pouvez pas la modifier.');
            historyService.back();
        }
        $scope.model = res.data;
    }

    function onGetRequestError() {
        notificationService.warn('Erreur lors de la récupération des données de la session ' + ID + '.');
        historyService.back();
    }
});
