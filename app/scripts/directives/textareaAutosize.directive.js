(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('textareaAutosize', function () {
        return {
            restrict: 'A',
            link: function ($scope, element) {
                console.log(element);       
            }
        };
    });

}(window, window.angular));
