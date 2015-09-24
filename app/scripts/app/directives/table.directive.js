(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('table',
        function (
            $location,
            $timeout,
            $http,
            $q,
            scrollEventService,
            dbActionsService
        ) {

            return {
                restrict: 'A',
                scope: {
                    config: '=table',
                    filters: '=tableFilters'
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

                    scrollEventService.add(emitterId, onScroll);

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
                        var currentLocation = $location.url();
                        switch (action) {
                            case 'detail':
                                $location.url(currentLocation + '/' + id);
                            break;
                            case 'modify':
                                $location.url(currentLocation + '/' + id + '/modifier');
                            break;
                            case 'delete':
                                dbActionsService.delete(config.url, id);
                            break;
                            case 'archive':
                                dbActionsService.archive(config.url, id);
                            break;
                        }
                    };

                    function init() {
                        $scope.$watch('filters', filters, true);
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

                    function getFiltersParams(params) {
                        var types;
                        if ($scope.filters) {
                            if ($scope.filters.search) {
                                params.search = $scope.filters.search;
                            }
                            if ($scope.filters.type) {
                                types = Object.keys($scope.filters.type).reduce(function(sum, key) {
                                    if ($scope.filters.type[key]) {
                                        sum.push(key);
                                    }
                                    return sum;
                                }, []);
                                if (types.length) {
                                    params.types = types;
                                }
                            }
                        }
                        if ($scope.sortBy) {
                            params.sortBy = $scope.sortBy;
                        }
                        return params;
                    }

                    function getDatas() {
                        var params = {
                            from: config.currentPage,
                            size: config.itemPerPage
                        };
                        if (isLoading && requestPromise) {
                            requestPromise.resolve();
                        }
                        loading(true);
                        params = getFiltersParams(params);

                        requestPromise = $q.defer();

                        $http({
                                method: 'GET',
                                url: config.url,
                                params: params,
                                timeout: requestPromise
                            })
                            .success(function(res) {
                                if (res) {
                                    onResponse(res);
                                }
                            });
                    }

                    function filters() {
                        if (initialized) {
                            console.log('TODO: Filters'); // eslint-disable-line
                            $timeout.cancel(changeTimeout);
                            changeTimeout = $timeout(computeFilters, 300);
                        }
                    }

                    function computeFilters() {
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
