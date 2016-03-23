angular.module('campus.app').factory('utilisateursService', function(
    $http,
    $window,
    config
) {
    this.getUsers = function(ids) {
        var request = $http({
                method: 'GET',
                url: config.urls.utilisateurs,
                params: { ids: ids }
            });
        request.then(angular.noop, onGetUsersError);
        return request;
    };

    function onGetUsersError() {
        $window.alert('Erreur lors de la récupération des utilisateurs');
    }

    return this;
});
