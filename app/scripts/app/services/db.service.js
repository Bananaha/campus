angular.module('campus.app').factory('dbService', function(
    $http,
    $q,
    appStateService,
    notificationService
) {

    var messages = {
            success: {
                supprimer: 'Suppression effectuée avec succès.',
                modifier: 'Modification effectuée avec succès.',
                ajouter: 'Ajout effectué avec succès.',
                archiver: 'Archivage effectué avec succès.',
                desarchiver: 'Désarchivage effectué avec succès.',
                login: 'Bienvenue'
            },
            error: {
                supprimer: 'Erreur lors de la suppression.',
                ajouter: 'Erreur lors de l\'ajout',
                modifier: 'Erreur lors de la modification.',
                archiver: 'Erreur lors de l\'archivage.',
                desarchiver: 'Erreur lors du désarchivage.',
                login: 'Erreur lors de l\'identification.'
            }
        },

        api = {};

    api.getById = function(url, id) {
        return $http.get([url, id].join('/'))
            .then(onGetSuccess, onGetError);
    };

    api.get = function(url, options) {
        options = options || {};
        return $http.get(url, options).then(onGetSuccess, onGetError);
    };

    api.edit = function(url, params) {
        if (!params.id) {
            return post('ajouter', url, params);
        }
        return post('modifier', [url, params.id].join('/'), params);
    };

    api.delete = function(url, id) {
        return post('supprimer', [url, id, 'delete'].join('/'));
    };

    api.login = function(url, params) {
        return post('login', url, params);
    };

    function post(action, url, params) {
        if (appStateService.isFrozen()) {
            return $q.reject();
        }
        appStateService.isFrozen(true);
        return $http.post(url, params)
            .then(onPostSuccess.bind(null, action))
            .catch(onPostError.bind(null, action))
            .finally(function() {
                appStateService.isFrozen(false);
            });
    }

    function onGetSuccess(res) {
        return res.data ? $q.resolve(res.data) : onGetError(res);
    }

    function onGetError(res) {
        return $q.reject(res);
    }

    function onPostSuccess(action, res) {
        notificationService.confirm(messages.success[action]);
        return res;
    }

    function onPostError(action, res) {
        notificationService.warn(messages.error[action]);
        return onGetError(res);
    }

    return api;
});
