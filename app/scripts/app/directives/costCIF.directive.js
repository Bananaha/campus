(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app').directive('costCif', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                settings: '=',
                cout: '='
            },
            templateUrl: 'cost-cif.html',
            link: function ($scope) {

                $scope.entries = getEntries();

                $scope.currentYear = Object.keys($scope.entries)[0];

                $scope.state = {
                    openDatepickers: {}
                };

                $scope.show = function(year) {
                    $scope.currentYear = year;
                };

                $scope.openDatepicker = function(datepickerName) {
                    console.log(datepickerName, $scope.state.openDatepickers);
                    $scope.state.openDatepickers[datepickerName] = true;
                };

                $scope.closeDatepicker = function(datepickerName) {
                    $timeout(function() {
                        $scope.state.openDatepickers[datepickerName] = false;
                    });
                };

                function formatCost(id) {
                    var model = $scope.cout.filter(function(a) {
                        return a.dateFormation === id;
                    })[0];

                    if (model) {
                        return {
                            heures: model.heures,
                            employeur: model.employeur,
                            fongecif: model.fongecif,
                            datePaiement: model.datePaiement
                        };
                    } else {
                        return {
                            heures: 0,
                            employeur: 0,
                            fongecif: 0
                        };
                    }
                }

                function getEntries() {
                    var startDate = moment($scope.settings.start),
                        diff = moment($scope.settings.end).diff(startDate, 'months', true),
                        cDate = startDate,
                        entries = {},
                        year,
                        i;

                    for (i = 0; i < diff; i++) {
                        year = cDate.format('YYYY');
                        if (!entries[year]) {
                            entries[year] = [];
                        }
                        cDate = cDate.add(1, 'month');
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
}(window, window.angular, window.moment));
