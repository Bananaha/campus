(function (global, angular) {
    'use strict';

    angular.module('campus.app').filter('emptyInputClassFilter', function() {

        var klass = 'filled';

        return function(value) {
            return value !== null && typeof value !== 'undefined' && String(value).length ? klass : '';
        };
    });

}(window, window.angular));
