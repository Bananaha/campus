(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('appStateService',
        function(

        ) {

            var callbacks = [],
                state = {
                    frozen: false,
                    loading: false
                };

            this.isFrozen = function(value) {
                if (typeof value !== 'undefined') {
                    changeState('frozen', value);
                } else {
                    return state.frozen;
                }
            };

            this.isLoading = function(value) {
                if (typeof value !== 'undefined') {
                    changeState('loading', value);
                } else {
                    return state.loading;
                }
            };

            this.get = function() {
                return state;
            };

            this.onChange = function(callback) {
                callbacks.push(callback);
            };

            function changeState(key, value) {
                if (state[key] !== value) {
                    state[key] = value;
                    trigger();
                }
            }

            function trigger() {
                callbacks.forEach(function(cb) {
                    cb(state);
                });
            }

            return this;
        }
    );

}(window, window.angular));

