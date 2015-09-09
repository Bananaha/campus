'use strict';

angular.module('campus.app').controller('homeController',
    function (
        $scope
    ) {

    	$scope.lastSessions = [{
			"title": "FC_ORANGE_REGLES_DES_CLIENTS BNP PARIBAS",
			"link": "#"
		}, {
			"title": "FC_SFR Business Team_temps fort Novembre 2014",
			"link": "#"
		}, {
			"title": "RAN_SFR BT_Campagne THD",
			"link": "#"
		}];

		$scope.reporting = {
			options: [{
				label: 'Nombre de formations continues',
				id: 'formationsContinues'
			}, {
				label: 'Nombre de sessions ouvertes',
				id: 'sessionsOuvertes'
			}, {
				label: 'Budget dépensé en formation',
				id: 'budgetDepenseFormation'
			}],
			from: {
				value: null,
				opened: true
			},
			to: {
				value: null,
				opened: false
			}
		};

		$scope.open = function(name) {
			$scope.reporting[name].opened = true;
		}        
    });