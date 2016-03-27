angular.module('campus.app').controller('loginController', function (
    $scope,
    $location,
    notificationService,
    userService,
    config
) {

    $scope.model = {};

    userService.set(null);

    $scope.forgottenPassword = function() {
        notificationService.warn('Veuillez contacter votre administrateur de site.');
    };

    $scope.submit = function() {
        userService.login($scope.model)
            .then(onSubmitSuccess, onSubmitError);
    };

    function onSubmitSuccess(res) {
        $location.url('/home');
    }

    function onSubmitError() {
        notificationService.warn('Identifiants invalides.');
    }

});
