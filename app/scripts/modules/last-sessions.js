(function (global, api, u, $, templates) {

    'use strict';

    var $els,
        selectors = {
            module: '.module-lastSessions',
            container: '.module-list'
        };

    function init() {
        $els = $(selectors.module);
        if ($els.length) {
            $.ajax(api.settings.services.lastSessions)
                .done(onResponse);
        }
        
    }

    function onResponse(res) {
        var html = templates.render('lastSessions', res);
        $els.find(selectors.container).html(html);
    }

    global.api.modules.lastSessions = {
        init: init
    };  

    init(); 

}(window, window.api, window.utils, window.jQuery, window.templates));