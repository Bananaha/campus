(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .factory('downloaderService', function() {

        var isIframe = true,
            element = angular.element('#downloader');

        if (!element.length) {
            isIframe = false;
            element = createElement();
        }

        this.download = function(url) {
            if (isIframe) {
                element.attr('src', url);
            } else {
                element.attr('href', url);
                element[0].click();
            }
        };

        function createElement() {
            var link = angular.element('<a href="#" id="downloader"></a>');
            link.prependTo('body');
            return link;
        }

        return this;
    });

}(window, window.angular));

