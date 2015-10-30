(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('cost', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                model: '=cout'
            },
            templateUrl: 'cost.html',
            link: function ($scope) {
                var initialized,
                    keys = {
                        cost: [
                            'salarial',
                            'pedagogique',
                            'interim',
                            'annexe'
                        ],
                        priseEnCharge: [
                            'direct',
                            'planFormation',
                            'professionnalisation',
                            'CPF',
                            'FPSPP',
                            'CIF',
                            'autre'
                        ]
                    };

                $scope.$watch('model', onModelChange, true);

                $timeout(function() {
                    initialized = true;
                });

                function onModelChange() {
                    if (initialized) {
                        updateModel();
                    }
                }

                function add(sum, key) {
                    return sum + $scope.model[key];
                }

                function updateModel() {
                    $scope.cout = keys.cost.reduce(add, 0);
                    $scope.priseEnCharge = keys.priseEnCharge.reduce(add, 0);
                    $scope.reste = $scope.cout - $scope.priseEnCharge;
                }
            }
        };
    });
}(window, window.angular));
