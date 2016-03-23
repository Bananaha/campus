angular.module('campus.app').controller('reportingController', function (
    $scope,
    $http,
    $timeout,
    downloaderService,
    notificationService,
    config
) {

    $scope.valid = false;

    $scope.options = [{
        label: 'Nombre de formations continues',
        id: 'formationsContinues'
    }, {
        label: 'Nombre de sessions ouvertes',
        id: 'sessionsOuvertes'
    }, {
        label: 'Budget dépensé en formation',
        id: 'budgetDepenseFormation'
    }];

    $scope.openDatepickers = {
        from: false,
        to: false
    };

    $scope.openDatepicker = function(name) {
        $scope.openDatepickers[name] = true;
    };

    $scope.closeDatepicker = function(name) {
        $timeout(function() {
            $scope.openDatepickers[name] = false;
        });
    };

    $scope.submit = function() {
        var data;
        if ($scope.reportingForm.$invalid && false) {
            notificationService.warn('Erreur dans le formulaire reporting');
        } else {
            data = {
                from: new Date($scope.model.from).getTime(),
                to: new Date($scope.model.to).getTime(),
                type: $scope.model.type.id
            };
            $http({
                    method: 'GET',
                    url: config.urls.reporting,
                    params: data
                })
                .then(onGetReportSuccess, onGetReportError);
        }
    };

    function onGetReportSuccess(res) {
        downloaderService.download(res.data.url);
    }

    function onGetReportError() {
        notificationService.warn('Erreur lors de la récupération du reporting.');
    }
});
