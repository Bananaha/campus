angular.module('campus.app').factory('userService', function(
    appStateService,
    localStorageService,
    dbService,
    config
) {

    var savedUser = localStorageService.get('user'),
        USER,
        url = config.urls.login,

        api = {};

    api.get = function() {
        return USER;
    };

    api.set = function(data) {
        if (data && data.id) {
            USER = data;
            api.ID = data.id;
            localStorageService.set('user', USER);
            appStateService.isLogged(true);
        } else {
            logout();
        }
    };

    api.login = function(credentials) {
        return dbService.login(url, credentials)
            .then(function(res) {
                api.set(res.data);
            });
    };

    function logout() {
        localStorageService.remove('user', USER);
        appStateService.isLogged(false);
    }

    function init() {
        if (savedUser && savedUser.id) {
            validAuth(savedUser.id)
                .then(function() {
                    api.set(savedUser);
                });
        } else {
            logout();
        }
    }

    function validAuth(userId) {
        return dbService.get(url, {id: userId});
    }

    init();

    return api;
});
