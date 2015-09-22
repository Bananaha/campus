(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('textareaAutosize', function () {
        return {
            restrict: 'A',
            link: function ($scope, element) {
                console.log('textareaAutosize', element);
                var el = element[0];

                element.on('keyup input', resize);

                function resize() {
                    element
                        .css('height', 'auto')
                        .css('height', el.scrollHeight);
                }
            }
        };
    });

}(window, window.angular));
