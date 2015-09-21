(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('appLoaderService',
        function(

        ) {

            var loading = true,
                callbacks = [];

            this.set = function(state) {
                if (state !== loading) {
                    loading = state;
                    onChange(state);
                }
            };

            this.get = function() {
                return loading;
            };

            this.onChange = function(callback) {
                callbacks.push(callback);
            };

            function onChange(state) {
                callbacks.forEach(function(cb) {
                    cb(state);
                });
            }

            return this;
        }
    );

}(window, window.angular));

