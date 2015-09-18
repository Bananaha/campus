(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('accompagnementsController',
        function (
            $scope,
            $http,
            $timeout,
            config
        ) {

            var actions = [],
                changeTimeout;

            $http({
                    method: 'GET',
                    url: config.urls.accompagnements,
                    params: {
                        from: 0,
                        size: 60
                    }
                })
                .then(function(res) {
                    onResponse(res.data);
                });

            $scope.filter = function() {
                $timeout.cancel(changeTimeout);
                changeTimeout = $timeout(computeFilter, 300);
            };

            function computeFilter() {
                if ($scope.search) {
                    $scope.actions = getMatchingActions($scope.search.toLowerCase().split(' '));
                } else {
                    $scope.actions = actions;
                }
            }

            function getMatchingActions(search) {
                return actions.filter(function(action) {
                    return ['titre', 'auteur'].some(function(key) {
                        return search.some(function(word) {
                            return action[key].toLowerCase().indexOf(word, -1) !== -1;
                        });
                    }) || search.some(function(word) {
                            return String(action.action) === word;
                        });
                });
            }

            function onResponse(data) {
                actions = data;
                $scope.actions = actions;
            }

        });

}(window, window.angular));
