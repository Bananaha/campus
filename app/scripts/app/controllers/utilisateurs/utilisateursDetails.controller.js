(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('utilisateursDetailsController',
        function (
            $scope,
            $http,
            $routeParams,
            appStateService,
            notificationService,
            formatterService,
            historyService,
            config
        ) {

            var ID = $routeParams.id;

            appStateService.isLoading(false);

            $http({
                    method: 'GET',
                    url: config.urls.utilisateursDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            function onGetDetailSuccess(res) {
                $scope.userDetail = formatterService.toDisplay(res.data);
            }

            function onGetDetailError() {
                notificationService.warn('Erreur lors de la récupération de l\'utilisateur ' + ID + '.');
                historyService.back();
            }
        });

}(window, window.angular));
