angular.module('campus.app').controller('headerMenuController', function (
    $scope,
    $timeout
) {

    var blurTimeout;

    $scope.isOpen = false;

    $scope.toggle = function() {
        $scope.isOpen = !$scope.isOpen;
    };

    $scope.onBlur = function() {
        $timeout.cancel(blurTimeout);
        blurTimeout = $timeout(close, 100);
    };

    $scope.onFocus = function() {
        $timeout.cancel(blurTimeout);
    };

    function close() {
        $scope.isOpen = false;
    }
});
