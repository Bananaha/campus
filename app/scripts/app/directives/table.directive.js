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
            formatterService,
            confirmationService,
            FORMDATAS,
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
                    var initialized = false,
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
                            case 'session':
                                $location.url('sessions/' + item.id);
                            break;
                        }
                    };

                    $scope.callAction = function(action, item) {
                        var currentLocation = $location.url(),
                            requestName,
                            callback,
                            confirmSentence;

                        if (action !== 'modify') {
                            confirmSentence = getSentence(action, item);
                        }

                        switch (action) {
                            case 'modify':
                                $location.url(currentLocation + '/' + item.id + '/modifier');
                            break;
                            case 'delete':
                                requestName = 'delete';
                                callback = removeItem.bind(this, item.id);

                            break;
                            case 'archive':
                                requestName = 'archive';
                                callback = archiveItem.bind(this, item);
                            break;
                            case 'desarchiver':
                                requestName = 'unarchive';
                                callback = unarchiveItem.bind(this, item);
                            break;
                        }
                        if (confirmSentence && requestName) {
                            confirmationService
                                .confirm(confirmSentence)
                                    .then(function() {
                                        dbActionsService[requestName](config.url, item.id).then(callback);
                                    });
                        }
                    };

                    $scope.shouldShowAction = function(data, action) {
                        var show = true;
                        switch (action.id) {
                            case 'desarchiver':
                                show = data.archive && actionIsAllowed(action.id, data.allow);
                            break;
                            case 'archive':
                                show = !data.archive && actionIsAllowed(action.id, data.allow);
                            break;
                            case 'delete':
                                show = actionIsAllowed(action.id, data.allow);
                            break;
                        }
                        return show;
                    };

                    function actionIsAllowed(actionId, allowedActions) {
                        if (!allowedActions) {
                            return false;
                        }
                        return allowedActions.some(function(action) {
                            return action === actionId;
                        });
                    }

                    function getSentence(action, item) {
                        var sentence = ['Voulez-vous vraiment'],
                            type;

                        if (item.action) {
                            type = 'formation';
                        } else if (item.nom) {
                            type = 'user';
                        }

                        switch (action) {
                            case 'delete': sentence.push('supprimer'); break;
                            case 'archive': sentence.push('archiver'); break;
                            case 'desarchiver': sentence.push('désarchiver'); break;
                        }

                        switch (type) {
                            case 'user': sentence.push('l\'utilisateur ' + item.prenom + ' ' + item.nom); break;
                            case 'session': sentence.push('la session ' + item.id); break;
                            case 'formation': sentence.push('la formation ' + item.id); break;
                        }
                        sentence.push('?');
                        return sentence.join(' ');
                    }

                    function init() {
                        $scope.$watch('filters', filters, true);
                        if ($scope.config.params) {
                            $scope.$watch('config.params', filters, true);
                        }
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

                    function archiveItem(item) {
                        item.archive = true;
                    }

                    function unarchiveItem(item) {
                        item.archive = false;
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
                        $scope.datas = [];
                    }

                    function getFiltersParams(params) {
                        if ($scope.filters) {
                            if ($scope.filters.search) {
                                params.search = $scope.filters.search;
                            }
                            if ($scope.filters.filters) {
                                Object.keys($scope.filters.filters).forEach(function(key) {
                                    params[key] = $scope.filters.filters[key];
                                });
                            }
                        }
                        if ($scope.sortBy) {
                            params.sortBy = $scope.sortBy;
                        }
                        return params;
                    }

                    function getDatas() {
                        var params = $scope.config.params ? angular.copy($scope.config.params) : {},
                            configParams = {
                                from: config.currentPage,
                                size: config.itemPerPage
                            };

                        if (isLoading && requestPromise) {
                            requestPromise.resolve();
                        }
                        loading(true);

                        angular.extend(params, getFiltersParams(configParams));

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
                                d.permission = FORMDATAS.permissions.filter(function(perm) {
                                    return perm.id === d.permission;
                                })[0].label;
                            }
                            if (d.dispositif) {
                                d.dispositif = ACTIONS.filter(function(action) {
                                    return action.id === d.dispositif;
                                })[0].abbr;
                            }
                            return formatterService.format(d);
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
