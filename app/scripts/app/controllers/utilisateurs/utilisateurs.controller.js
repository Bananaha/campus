angular.module('campus.app').controller('utilisateursController', function (
    $scope,
    appStateService,
    config
) {

    $scope.table = {
        filters: {},
        config: {
            url: config.urls.utilisateurs,
            cols: [{
                label: 'Nom',
                key: 'nom',
                sort: true,
                klass: 'w-100',
                link: 'utilisateur'
            }, {
                label: 'Prénom',
                key: 'prenom',
                sort: true,
                klass: 'w-100',
                link: 'utilisateur'
            }, {
                label: 'Entités',
                key: 'entites',
                sort: true,
                klass: 'col-1'
            }, {
                actions: ['modify', 'delete'],
                klass: 'w-50'
            }, {
                label: 'Droits d\'accès',
                key: 'permission',
                sort: true,
                klass: 'w-100'
            }]
        }
    };

    appStateService.isLoading(false);
});
