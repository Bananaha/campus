(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('actionsService',
        function(
            ACTIONS
        ) {

            var actions = ACTIONS;

            this.getConfig = function(id) {
                return actions.filter(function(action) {
                    return action.id === id;
                })[0];
            };

            return this;
        }
    );

}(window, window.angular));

