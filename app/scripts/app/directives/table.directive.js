(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('table',
        function (
            $location,
            $timeout,
            $http,
            $q,
            scrollEventService,
            dbActionsService,
            PERMISSIONS,
            ACTIONS
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

                    $scope.datas = [];

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

                    $scope.goTo = function(type, item) {
                        switch (type) {
                            case 'utilisateur':
                                $location.url('utilisateurs/' + (item.auteurId || item.id));
                            break;
                            case 'formation':
                                $location.url('formations/' + item.id);
                            break;
                        }
                    };

                    $scope.callAction = function(action, item) {
                        var currentLocation = $location.url(),
                            request,
                            callback;
                        switch (action) {
                            case 'modify':
                                $location.url(currentLocation + '/' + item.id + '/modifier');
                            break;
                            case 'delete':
                                request = dbActionsService.delete(config.url, item.id);
                                callback = removeItem.bind(this, item.id);
                            break;
                            case 'archive':
                                request = dbActionsService.archive(config.url, item.id);
                                callback = disableItem.bind(this, item.id);
                            break;
                            case 'desarchiver':
                                request = dbActionsService.unarchive(config.url, item.id);
                                callback = disableItem.bind(this, item.id);
                            break;
                        }
                        if (request) {
                            request.then(callback);
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

                    function removeItem(id) {
                        var i;
                        for (i = 0; i < $scope.datas.length; i++) {
                            if ($scope.datas[i].id === id) {
                                $scope.datas.splice(i, 1);
                                return;
                            }
                        }

                    }

                    function disableItem(id) {
                        $scope.datas.filter(function(item) {
                            return item.id === id;
                        })[0].disabled = true;
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
                        $scope.hasNext = data.length >= config.itemPerPage;
                        data = format(data.slice(0, config.itemPerPage));
                        Array.prototype.push.apply($scope.datas, data);
                        loading(false);
                    }

                    function format(data) {
                        return data.map(function(d) {
                            if (angular.isNumber(d.permission)) {
                                d.permission = PERMISSIONS.filter(function(perm) {
                                    return perm.id === d.permission;
                                })[0].label;
                            }
                            if (d.type) {
                                d.type = ACTIONS.filter(function(action) {
                                    return action.id === d.type;
                                })[0].abbr;
                            }
                            return d;
                        });
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
