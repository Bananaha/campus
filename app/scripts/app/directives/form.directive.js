(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('form',
        function (
            $window,
            $http,
            $timeout,
            $location,
            config,
            confirmationService,
            notificationService,
            appStateService,
            localStorageService,
            modalService,
            historyService,
            dbActionsService,
            FORMDATAS
        ) {
            return {
                restrict: 'A',
                link: function ($scope, element) {

                    var name = element.attr('name'),
                        action = element.data('action'),
                        target = element.data('target'),
                        url = config.urls[name],
                        $form = $scope[name],
                        storageName = 'form-' + name,
                        initialModelStorageName = 'form-' + name + 'init',
                        initialized = false,
                        datesKeys = ['dateDebut', 'dateFin'],
                        initialModel;

                    $scope.state = {
                        valid: false,
                        submitted: false,
                        openDatepickers: {}
                    };

                    $scope.modelChanged = false;

                    $scope.constants = {
                        entites: FORMDATAS.entites,
                        permissions: FORMDATAS.permissions,
                        services: FORMDATAS.services
                    };

                    initModel();

                    $scope.$watch('model', onModelChange, true);
                    $scope.$watch('modelChanged', onModelChangedChange, true);

                    if (!historyService.getBack()) {
                        $scope.model = getModelFromStorage();
                        initialModel = localStorageService.get(initialModelStorageName);
                    } else {
                        localStorageService.remove(storageName);
                    }

                    $scope.openDatepicker = function(datepickerName) {
                        $scope.state.openDatepickers[datepickerName] = true;
                    };

                    $scope.closeDatepicker = function(datepickerName) {
                        $timeout(function() {
                            $scope.state.openDatepickers[datepickerName] = false;
                        });
                    };

                    $scope.submit = function($event) {
                        $event.preventDefault();
                        if ($form.$invalid) {
                            element.addClass('submitted');
                            notificationService.warn('erreur dans le formulaire');
                        } else if (!appStateService.isFrozen()) {
                            sendRequest();
                        }
                    };

                    $scope.cancel = function() {
                        if ($scope.modelChanged) {
                            confirmationService
                                .confirm('Voulez-vous vraiment annuler les changements que vous avez fait sur ce formulaire?')
                                    .then(cancelForm);

                        }
                    };

                    function initModel() {
                        initialized = false;

                        if (!$scope.model) {
                            $scope.model = {};
                        }

                        element.find('input[type="hidden"]').each(function(idx, el) {
                            if (el.name && el.value) {
                                $scope.model[el.name] = el.value;
                            }
                        });

                        $timeout(function() {
                            initialized = true;
                        });
                    }

                    function cancelForm() {
                        $scope.model = JSON.parse(initialModel);
                    }

                    function onModelChangedChange(value) {
                        if (initialized) {
                            appStateService.hasUnsavedData(value);
                        }
                    }

                    function getModelFromStorage() {
                        var datas = localStorageService.get(storageName);
                        if (!datas) {
                            return $scope.model;
                        }
                        datesKeys.forEach(function(key) {
                            if (datas[key]) {
                                datas[key] = new Date(datas[key]);
                            }
                        });
                        if (isDifferentModel()) {
                            $scope.modelChanged = true;
                        } else {
                            datas = $scope.model;
                        }
                        return datas;
                    }

                    function isDifferentModel() {
                        initialModel = localStorageService.get(initialModelStorageName);
                        return initialModel !== JSON.stringify($scope.model);
                    }

                    function onModelChange() {
                        if (initialized) {
                            $scope.modelChanged = isDifferentModel();
                            if ($scope.modelChanged) {
                                localStorageService.set(storageName, $scope.model);
                            } else {
                                localStorageService.remove(storageName);
                            }
                        } else if (!initialModel) {
                            // set initialModel and save it in local storage
                            initialModel = $scope.model ? JSON.stringify($scope.model) : '{}';
                            localStorageService.set(initialModelStorageName, initialModel);
                        }
                    }

                    function sendRequest() {
                        var params = formatParams(),
                            request;
                        switch (action) {
                            case 'insert':
                                request = dbActionsService.insert(url, params);
                            break;
                            case 'update':
                                request = dbActionsService.update(url, params);
                            break;
                        }

                        request
                            .then(onRequestSuccess);
                    }

                    function onRequestSuccess(res) {
                        var _url;

                        $scope.modelChanged = false;

                        modalService.hideModals();

                        if (res.data.id) {
                            if (target) {
                                _url = target + '/' + res.data.id;
                            } else {
                                _url = $location.url() + '/' + res.data.id;
                            }
                            $location.url(_url);
                        } else if (target !== '#') {
                            historyService.back();
                        }
                    }

                    function formatParams() {
                        var params = {};
                        Object.keys($scope.model).forEach(function(key) {
                            if (String($scope.model[key]).length) {
                                params[key] = $scope.model[key];
                            }
                        });
                        datesKeys.forEach(function(key) {
                            if (params[key]) {
                                params[key] = new Date(params[key]).getTime();
                            }
                        });
                        return params;
                    }
                }
            };
        }
    );

}(window, window.angular));
