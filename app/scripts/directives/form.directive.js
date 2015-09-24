(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('form',
        function (
            $window,
            $http,
            $timeout,
            $location,
            config,
            appStateService,
            localStorageService,
            modalService,
            historyService,
            dbActionsService
        ) {
            return {
                restrict: 'A',
                link: function ($scope, element) {

                    var name = element.attr('name'),
                        action = element.data('action'),
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

                    $scope.model = getModelFromStorage();

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
                            $window.alert('erreur dans le formulaire ' + name);
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
                        flush();
                        modalService.hideModals();

                        if (res.data.id) {
                            $location.url($location.url() + '/' + res.data.id);
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
