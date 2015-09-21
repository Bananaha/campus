(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('AppController',
        function(
            $scope,
            $location,
            modalService,
            appLoaderService
        ) {

            var that = this;

            $scope.modal = false;

            this.loading = appLoaderService.get();

            appLoaderService.onChange(onLoadingChange);

            this.goTo = function(url) {
                if ($scope.modal) {
                    modalService.hideModals();
                }
                $location.url('/' + url);
            };

            this.showModal = function(modalName) {
                $scope.modal = true;
                modalService.show('modal-' + modalName, onModalHide);
            };

            function onModalHide() {
                $scope.modal = false;
            }

            function onLoadingChange(state) {
                that.loading = state;
            }
        });

}(window, window.angular));
