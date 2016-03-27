angular.module('campus.app').factory('formationService', function(
    ACTIONS,
    dbService,
    config
) {

    var actions = ACTIONS,
        url = config.urls.formations,

        api = {};

    api.get = function(params) {
        return dbService.get(url, {params: params});
    };

    api.getById = function(id) {
        return dbService.getById(url, id);
    };

    api.edit = function(params) {
        return dbService.edit(url, params);
    };

    api.delete = function(id) {
        return dbService.delete(url, id);
    };

    api.archive = function(id) {
        return dbService.update(url, {
            id: id,
            archive: true
        });
    };

    api.unarchive = function(id) {
        return dbService.update(url, {
            id: id,
            archive: false
        });
    };

    api.getConfig = function(id) {
        return actions.filter(function(action) {
            return action.id === id;
        })[0];
    };

    return api;
});
