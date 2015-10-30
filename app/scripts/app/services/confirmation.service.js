(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('confirmationService',
        function(
            $q,
            appStateService
        ) {

            var sentence = '',
                promise,
                deferred;

            this.answer = function(res) {
                if (res) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
                appStateService.isConfirmating(false);
            };

            this.getSentence = function() {
                return sentence;
            };

            this.confirm = function(question) {
                deferred = $q.defer();
                sentence = question;
                appStateService.isConfirmating(true);
                return deferred.promise;
            };

            return this;
        }
    );

}(window, window.angular));

