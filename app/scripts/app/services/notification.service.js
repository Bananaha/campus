angular.module('campus.app').factory('notificationService', function(
) {

    var callbacks = [];

    this.onTalk = function(callback) {
        callbacks.push(callback);
    };

    this.say = function(message) {
        trigger(message);
    };

    this.warn = function(message) {
        trigger(message, 'warn');
    };

    this.confirm = function(message) {
        trigger(message, 'confirm');
    };

    function trigger(message, type) {
        callbacks.forEach(function(callback) {
            callback(message, type);
        });
    }

    return this;
});
