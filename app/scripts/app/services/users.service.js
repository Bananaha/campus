angular.module('campus.app').factory('usersService', function(
    $window,
    dbService,
    config
) {
    var url = config.urls.utilisateurs,
        api = {};


    api.getByIds = function(ids) {
        return dbService.get(url, {params: {ids: ids}});
    };

    api.get = function(params) {
        return dbService.get(url, {params: params})
    };

    api.getById = function(id) {
        return dbService.getById(url, id);
    };

    api.search = function(search) {
        return dbService.get(url, { params: { search: search }});
    };

    api.edit = function(params) {
        return dbService.edit(url, params);
    };

    api.delete = function(id) {
        return dbService.delete(url, id);
    };

    function onGetUsersError() {
        $window.alert('Erreur lors de la récupération des utilisateurs');
    }

    return api;
});
