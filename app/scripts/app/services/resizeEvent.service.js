angular.module('campus.app').factory('resizeEventService', function(
    $timeout
) {

    var callbacks = {},
        throttleTimeout;

    global.addEventListener('resize', throttle(onResize, 40));

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

    function onResize() {
        Object.keys(callbacks).forEach(function(key) {
            callbacks[key]();
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
