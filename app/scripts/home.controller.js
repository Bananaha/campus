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
        
    });