(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('indicateursController',
        function (
            $scope,
            $http,
            notificationService,
            config
        ) {

            $http.get(config.urls.indicateurs)
                .then(onGetIndicateursSuccess, onGetIndicateursError);

            function onGetIndicateursError() {
                notificationService.warn('Erreur lors de la récupération des indicateurs.');
            }

            function onGetIndicateursSuccess(res) {
                $scope.indicateurs = res.data;
            }
        });

}(window, window.angular));
