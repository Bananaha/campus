angular.module('campus.app').controller('utilisateursDetailsController', function (
    $scope,
    $routeParams,
    appStateService,
    notificationService,
    formatterService,
    historyService,
    usersService
) {

    var ID = $routeParams.id;

    appStateService.isLoading(false);

    usersService.getById(ID)
        .then(onGetDetailSuccess, onGetDetailError);

    function onGetDetailSuccess(data) {
        $scope.userDetail = formatterService.toDisplay(data);
    }

    function onGetDetailError() {
        notificationService.warn('Erreur lors de la récupération de l\'utilisateur ' + ID + '.');
        historyService.back();
    }
});
