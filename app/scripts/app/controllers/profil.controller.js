angular.module('campus.app').controller('profilController', function (
    $scope,
    $timeout,
    userService,
    usersService,
    appStateService,
    dbService,
    notificationService
) {

    $scope.initialized = false;

    $scope.user = {};
    $scope.model = {};
    $scope.isValid = false;

    $scope.user = userService.get();

    $timeout(function() {
        $scope.initialized = true;
    });

    $scope.$watch('model', onModelChange, true);

    $scope.modifyPassword = function() {
        $scope.modifyingPassword = true;
    };

    $scope.cancel = function() {
        $scope.modifyingPassword = false;
        $scope.model = {};
    };

    $scope.submit = function() {
        if (isValid() && !appStateService.isFrozen()) {
            sendRequest();
        }
    };

    function sendRequest() {
        var params = $scope.model;
        params.id = userService.ID;
        usersService
            .edit(params)
            .then(onRequestSuccess, onRequestError);
    }

    function resetForm() {
        $scope.model = {};
        $scope.isValid = false;
        $scope.modifyingPassword = false;
    }

    function onRequestSuccess() {
        resetForm();
    }

    function onRequestError() {
        notificationService.warn('Le mot de passe que vous avez renseigné n\'est pas valide');
    }

    function isValid() {
        return $scope.profilPasswordModification.$valid && $scope.model.newPassword === $scope.model.newPassword2;
    }

    function onModelChange() {
        if ($scope.initialized) {
            $scope.isValid = isValid();
        }
    }
});
