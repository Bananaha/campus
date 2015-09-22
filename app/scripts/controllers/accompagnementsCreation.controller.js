(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsCreationController',
        function (
            $scope,
            $http,
            $timeout,
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

            $scope.formConf = {
                action: config.urls.accompagnementsCreation
            };

            $scope.openDatepickers = {
                from: false,
                to: false
            };

            $scope.open = function(name) {
                $scope.openDatepickers[name] = true;
            };

            $scope.submit = function() {
                var data;
                if ($scope.reportingForm.$invalid && false) {
                    $window.alert('erreur dans le formulaire de creation d\'un accompagnement');
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
                        .then(function(res) {
                            downloaderService.download(res.data.url);
                        });
                }
            };

        });

}(window, window.angular));
