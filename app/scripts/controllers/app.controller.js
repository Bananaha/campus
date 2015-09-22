(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('AppController',
        function(
            $scope,
            $location,
            modalService,
            appStateService
        ) {

            var that = this;

            $scope.modal = false;

            $scope.page = $location.url().replace('/', '');

            appStateService.onChange(onAppStateChange);

            onAppStateChange();

            this.goTo = function(url) {
                if ($scope.modal) {
                    modalService.hideModals();
                }
                $location.url('/' + url);
                $scope.page = url;
            };

            this.showModal = function(modalName) {
                $scope.modal = true;
                modalService.show('modal-' + modalName, onModalHide);
            };

            function onModalHide() {
                $scope.modal = false;
            }

            function onAppStateChange() {
                that.loading = appStateService.isLoading();
                that.frozen = appStateService.isFrozen();
            }
        });

}(window, window.angular));
