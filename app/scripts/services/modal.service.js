(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('modalService', function(ModalService) {

        var that = this,
            modals = {};

        this.show = function(partialName, callback) {
            if (!modals[partialName]) {
                addModal(partialName);
            }

            if (!modals[partialName].showed) {
                hideModals();

                modals[partialName].showed = true;

                ModalService.showModal({
                    templateUrl: partialName + '.html',
                    controller: 'modalController'
                }).then(function(modal) {
                    console.log('then');
                    modals[partialName].modal = modal;
                    modal.close.then(onClose.bind(that, callback, partialName));
                    console.log('end then');
                });
            }
            return that;
        };

        this.hideModals = hideModals;

        function onClose(callback, partialName) {
            if (callback) {
                callback();
            }
            hideModal(partialName);
        }

        function addModal(name) {
            modals[name] = {
                showed: false
            };
        }

        function hideModal(name) {
            modals[name].showed = false;
        }

        function hideModals() {
            angular.forEach(modals, function(modal) {
                if (modal.modal && modal.showed) {
                    modal.modal.scope.close();
                }
            });
            return that;
        }

        return this;
    });

}(window, window.angular));

