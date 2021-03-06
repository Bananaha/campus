angular.module('campus.app').controller('sessionsDetailsController', function (
    $scope,
    $timeout,
    $routeParams,
    appStateService,
    confirmationService,
    historyService,
    notificationService,
    formatterService,
    sessionService
) {

    var ID = $routeParams.id,
        changeTimeout,
        defaultCout,
        populations = ['formateurs', 'stagiaires'];

    $scope.initialized = false;

    $scope.costChanged = false;

    $scope.participants = {
        stagiaires: [],
        formateurs: []
    };

    $scope.participantsDetails = {
        stagiaires: [],
        formateurs: []
    };

    $scope.attendance = {};

    $scope.attendanceSettings = {};

    $scope.session = {};

    $scope.$watch('participantsDetails', onParticipantsDetailsChange, true);
    $scope.$watch('participants', onParticipantsChange, true);
    $scope.$watch('session.cout', onCostChange, true);
    $scope.$watch('costChanged', onCostChangeChange, true);

    getDatas();

    $scope.unarchive = function() {
        if ($scope.session.archive) {
            confirmationService
                .confirm('Voulez-vous vraiment désarchiver la session ' + ID + '?')
                    .then(unarchive);
        }
    };

    $scope.saveCost = function() {
        if ($scope.costChanged) {
            saveCost();
        }
    };

    $scope.cancelCost = function() {
        if ($scope.costChanged) {
            confirmationService
                .confirm('Voulez-vous vraiment annuler les changements fait sur le financement de la session ' + ID + '?')
                    .then(cancelCost);
        }
    };

    function onCostChangeChange(costChanged) {
        appStateService.hasUnsavedData(costChanged);
    }

    function cancelCost() {
        $scope.session.cout = JSON.parse(defaultCout);
        $timeout(function() {
            $scope.costChanged = false;
        });
    }

    function getDatas() {
        return sessionService.getById(ID).then(onGetDetailSuccess, onGetDetailError);
    }

    function onCostChange() {
        if ($scope.initialized) {
            $scope.costChanged = true;
        }
    }

    function unarchive() {
        sessionService
            .unarchive(ID)
            .then(onUnarchive);
    }

    function onUnarchive() {
        $scope.session.archive = false;
    }

    function onParticipantsChange() {
        if ($scope.initialized) {
            $timeout.cancel(changeTimeout);
            changeTimeout = $timeout(saveUsers, 200);
        }
    }

    function onParticipantsDetailsChange() {
        if (!$scope.showAttendance && $scope.initialized && participantsDetailsReady()) {
            $scope.showAttendance = true;
        }
    }

    function participantsDetailsReady() {
        return ['formateurs', 'stagiaires'].reduce(function(bool, population) {
            if ($scope.participants[population].length && !$scope.participantsDetails[population].length) {
                return false;
            }
            return bool;
        }, true);
    }

    function saveUsers() {
        var params = {
            id: ID,
            participants: {}
        };
        populations.forEach(function(key) {
            params.participants[key] = $scope.participants[key].map(function(user) {
                return user.id;
            });
        });
        sessionService
            .edit(params)
            .then(onUpdateSuccess, onUpdateError);
    }

    function saveCost() {
        var params = {
            id: ID,
            cout: $scope.session.cout
        };
        sessionService
            .edit(params)
            .then(onUpdateSuccess, onUpdateError);
    }

    function onUpdateSuccess() {
        getDatas()
            .then(function() {
                $scope.costChanged = false;
            });
    }

    function onUpdateError() {
        notificationService.warn('Erreur lors de la mise à jour de la session #' + ID);
    }

    function onGetDetailSuccess(data) {
        $scope.session = formatterService.toDisplay(data);
        $scope.participants = data.participants;
        $scope.hasUsers = true;

        if ($scope.session.cout) {
            defaultCout = JSON.stringify($scope.session.cout);
        }

        if ($scope.session.dispositif === 'CIF') {
            $scope.coutSettings = {
                start: data.dateDebut,
                end: data.dateFin
            };
        }

        if ($scope.session.dispositif === 'employeur') {
            $scope.attendance = data.attendance;
            $scope.attendanceSettings.defaultDuree = $scope.session.duree || 0;
        }

        $timeout(function() {
            $scope.initialized = true;
        });
    }

    function onGetDetailError() {
        notificationService.warn('Erreur lors de la récupération des données de la session ' + ID + '.');
        historyService.back();
    }
});
