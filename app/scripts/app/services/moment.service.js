angular.module('campus.app').factory('moment', function(
    $window
) {
    var moment = $window.moment;

    moment.locale('fr');

    return moment;
});
