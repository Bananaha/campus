(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('appStateService',
        function(

        ) {

            var callbacks = [],
                state = {
                    frozen: false,
                    loading: false,
                    confirmating: false,
                    unsavedData: false,
                    logged: null
                };

            this.isFrozen = bindedStateGetter('frozen');

            this.isLoading = bindedStateGetter('loading');

            this.isConfirmating = bindedStateGetter('confirmating');

            this.hasUnsavedData = bindedStateGetter('unsavedData');

            this.isLogged = bindedStateGetter('logged');

            this.get = function() {
                return state;
            };

            this.onChange = function(callback) {
                callbacks.push(callback);
            };

            function bindedStateGetter(stateName) {
                return stateGetter.bind(this, stateName);
            }

            function stateGetter(stateName, value) {
                if (typeof value !== 'undefined') {
                    changeState(stateName, value);
                } else {
                    return state[stateName];
                }
            }

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

