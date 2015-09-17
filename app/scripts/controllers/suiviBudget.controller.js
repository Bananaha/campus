(function (global, angular) {
    'use strict';

    angular.module('campus.app')
    .controller('suiviBudgetController',
        function (
            config,
            $scope,
            $http
        ) {

            $http.get(config.urls.suiviBudget)
            .then(function(res) {
                onResponse(res.data);
            });

            function onResponse(data) {
                $scope.graphs = data.graph;
                $scope.coutDirect = data.coutDirect;
                initGraph();
            }

            function initGraph() {
                var values = $scope.graphs.map(function(graph) {
                        return graph.value;
                    }),
                    max = Math.max.apply(this, values);
                $scope.max = max * 1.10;
                $scope.graphs = $scope.graphs.map(function(graph) {
                    graph.height = graph.value / $scope.max * 100;
                    return graph;
                });
                $scope.colWidth = 100 / $scope.graphs.length;
            }
        });

}(window, window.angular));