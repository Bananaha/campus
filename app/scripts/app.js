(function (global, u) {

    'use strict';

    var basePath = 'assets/json/',
        settings = {
            services: {
                lastSessions: basePath + 'last-sessions.json'
            }
        };

    global.api = {
        settings: settings,
        modules: {}
    };
   
}(window, window.utils));