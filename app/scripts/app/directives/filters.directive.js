angular.module('campus.app').directive('filters', function (
    $timeout,
    resizeEventService,
    scrollEventService,
    ACTIONS
) {
    return {
        restrict: 'E',
        scope: {
            settings: '=',
            filters: '='
        },
        templateUrl: 'filters.html',
        link: function ($scope, element) {
            var openClass = 'open',
                filtersEl = element.find('.filters'),
                // bloque la fermeture des filtres au scroll suite à
                // un rechargement du tableau dû au changement de filtre
                hasChanged = false,
                count = 0,
                height;

            $scope.filters = $scope.filters || {}; // Filtres actifs formatés et exposés
            $scope.model = {}; // Filtres actifs - privé
            $scope.constant = {}; // Label & value de chaque filtre
            $scope.count = 0;

            if ($scope.settings.dispositif) {
                $scope.constant.dispositif = ACTIONS.map(function(action) {
                    return {
                        value: action.id,
                        label: action.label
                    };
                });
            }

            $scope.$watch('model', onModelChange, true);

            $timeout(function() {
                refreshHeight();
                onVisibilityToggle();
            });

            resizeEventService.add('filters', refreshHeight);
            scrollEventService.add('filters', close);

            $scope.toggle = function() {
                $scope.open = !$scope.open;
                onVisibilityToggle();
            };

            function close() {
                if ($scope.open && !hasChanged) {
                    $scope.open = false;
                    onVisibilityToggle();
                }
                hasChanged = false;
            }

            function onVisibilityToggle() {
                element.toggleClass(openClass, $scope.open);
                if ($scope.open) {
                    filtersEl.height(height);
                } else {
                    filtersEl.height(0);
                }
            }

            function refreshHeight() {
                filtersEl.height('auto');
                height = filtersEl.height();
                onVisibilityToggle();
            }

            function onModelChange() {
                count = 0;
                hasChanged = true;
                $scope.filters = formatModel();
                $scope.count = count;
            }

            function formatModel() {
                var model = {},
                    value;
                Object.keys($scope.model).forEach(function(key) {
                    value = $scope.model[key];
                    if (angular.isObject(value)) {
                        value = flattenObject(value);
                    }
                    if (value) {
                        count += value.length || 1;
                        model[key] = value;
                    }
                });
                return model;
            }

            function flattenObject(obj) {
                return Object.keys(obj).reduce(function(res, key) {
                    if (obj[key]) {
                        res = res ? res : [];
                        res.push(key);
                    }
                    return res;
                }, false);
            }
        }
    };
});
