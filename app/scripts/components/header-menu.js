(function (global, u) {

    'use strict';

    console.log('header-menu');

    var selectors = {
            button: '.header-menu-button',
            box: '.header-menu-box',
            closer: 'html'
        },
        toggleClass = 'show',
        box = u.selectEl(selectors.box)[0];

    u.selectEl(selectors.button).forEach(function(el) {
        el.addEventListener('click', onButtonClick);
    });

    u.selectEl(selectors.closer).forEach(function(el) {
        el.addEventListener('click', onHtmlClick);
    });  

    function hideHeaderMenu() {
        u.removeClass(box, toggleClass);
    }

    function onButtonClick() {
        u.toggleClass(box, toggleClass);
    }

    function onHtmlClick(e) {
        if (!u.getClosest(e.target, '.header-menu')) {
            hideHeaderMenu();
        }
    }

}(window, window.utils));