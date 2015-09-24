(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('dbActionsService',
        function(
            $http,
            appStateService,
            notificationService
        ) {

            var messages = {
                success: {
                    supprimer: 'Suppression effectuée avec succès.',
                    modifier: 'Modification effectuée avec succès.',
                    ajouter: 'Ajout effectué avec succès.',
                    archiver: 'Archivage effectué avec succès.'
                },
                error: {
                    supprimer: 'Erreur lors de la suppression.',
                    ajouter: 'Erreur lors de l\'ajout',
                    modifier: 'Erreur lors de la modification.',
                    archiver: 'Erreur lors de l\'archivage.'
                }
            };

            this.insert = function(url, params) {
                return httpRequest('ajouter', url, params);
            };

            this.update = function(url, params) {
                return httpRequest('modifier', url, params);
            };

            this.delete = function(url, id) {
                var params = {
                    id: id
                };
                url = url + '/supprimer';
                return httpRequest('supprimer', url, params);
            };

            this.archive = function(url, id) {
                var params = {
                    id: id
                };
                url = url + '/archiver';
                return httpRequest('archiver', url, params);
            };

            function httpRequest(action, url, params) {
                var request;
                if (!appStateService.isFrozen()) {
                    appStateService.isFrozen(true);
                    request = $http({
                        method: 'POST',
                        url: url,
                        params: params
                    });
                    request.then(onRequestSuccess.bind(null, action), onRequestError.bind(null, action));
                    return request;
                }
                return false;
            }

            function onRequestSuccess(action) {
                appStateService.isFrozen(false);
                notificationService.confirm(messages.success[action]);
            }

            function onRequestError(action) {
                appStateService.isFrozen(false);
                notificationService.warn(message.error[action]);
            }

            return this;
        }
    );

}(window, window.angular));

