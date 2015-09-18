(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('affix', function ($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                affixOffset: '@'
            },
            link: function ($scope, element) {
                var el = element[0],
                    targetEl = element.find('.affix-target'),
                    klasses = {
                        affix: 'affix'
                    },
                    affixed = false,
                    elheight,
                    throttleTimeout;

                $scope.affixOffset = $scope.affixOffset || 0;

                updateHeight();

                document.addEventListener('scroll', throttle(onScroll, 40));

                function updateElement() {
                    element.toggleClass(klasses.affix, affixed);
                    targetEl.css('top', $scope.affixOffset + 'px');
                }

                function updateHeight() {
                    var padding = {
                        top: element.css('padding-top'),
                        bottom: element.css('padding-bottom')
                    };
                    padding.top = padding.top ? parseInt(padding.top, 10) : 0;
                    padding.bottom = padding.bottom ? parseInt(padding.bottom, 10) : 0;
                    elheight = el.getBoundingClientRect().height - padding.top - padding.bottom;
                    el.style.minHeight = elheight + 'px';
                }

                function onScroll() {
                    checkAffix();
                }

                function checkAffix() {
                    var elRect = el.getBoundingClientRect();
                    affixed = elRect.top - $scope.affixOffset < 0;
                    updateElement();
                }

                function throttle(callback, limit) {
                    var wait = false;
                    return function () {
                        if (!wait) {
                            $timeout.cancel(throttleTimeout);
                            callback.call();
                            wait = true;
                            $timeout(function () {
                                wait = false;
                            }, limit);
                        } else {
                            throttleTimeout = $timeout(function() {
                                callback.call();
                            });
                        }
                    };
                }
            }
        };
    });

}(window, window.angular));
