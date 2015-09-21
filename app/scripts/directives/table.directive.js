(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('table',
        function (
            $timeout,
            $http,
            $q,
            scrollEventServices
        ) {

            return {
                restrict: 'A',
                scope: {
                    config: '=table',
                    filter: '=tableFilter'
                },
                templateUrl: 'table.html',
                link: function ($scope, element) {
                    var datas = [],
                        initialized = false,
                        isLoading = false,
                        changeTimeout,
                        requestPromise,
                        actionLabels = {
                            modify: 'Modifier',
                            delete: 'Supprimer',
                            archive: 'Archiver'
                        },
                        config = {
                            itemPerPage: 30,
                            currentPage: 0
                        },
                        emitterId = 'tableDirective' + new Date().getTime();

                    scrollEventServices.add(emitterId, onScroll);

                    $scope.nextPage = function() {
                        if ($scope.hasNext && !isLoading) {
                            loading(true);
                            config.currentPage++;
                            getDatas();
                        }
                    };

                    $scope.previousPage = function() {
                        if ($scope.hasPrev) {
                            loading(true);
                            config.currentPage--;
                            getDatas();
                        }
                    };

                    $scope.sort = function(key) {
                        if ($scope.sortBy === key) {
                            $scope.sortBy = null;
                        } else {
                            $scope.sortBy = key;
                        }
                        reinitDatas();
                        getDatas();
                    };

                    $scope.callAction = function(action, id) {
                        console.log(action + ' on ' + id);
                    };

                    function init() {
                        $scope.$watch('filter', filter);
                        reinitDatas();
                        config = angular.extend(config, $scope.config);
                        config = formatConfig(config);
                        $scope.hasNext = true;
                        $scope.hasPrev = config.currentPage > 0;
                        $timeout(function() {
                            initialized = true;
                            getDatas();
                        });
                    }

                    function onScroll(windowHeight) {
                        var elInfo;
                        if (!isLoading) {
                            elInfo = element[0].getBoundingClientRect();
                            if (elInfo.top + elInfo.height < windowHeight) {
                                $scope.nextPage();
                            }
                        }
                    }

                    function formatConfig(conf) {
                        conf.cols = conf.cols.map(function(col) {
                            if (col.actions) {
                                col.actions = col.actions.map(function(action) {
                                    return {
                                        id: action,
                                        title: actionLabels[action]
                                    };
                                });
                            }
                            return col;
                        });
                        return conf;
                    }

                    function reinitDatas() {
                        $scope.datas = datas = [];
                    }

                    function getDatas() {
                        var params = {
                            from: config.currentPage,
                            size: config.itemPerPage
                        };
                        if (isLoading) {
                            requestPromise.resolve();
                        }
                        loading(true);
                        if ($scope.filter) {
                            params.filter = $scope.filter;
                        }
                        if ($scope.sortBy) {
                            params.sortBy = $scope.sortBy;
                        }

                        requestPromise = $q.defer();

                        $http({
                                method: 'GET',
                                url: config.url,
                                params: params,
                                timeout: requestPromise
                            })
                            .success(function(res) {
                                console.log(arguments, "table.directive.js - getDatas promess timeout");
                                if (res) {
                                    $timeout(function() {
                                        onResponse(res);
                                    }, 2000);
                                }
                            });
                    }

                    function filter() {
                        if (initialized) {
                            $timeout.cancel(changeTimeout);
                            changeTimeout = $timeout(computeFilter, 300);
                        }
                    }

                    function computeFilter() {
                        reinitDatas();
                        getDatas();
                    }

                    function onResponse(data) {
                        if (data.length >= config.itemPerPage) {
                            datas = datas.concat(data.slice(0, config.itemPerPage));
                            $scope.hasNext = true;
                        } else {
                            datas = datas.concat(data);
                            $scope.hasNext = false;
                        }
                        $scope.datas = datas;
                        loading(false);
                    }

                    function loading(state) {
                        isLoading = state;
                        element.toggleClass('loading', state);
                    }

                    init();
                }
            };
        }
    );

}(window, window.angular));
