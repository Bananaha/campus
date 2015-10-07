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

            var ID = $routeParams.id,
                initialized,
                changeTimeout,
                populations = ['formateurs', 'stagiaires'];

            $scope.participants = {
                stagiaires: [],
                formateurs: []
            };

            $scope.$watch('participants', onParticipantsChange, true);

            getDatas();

            $scope.unarchive = function() {
                if ($scope.session.archive) {
                    dbActionsService
                        .unarchive(config.urls.sessions, ID)
                        .then(onUnarchive);
                }
            };

            function getDatas() {
                $http({
                    method: 'GET',
                    url: config.urls.sessionsDetails,
                    params: {
                        id: ID
                    }
                })
                .then(onGetDetailSuccess, onGetDetailError);
            }

            function onUnarchive() {
                $scope.session.archive = false;
            }

            function onParticipantsChange() {
                if (initialized) {
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
                $scope.participants = res.data.participants;
                $scope.hasUsers = true;
                $timeout(function() {
                    initialized = true;
                });

                console.log('TODO: clean this');
                global.s = function(int) {
                   var b = ['fakeIdCIF', 'fakeIdCPF', 'fakeIdEmployeur'];
                    global.a = int || (global.a + 1) || 0;
                    if (global.a >= b.length) {
                        global.a = 0;
                    }
                    ID = b[global.a];
                    getDatas();
                    return ID;
                };
            }

            function onGetDetailError() {
                $location.url('/formations');
            }

            function formatDatas(datas) {
                return formatterService.format(datas);
            }

        });

}(window, window.angular, window.moment));
