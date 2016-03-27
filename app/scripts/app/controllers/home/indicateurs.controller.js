angular.module('campus.app').controller('indicateursController', function (
    $scope,
    dbService,
    notificationService,
    config
) {

    dbService.get(config.urls.indicateurs)
        .then(onGetIndicateursSuccess, onGetIndicateursError);

    function onGetIndicateursError() {
        notificationService.warn('Erreur lors de la récupération des indicateurs.');
    }

    function onGetIndicateursSuccess(data) {
        $scope.indicateurs = data;
    }
});
