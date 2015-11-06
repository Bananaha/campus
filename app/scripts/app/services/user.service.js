(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('userService',
        function(
            $http,
            $q,
            appStateService,
            notificationService,
            config
        ) {

            var user,
                deferred = $q.defer(),
                ID = '56000d80d0880b1a2ce0c620';

            appStateService.isLoading(false);

            $http({
                    method: 'GET',
                    url: config.urls.utilisateursDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            this.get = function() {
                return deferred.promise;
            };

            function onGetDetailSuccess(res) {
               user = res.data;
               deferred.resolve(res.data);
            }

            function onGetDetailError() {
                notificationService.warn('Erreur lors de la récupération de vos données.');
                deferred.reject();
            }

            return this;
        }
    );

}(window, window.angular));

