(function (global, u) {

    'use strict';

    var toggler = '[data-toggle]',
        toggleClass = 'show';

    function init() {
        u.selectEl(toggler).forEach(bindEvent);
    }

    function bindEvent(el) {
        var target = u.getDataAttribute(el, 'toggle');
        el.addEventListener('click', toggle.bind(this, target));
    }

    function toggle(target) {
        u.selectEl(target).forEach(function(el) {
            u.toggleClass(el, toggleClass);
        });
    }

    init();

}(window, window.utils));