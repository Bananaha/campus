angular.module('campus.app').controller('documentationController', function (
    $scope,
    notificationService,
    config,
    dbService
) {

    dbService.get(config.urls.documentation, { from: 0, size: 6 })
        .then(onGetDocumentationSuccess, onGetDocumentationError);

    function onGetDocumentationError() {
        notificationService.warn('Erreur lors de la récupération de la documentation.');
    }

    function onGetDocumentationSuccess(data) {
        $scope.docs = data;
    }
});
