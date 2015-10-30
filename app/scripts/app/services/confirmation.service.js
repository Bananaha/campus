(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('confirmationService',
        function(
            $q
        ) {

            this.confirm = function(question) {
                var confirm = global.confirm(question);

                var promise = $q(function(res, rej) {
                    if (confirm) {
                        res();
                    } else {
                        rej();
                    }
                });

                return promise;
            };

            return this;
        }
    );

}(window, window.angular));

