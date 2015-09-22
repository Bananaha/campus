(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('form', function () {
        return {
            restrict: 'A',
            link: function ($scope, element) {

                var name = element.attr('name'),
                    $form = $scope[name];

                $scope.state = {
                    valid: false,
                    openDatepickers: {}
                };

                $scope.model = {};

                $scope.openDatepicker = function(name) {
                    $scope.state.openDatepickers[name] = true;
                };

                $scope.submit = function() {
                    console.log($form);
                    if ($form.$invalid) {
                        $window.alert('erreur dans le formulaire ' + name);
                    } else {
                        console.log('TO DO: SUBMIT');
                    }
                }
            }
        };
    });

}(window, window.angular));
