(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('documentationController',
        function (
            $scope,
            $http,
            notificationService,
            config
        ) {

            $http({
                    method: 'GET',
                    url: config.urls.documentation,
                    params: {
                        from: 0,
                        size: 6
                    }
                })
                .then(onGetDocumentationSuccess, onGetDocumentationError);

            function onGetDocumentationError() {
                notificationService.warn('Erreur lors de la récupération de la documentation.');
            }

            function onGetDocumentationSuccess(res) {
                $scope.docs = res.data;
            }
        });

}(window, window.angular));
