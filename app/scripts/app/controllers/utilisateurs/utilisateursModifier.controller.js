angular.module('campus.app').controller('utilisateursModifierController', function (
    $scope,
    $timeout,
    $routeParams,
    appStateService,
    notificationService,
    historyService,
    formatterService,
    formDatasService,
    usersService
) {

    var ID = $routeParams.id;

    $scope.permission = formDatasService.get().permission;

    $scope.initialized = false;

    usersService.getById(ID)
        .then(onGetRequestSuccess, onGetRequestError);

    function onGetRequestSuccess(data) {
        var allowedKeys = [
            'entites',
            'id',
            'mail',
            'nom',
            'password',
            'permission',
            'prenom',
            'service'
        ];
        $scope.model = formatterService.filters(data, allowedKeys);
        $timeout(function() {
            $scope.initialized = true;
        });
    }

    function onGetRequestError() {
        notificationService.warn('Erreur lors de la récupération de l\'utilisateur ' + ID + '.');
        historyService.back();
    }

    appStateService.isLoading(false);
});
