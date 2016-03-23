angular.module('campus.app').controller('formationsController', function (
    $scope,
    config,
    appStateService,
    userService
) {
    $scope.table = {
        filters: {},
        config: {
            url: config.urls.formations,
            cols: [{
                label: 'Intitulé',
                key: 'intitule',
                sort: true,
                klass: 'col-1',
                link: 'formation'
            }, {
                label: 'Nb Sessions',
                key: 'sessions',
                sort: true,
                klass: 'w-90'
            }, {
                label: 'Auteur',
                key: 'auteurNom',
                sort: true,
                klass: 'w-100',
                link: 'utilisateur'
            }, {
                label: 'Action',
                key: 'action',
                sort: true,
                klass: 'w-70'
            }, {
                actions: ['modify', 'delete', 'archive'],
                klass: 'w-70'
            }, {
                label: 'Dispositif',
                key: 'dispositif',
                sort: true,
                klass: 'w-70'
            }]
        }
    };

    $scope.filtersSettings = {
        dispositif: true,
        archive: true,
        entites: userService.get().entites
    };

    appStateService.isLoading(false);

});
