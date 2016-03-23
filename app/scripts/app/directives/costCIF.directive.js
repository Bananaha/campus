angular.module('campus.app').directive('costCif', function (
    $timeout,
    moment
) {
    return {
        restrict: 'E',
        scope: {
            settings: '=',
            cout: '='
        },
        templateUrl: 'cost-cif.html',
        link: function ($scope) {

            var initialized = false;

            $scope.entries = getEntries();

            $scope.currentYear = Object.keys($scope.entries)[0];

            $scope.state = {
                openDatepickers: {}
            };

            $timeout(init);

            $scope.show = function(year) {
                $scope.currentYear = year;
            };

            $scope.openDatepicker = function(datepickerName) {
                $scope.state.openDatepickers[datepickerName] = true;
            };

            $scope.closeDatepicker = function(datepickerName) {
                $timeout(function() {
                    $scope.state.openDatepickers[datepickerName] = false;
                });
            };

            $scope.onModelChange = function(entry) {
                var data = {};
                if (initialized) {
                    data = entry.model;
                    if (entry.model.datePaiement) {
                        data.datePaiement = new Date(entry.model.datePaiement).getTime();
                    }
                    $scope.cout[entry.id] = data;
                }
            };

            function init() {
                initialized = true;
            }

            function formatCost(id) {
                var model = $scope.cout[id],
                    data;

                if (model) {
                    data = {
                        heures: model.heures,
                        employeur: model.employeur,
                        fongecif: model.fongecif,
                        datePaiement: model.datePaiement
                    };
                } else {
                    data = {
                        heures: 0,
                        employeur: 0,
                        fongecif: 0,
                        datePaiement: null
                    };
                }
                return data;
            }

            function getEntries() {
                var startDate = moment($scope.settings.start),
                    diff = moment($scope.settings.end).diff(startDate, 'months', true),
                    cDate = startDate,
                    entries = {},
                    year,
                    i;

                for (i = 0; i < diff; i++) {
                    cDate = cDate.add(1, 'month');
                    year = cDate.format('YYYY');
                    if (!entries[year]) {
                        entries[year] = [];
                    }
                    entries[year].push({
                        id: cDate.format('MMYYYY'),
                        month: cDate.format('MMMM'),
                        model: formatCost(cDate.format('MMYYYY'))
                    });
                }

                return entries;
            }
        }
    };
});
