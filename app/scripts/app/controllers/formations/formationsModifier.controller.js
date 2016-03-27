angular.module('campus.app').controller('formationsModifierController', function (
    $scope,
    $routeParams,
    $timeout,
    appStateService,
    notificationService,
    historyService,
    formatterService,
    formDatasService,
    formationService
) {
    var ID = $routeParams.id;

    $scope.opts = formDatasService.get();

    $scope.initialized = false;

    formationService.getById(ID).then(onGetRequestSuccess, onGetRequestError);

    function onGetRequestSuccess(data) {
        $scope.model = data;

        $timeout(function() {
            $scope.initialized = true;
            $scope.$watch('model.dispositif', onDispositifChange);
        });
    }

    function onGetRequestError() {
        notificationService.warn('Erreur lors de la récupération des données de l\'action ' + ID + '.');
        historyService.back();
    }

    function onDispositifChange(dispositif) {
        if (dispositif === 'CPF' || dispositif === 'CIF') {
            $scope.model.organisme = true;
        }
    }
});
