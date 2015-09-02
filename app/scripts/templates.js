(function (global, u, Handlebars) {

    'use strict';

    var templateSelector = 'script[type="text/x-handlebars-template"]',
        templates = {};

    function init() {
        update();
    }

    function update(element) {
        getDOMTemplates(element).forEach(function(element) {
            var name = u.getDataAttribute(element, 'name'),
                html = element.innerHTML;

            templates[name] = Handlebars.compile(html);;    
        });
    }   

    function getDOMTemplates(parent) {
        var _parent = parent || 'body';
        return u.selectEl(_parent + ' ' + templateSelector);
    }

    function render(name, datas) {
        return templates[name](datas);
    }

    global.templates = {
        render: render
    };

    init();

}(window, window.utils, window.Handlebars));