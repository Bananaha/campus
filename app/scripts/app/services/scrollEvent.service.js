angular.module('campus.app').factory('scrollEventService', function(
    $timeout,
    $window
) {

    var callbacks = {},
        throttleTimeout;

    document.addEventListener('scroll', throttle(onScroll, 40));

    function throttle(callback, limit) {
        var wait = false;
        return function () {
            if (!wait) {
                $timeout.cancel(throttleTimeout);
                callback.call();
                wait = true;
                $timeout(function () {
                    wait = false;
                }, limit);
            } else {
                throttleTimeout = $timeout(function() {
                    callback.call();
                });
            }
        };
    }

    function onScroll() {
        var height = $window.innerHeight;
        Object.keys(callbacks).forEach(function(key) {
            callbacks[key](height);
        });
    }

    this.add = function(id, callback) {
        if (!callbacks[id]) {
            callbacks[id] = callback;
        }
    };

    this.remove = function(id) {
        delete callbacks[id];
    };

    return this;
});
