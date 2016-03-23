angular.module('campus.app').controller('homeController', function (
    appStateService
) {
    appStateService.isLoading(false);
});
