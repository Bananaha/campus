angular.module('campus.app').directive('affix', function (
    scrollEventService,
    resizeEventService
) {
    return {
        restrict: 'A',
        scope: {
            affixOffset: '@'
        },
        link: function ($scope, element) {
            var el = element[0],
                klasses = {
                    affix: 'affix'
                },
                affixed = false,
                elheight,
                emitterId = 'affixDirective' + new Date().getTime();

            $scope.affixOffset = $scope.affixOffset || 0;

            updateHeight();

            scrollEventService.add(emitterId, checkAffix);
            resizeEventService.add(emitterId, checkAffix);

            function updateElement() {
                element.toggleClass(klasses.affix, affixed);
                element.find('.affix-target').css('top', $scope.affixOffset + 'px');
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

            function checkAffix() {
                var elRect = el.getBoundingClientRect();
                affixed = elRect.top - $scope.affixOffset < 0;
                updateElement();
            }
        }
    };
});
