(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('usersService',
        function(
            $http,
            $window,
            config
        ) {

            this.getUsers = function(ids) {
                var request = $http({
                        method: 'GET',
                        url: config.urls.users,
                        params: { ids: ids }
                    });
                request.then(angular.noop, onGetUsersError);
                return request;
            };

            function onGetUsersError() {
                $window.alert('Errur lors de la récupération des utilisateurs');
            }

            return this;
        }
    );

}(window, window.angular));

