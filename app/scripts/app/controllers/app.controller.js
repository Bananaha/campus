(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('AppController',
        function(
            $scope,
            $location,
            $timeout,
            $window,
            modalService,
            appStateService,
            historyService,
            confirmationService
        ) {

            var that = this,
                redirecting = false;

            $scope.modal = false;

            $scope.page = $location.url().replace('/', '');

            appStateService.onChange(onAppStateChange);

            onAppStateChange();

            $scope.$on('$locationChangeStart', onLocationChange);

            this.showBack = false;

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

            this.back = function() {
                historyService.back();
            };

            function updateShowBack() {
                that.showBack = historyService.hasBack() && $location.url().split('/').length > 2;
            }

            function onLocationChange(event, next) {
                if (appStateService.hasUnsavedData() && !redirecting) {
                    event.preventDefault();
                    confirmationService.confirm('Si vous quittez cette page sans sauvegarder, vos changements seront perdus. Voulez-vous vraiment quitter cette page?')
                        .then(onForgetUnsavedDataConfirm.bind(that, next));
                } else {
                    onLocationChangeComplete();
                }
            }

            function onForgetUnsavedDataConfirm(next) {
                redirecting = true;
                appStateService.hasUnsavedData(false);
                $window.location.href = next;
                onLocationChangeComplete();
                $timeout(function() {
                    redirecting = false;
                });
            }

            function onLocationChangeComplete() {
                modalService.hideModals();
                historyService.onLocationChange();
                updateShowBack();
            }

            function onModalHide() {
                $scope.modal = false;
            }

            function onAppStateChange() {
                that.loading = appStateService.isLoading();
                that.frozen = appStateService.isFrozen();
                that.confirmating = appStateService.isConfirmating();

                if (that.confirmating) {
                    initConfirmation();
                }
            }

            // CONFIRMATION

            $scope.confirm = function(res) {
                confirmationService.answer(res);
            };

            function initConfirmation() {
                $scope.confirmSentence = confirmationService.getSentence();
            }
        });

}(window, window.angular));
