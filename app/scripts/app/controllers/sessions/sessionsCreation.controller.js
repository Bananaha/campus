angular.module('campus.app').controller('sessionsCreationController', function (
    $scope,
    $routeParams,
    $timeout,
    notificationService,
    formatterService,
    historyService,
    formDatasService,
    formationService,
    config,
    ACTIONS
) {

    var ID = $routeParams.id;

    $scope.initialized = false;

    $scope.model = {};

    $scope.opts = formDatasService.get();

    formationService.getById(ID)
        .then(onGetDetailSuccess, onGetDetailError);

    $scope.$watch('model.avisEmployeur', onAvisChange.bind(this, 'Employeur'));
    $scope.$watch('model.avisFongecif', onAvisChange.bind(this, 'Fongecif'));

    function onGetDetailSuccess(data) {
        var allowSessionCreation = false,
            dispositif = data.dispositif;

        allowSessionCreation = ACTIONS.some(function(action) {
            return action.id === dispositif && !action.isSession;
        });

        if (allowSessionCreation) {
            $scope.model.dispositif = data.dispositif;
            fillInheritedData(data);
            updateForm();
        } else {
            notificationService.warn('Vous ne pouvez pas créer de session pour cette action.');
            historyService.back();
        }

        $timeout(function() {
            $scope.initialized = true;
        });
    }

    function onGetDetailError() {
        historyService.back();
    }

    function updateForm() {
        if ($scope.model.dispositif === 'CIF' || $scope.model.dispositif === 'CPF') {
            $scope.model.avisEmployeur = 'enCours';
        }
        if ($scope.model.dispositif === 'CIF') {
            $scope.model.avisFongecif = 'enCours';
        }
    }

    function onAvisChange(avisTarget, newValue) {
        if ($scope.initialized) {
            if (newValue === 'enCours' || newValue === 'acceptee') {
                delete $scope.model['motif' + avisTarget];
            }

            if (newValue === 'enCours') {
                delete $scope.model['dateAvis' + avisTarget];
            } else if (!$scope.model['dateAvis' + avisTarget]) {
                $scope.model['dateAvis' + avisTarget] = new Date();
            }
        }
    }

    function fillInheritedData(data) {
        var inheritedKeys = [
            'entites',
            'categorie',
            'nature',
            'nomOrganisme',
            'organisme',
            'validation'];

        if ($scope.model.dispositif === 'employeur') {
            inheritedKeys.push('client', 'activite', 'produit');
        }

        inheritedKeys.forEach(function(key) {
            if (angular.isDefined(data[key])) {
                $scope.model[key] = data[key];
            }
        });
    }

});
