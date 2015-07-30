(function (global) {

    'use strict';
    bindEvents(); 
    function bindEvents() {
        var openers = selectEl('.modal-opener'),
        closers = selectEl('.modal-closer');
        openers.forEach(function(opener) {
            var modalName = getDataAttribute(opener, 'modalTarget'),
            modalSelection = '.modal[data-modal=' + modalName + ']',
            modals = selectEl(modalSelection),
            modal = modals[0];
            if (modal) {
                opener.addEventListener('click', openModal.bind(global, modal));
            }
    }); 
        closers.forEach(function(closer) {
        closer.addEventListener('click', closeModal);
    });
    }
    function openModal(modal) {
        addClass(modal, 'show');
    }
    function closeModal(e) {
        var modal = getClosest(e.target, '.modal');
        removeClass(modal, 'show');
    }
  // UTILS FUNCTIONS
  // retourne un tableau des éléments sélectionnés
  // ex: selectEl('.modal-opener') -> [button, button...]
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
}(window));