angular.module('campus.app').controller('formationsDetailsController', function (
    $scope,
    $timeout,
    $routeParams,
    config,
    historyService,
    notificationService,
    formationService,
    formatterService
) {
    var ID = $routeParams.id,
        changeTimeout,
        initialized,
        populations = ['formateurs', 'stagiaires'];

    $scope.participants = {
        stagiaires: [],
        formateurs: []
    };

    formationService.getById(ID)
        .then(onGetDetailSuccess, onGetDetailError);

    $scope.table = {
        filters: {},
        config: {
            url: config.urls.sessions,
            params: {
                action: ID,
                archives: false
            },
            cols: [{
                label: 'Ref',
                key: 'reference',
                sort: true,
                klass: 'col-1',
                link: 'session'
            }, {
                label: 'Date de début',
                key: 'dateDebut',
                sort: true,
                klass: 'w-90'
            }, {
                label: 'Date de fin',
                key: 'to',
                sort: true,
                klass: 'w-90'
            }, {
                label: 'Auteur',
                key: 'auteurNom',
                sort: true,
                klass: 'w-100',
                link: 'utilisateur'
            }, {
                actions: ['modify', 'delete', 'archive'],
                klass: 'w-70'
            }, {
                label: 'N°',
                key: 'session',
                sort: true,
                klass: 'w-70',
                link: 'session'
            }]
        }
    };

    $scope.filtersSettings = {
        archive: true
    };

    $scope.unarchive = function() {
        if ($scope.formation.archive) {
            formationService
                .unarchive(config.urls.formations, ID)
                .then(onUnarchive);
        }
    };

    function onUnarchive() {
        $scope.formation.archive = false;
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
        formationService.update(params)
            .then(onUpdateSuccess, onUpdateError);
    }

    function onUpdateSuccess(data) {
        if (data && data.cout) {
            $scope.formation.cout = data.cout;
        }
    }

    function onUpdateError() {
        $scope.formation.cout = {
            pedagogique: '-',
            salarial: '-'
        };
    }

    function onGetDetailSuccess(data) {
        var actionConfig = formationService.getConfig(data.dispositif);
        $scope.formation = formatterService.toDisplay(data);

        $scope.hasSessions = !actionConfig.isSession;

        if (actionConfig.isSession) {
            $scope.hasUsers = true;
            $scope.participants = data.participants;
        }

        if (actionConfig.showCost) {
            $scope.showCost = true;
        }

        $scope.$watch('participants', onParticipantsChange, true);

        $timeout(function() {
            $scope.$apply();
            initialized = true;
        });
    }

    function onGetDetailError() {
        notificationService.warn('Erreur lors de la récupération des données de l\'action ' + ID + '.');
        historyService.back();
    }
});
