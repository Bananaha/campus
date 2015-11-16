(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('userService',
        function(
            $http,
            $q,
            appStateService,
            localStorageService,
            notificationService,
            config
        ) {

            var that = this,
                savedUser = localStorageService.get('user'),
                USER;

            this.get = function() {
                return USER;
            };

            this.set = function(data) {
                if (data && data.id) {
                    USER = data;
                    this.ID = data.id;
                    localStorageService.set('user', USER);
                    appStateService.isLogged(true);
                } else {
                    //localStorageService.remove('user', USER);
                    //appStateService.isLogged(false);
                }
            };

            function init() {
                if (savedUser && savedUser.id) {
                    that.set(savedUser);
                } else {
                    //appStateService.isLogged(false);
                }
            }

            function onGetDetailSuccess(res) {
                deferred.resolve(res.data);
            }

            function onGetDetailError() {
                notificationService.warn('Erreur lors de la récupération de vos données.');
                deferred.reject();
            }

            init();

            return this;
        }
    );

}(window, window.angular));

