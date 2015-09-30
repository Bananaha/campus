(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app')
    .controller('sessionsDetailsController',
        function (
            $scope,
            $http,
            $timeout,
            $routeParams,
            $location,
            config,
            dbActionsService,
            actionsService,
            formatterService
        ) {

            var initialized,
                ID = $routeParams.id;

            $scope.participants = {
                stagiaires: [],
                formateurs: []
            };

            $http({
                    method: 'GET',
                    url: config.urls.sessionsDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);

            $scope.$watch('participants', onParticipantsChange, true);

            $timeout(function() {
                initialized = true
            });

            $scope.unarchive = function() {
                if ($scope.session.archive) {
                    dbActionsService
                        .unarchive(config.urls.sessions, ID)
                        .then(onUnarchive);
                }
            }

            function onUnarchive() {
                $scope.session.archive = false;
            }

            function onParticipantsChange() {
                if (initialized) {
                    console.log('onParticipantsChange');
                    $timeout.cancel(changeTimeout);
                    changeTimeout = $timeout(saveUsers, 200);
                }
            }

            function saveUsers() {
                var params = {
                    id: ID
                };
                populations.forEach(function(key) {
                    params[key] = $scope.participants[key].map(function(user) {
                        return user.id;
                    });
                });
                dbActionsService
                    .update(config.urls.sessionsModification, params)
                    .then(onUpdateSuccess, onUpdateError);
            }

            function onUpdateSuccess(res) {
                if (res.data && res.data.cout) {
                    $scope.session.cout = res.data.cout;
                }
            }

            function onUpdateError() {
                $scope.session.cout = {
                    pedagogique: '-',
                    salarial: '-'
                };
            }

            function onGetDetailSuccess(res) {
                $scope.session = formatDatas(res.data);
            }

            function onGetDetailError() {
                // $location.url('/formations');
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

        });

}(window, window.angular, window.moment));
