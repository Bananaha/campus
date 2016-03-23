angular.module('campus.app').controller('suiviBudgetController', function (
    $scope,
    $http,
    notificationService,
    config
) {

    $http.get(config.urls.suiviBudget)
        .then(onGetBudgetSuccess, onGetBudgetError);

    function onGetBudgetError() {
        notificationService.warn('Erreur lors de la récupération du budget.');
    }

    function onGetBudgetSuccess(res) {
        $scope.graphs = res.data.graph;
        $scope.coutDirect = res.data.coutDirect;
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
