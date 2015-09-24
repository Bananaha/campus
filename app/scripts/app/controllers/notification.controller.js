(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('notificationController',
        function (
            notificationService,
            $scope,
            $timeout
        ) {

            var livingTime = 4000;

            $scope.notifications = [];

            notificationService.onTalk(onTalk);

            function onTalk(message, type) {
                $scope.notifications.push({
                    message: message,
                    type: type
                });
                $timeout(shift, livingTime);
            }

            function shift() {
                $scope.notifications.shift();
            }

        });

}(window, window.angular));
