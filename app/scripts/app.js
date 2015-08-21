(function (global) {

    'use strict';

    /*
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
    */
}(window));