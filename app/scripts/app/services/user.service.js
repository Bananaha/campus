angular.module('campus.app').factory('userService', function(
    $http,
    $q,
    appStateService,
    localStorageService,
    notificationService,
    config
) {

    var that = this,
        savedUser = localStorageService.get('user'),
        USER;

    this.get = function() {
        return USER;
    };

    this.set = function(data) {
        if (data && data.id) {
            USER = data;
            this.ID = data.id;
            localStorageService.set('user', USER);
            appStateService.isLogged(true);
        } else {
            logout();
        }
    };

    function logout() {
        localStorageService.remove('user', USER);
        appStateService.isLogged(false);
    }

    function init() {
        if (savedUser && savedUser.id) {
            validAuth(savedUser.id)
                .then(function() {
                    that.set(savedUser);
                });
        } else {
            logout();
        }
    }

    function validAuth(userId) {
        return $http({
            method: 'POST',
            url: config.urls.checkAuth,
            params: {
                id: userId
            }
        });
    }

    init();

    return this;
});
