(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('table',
        function (
            $window,
            $timeout,
            $http
        ) {

            return {
                restrict: 'A',
                scope: {
                    config: '=table',
                    filter: '=tableFilter'
                },
                transclude: true,
                templateUrl: 'table.html',
                link: function ($scope, element) {
                    var datas = [],
                        changeTimeout;

                    $scope.$watch('filter', filter);

                    function init() {
                        $http({
                            method: 'GET',
                            url: $scope.config.url,
                            params: {
                                from: 0,
                                size: 60
                            }
                        })
                        .then(function(res) {
                            onResponse(res.data);
                        });
                    }

                    function filter() {
                        console.log('filter');
                        $timeout.cancel(changeTimeout);
                        changeTimeout = $timeout(computeFilter, 300);
                    };

                    function computeFilter() {
                        if ($scope.filter) {
                            $scope.datas = getMatchingActions($scope.filter.toLowerCase().split(' '));
                        } else {
                            $scope.datas = datas;
                        }
                    }

                    function getMatchingActions(search) {
                        return datas.filter(function(action) {
                            return search.every(function(word) {
                                return ['titre', 'auteur'].some(function(key) {
                                    return action[key].toLowerCase().indexOf(word, -1) !== -1;
                                }) || search.some(function(word) {
                                    return String(action.action) === word;
                                });
                            });
                        });
                    }

                    function onResponse(data) {
                        datas = data;
                        $scope.datas = datas;
                    }

                    init();
                }
            };
        }
    );

}(window, window.angular));
