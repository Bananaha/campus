(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('form',
        function (
            $window
        ) {
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

                    $scope.openDatepicker = function(datepickerName) {
                        $scope.state.openDatepickers[datepickerName] = true;
                    };

                    $scope.submit = function() {
                        if ($form.$invalid) {
                            $window.alert('erreur dans le formulaire ' + name);
                        } else {
                            console.log('TO DO: SUBMIT'); // eslint-disable-line
                        }
                    };
                }
            };
        }
    );

}(window, window.angular));
