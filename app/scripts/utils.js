(function (global) {

    'use strict';

    function selectEl(selector) {
        var els = document.querySelectorAll(selector);
        return Array.prototype.slice.call(els, 0);
    }

    function getDataAttribute(element, key) {
        return element.dataset[key];
    }

    function getClosest(element, selector) {
        var parent = element;
        while (!parent.matches(selector) && parent.tagName !== 'BODY') {
            parent = parent.parentNode;
        }
        return parent;
    }

    function addClass(element, className) {
        if (!hasClass(element, className)) {
            element.className += ' ' + className;
        }
    }

    function removeClass(element, className) {
        element.className = classList(element).filter(function (klassName) {
            return klassName !== className;
        }).join(' ');
    }

    function hasClass(element, className) {
        return classList(element).some(function (klassName) {
            return className === klassName;
        });
    }

    function classList(element) {
        return element.className.split(/\s+/);
    } 

    function toggleClass(element, className, toggle) {
        toggle = (toggle === undefined) ? !hasClass(element, className) : toggle;
        return toggle ? addClass(element, className) : removeClass(element, className);
    }


    global.utils = {
        selectEl: selectEl,
        getDataAttribute: getDataAttribute,
        getClosest: getClosest,
        addClass: addClass,
        removeClass: removeClass,
        hasClass: hasClass,
        classList: classList,
        toggleClass: toggleClass
    };

}(window));

