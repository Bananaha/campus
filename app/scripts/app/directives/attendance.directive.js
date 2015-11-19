(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('attendance', function (
            $timeout,
            config,
            utilisateursService,
            localStorageService
        ) {
            return {
                restrict: 'E',
                templateUrl: 'attendance.html',
                scope: {
                    participantsDetails: '=',
                    settings: '=',
                    attendance: '=attendance'
                },
                link: function ($scope) {

                    var initialModelStorageName = 'form-attendanceinit';

                    $scope.model = {
                        attendance: $scope.attendance
                    };

                    $timeout(init);

                    function init() {
                        $scope.$watch('participantsDetails', onParticipantsChange, true);
                    }

                    function onParticipantsChange() {
                        var participants = formatParticipants();
                        sortParticipants(participants);
                        updateAttendance();
                        $scope.showTable = true;
                    }

                    function formatParticipants() {
                        var _participants = angular.copy($scope.participantsDetails);

                        ['formateurs', 'stagiaires'].forEach(function(key, index) {
                            _participants[key] = _participants[key].map(setStatut.bind(this, index));
                        });

                        return _participants;
                    }

                    function setStatut(index, participant) {
                        participant.statut = index ? 'Stagiaire' : 'Formateur';
                        return participant;
                    }

                    function sortParticipants(participants) {
                        $scope.displayedParticipants = participants.formateurs
                            .concat(participants.stagiaires)
                            .sort(function(a, b) {
                                return a.id - b.id;
                            });
                    }

                    function updateAttendance() {
                        var newAttendance = $scope.displayedParticipants.reduce(function(globalAttendance, participant) {
                            var attendance = $scope.model.attendance[participant.id];
                            globalAttendance[participant.id] = {
                                temps: attendance ? attendance.temps || $scope.settings.defaultDuree : $scope.settings.defaultDuree,
                                production: attendance ? attendance.production : true
                            };
                            return globalAttendance;
                        }, {});

                        updateInitialModel(newAttendance);
                        $scope.model.attendance = newAttendance;
                    }

                    // freeze the new initial model when a user is deleted
                    function updateInitialModel(participants) {
                        var initialModel = localStorageService.get(initialModelStorageName);
                        if (initialModel) {
                            initialModel = JSON.parse(initialModel);
                            Object.keys(initialModel.attendance).forEach(function(userId) {
                                if (!participants[userId]) {
                                    delete initialModel.attendance[userId];
                                }
                            });
                            localStorageService.set(initialModelStorageName, JSON.stringify(initialModel));
                        }
                    }
                }
            };
        }
    );
}(window, window.angular));
