(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('form',
        function (
            $window,
            $http,
            $timeout,
            $location,
            config,
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
                        initialized = false,
                        datesKeys = ['from', 'to'];

                    $scope.state = {
                        valid: false,
                        submitted: false,
                        openDatepickers: {}
                    };

                    $scope.constants = {
                        entites: FORMDATAS.entites,
                        permissions: FORMDATAS.permissions,
                        services: FORMDATAS.services
                    };

                    $scope.model = getModelFromStorage();

                    element.find('input[type="hidden"]').each(function(idx, el) {
                        if (el.name && el.value) {
                            $scope.model[el.name] = el.value;
                        }
                    });

                    $scope.$watch('model', onModelChange, true);

                    $timeout(function() {
                        initialized = true;
                    });

                    $scope.openDatepicker = function(datepickerName) {
                        $scope.state.openDatepickers[datepickerName] = true;
                    };

                    $scope.closeDatepicker = function(datepickerName) {
                        $timeout(function() {
                            $scope.state.openDatepickers[datepickerName] = false;
                        });
                    };

                    $scope.submit = function() {
                        if ($form.$invalid) {
                            element.addClass('submitted');
                            notificationService.warn('erreur dans le formulaire');
                        } else if (!appStateService.isFrozen()) {
                            sendRequest();
                        }
                    };

                    $scope.cancel = function() {
                        flush();
                        modalService.hideModals();
                    };

                    function getModelFromStorage() {
                        var datas = localStorageService.get(storageName);
                        if (!datas) {
                            return {};
                        }
                        datesKeys.forEach(function(key) {
                            if (datas[key]) {
                                datas[key] = new Date(datas[key]);
                            }
                        });
                        return datas;
                    }

                    function flush() {
                        appStateService.isFrozen(false);
                        $scope.model = {};
                    }

                    function onModelChange() {
                        if (initialized) {
                            localStorageService.set(storageName, $scope.model);
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
                        var url;

                        flush();
                        modalService.hideModals();

                        if (res.data.id) {
                            if (target) {
                                url = target + '/' + res.data.id;
                            } else {
                                url = $location.url() + '/' + res.data.id;
                            }
                            $location.url(url);
                        } else {
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
