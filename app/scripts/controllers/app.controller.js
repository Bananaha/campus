(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('AppController',
        function(
            $scope,
            modalService
        ) {

            $scope.modal = false;

            this.showModal = function(modalName) {
                $scope.modal = true;
                modalService.show('modal-' + modalName, onModalHide);
            };

            function onModalHide() {
                $scope.modal = false;
            }
        });

}(window, window.angular));
