angular.module('campus.app').factory('sessionService', function(
    ACTIONS,
    dbService,
    userService,
    config
) {

    var url = config.urls.sessions,

        api = {};

    api.getForUser = function(params) {
        params = params || {};
        params.user = userService.ID;
        return dbService.get(url, {params: params});
    };

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

    return api;
});
