angular.module('campus.app').directive('textareaAutosize', function () {
    return {
        restrict: 'A',
        link: function ($scope, element) {
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
