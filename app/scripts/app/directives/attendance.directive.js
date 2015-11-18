(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('attendance', function (
            $timeout,
            $window,
            $http,
            config,
            utilisateursService
        ) {
            return {
                restrict: 'E',
                templateUrl: 'attendance.html',
                scope: {
                    participantsDetails: '=',
                    settings: '=',
                    attendance: '='
                },
                link: function ($scope, element) {

                    $scope.$watch('participantsDetails', onParticipantsChange, true);
                    $scope.$watch('attendance', function() {
                        console.log('attendance changed in directive');
                        console.log($scope.attendance);
                    }, true);

                    function onParticipantsChange(participants) {
                        ['formateurs', 'stagiaires'].forEach(function(key, index) {
                            participants[key] = participants[key].map(function(participant) {
                                participant.statut = index ? 'Stagiaire' : 'Formateur';
                                return participant;
                            });
                        });

                        $scope.displayedParticipants = participants.formateurs
                            .concat(participants.stagiaires)
                            .sort(function(a, b) {
                                return a.id - b.id;
                            });

                        updateAttendance();
                    }

                    function updateAttendance() {
                        var newAttendance = $scope.displayedParticipants.reduce(function(globalAttendance, participant) {
                            var attendance = $scope.attendance[participant.id];
                            globalAttendance[participant.id] = {
                                temps: attendance ? attendance.temps || $scope.settings.defaultDuree : $scope.settings.defaultDuree,
                                production: attendance ? attendance.production : true
                            };
                            return globalAttendance;
                        }, {});

                        $scope.attendance = newAttendance;
                    }
                }              
            };
        }
    );
}(window, window.angular));
