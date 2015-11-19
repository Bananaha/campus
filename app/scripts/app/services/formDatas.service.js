(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('formDatasService',
        function(
            FORMDATAS,
            userService
        ) {

            this.get = function() {
                var datas = FORMDATAS;
                datas.entites = userService.get().entite;
                return datas;
            };

            return this;
        }
    );

}(window, window.angular));

