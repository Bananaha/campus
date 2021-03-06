angular.module('campus.app').controller('AppController', function(
    $scope,
    $location,
    $timeout,
    $window,
    modalService,
    appStateService,
    historyService,
    userService,
    confirmationService
) {

    var that = this,
        redirecting = false;

    $scope.modal = false;

    $scope.page = $location.url().replace('/', '');

    appStateService.onChange(onAppStateChange);

    $scope.$on('$locationChangeStart', onLocationChange);

    this.showBack = false;

    this.showView = false;

    this.goTo = function(url) {
        if ($scope.modal) {
            modalService.hideModals();
        }
        $location.url('/' + url);
        $scope.page = url;
    };

    this.showModal = function(modalName) {
        $scope.modal = true;
        modalService.show('modal-' + modalName, onModalHide);
    };

    this.back = function() {
        historyService.back();
    };

    this.logout = function() {
        $location.url('/login');
    };

    function updateShowBack() {
        that.showBack = historyService.hasBack() && $location.url().split('/').length > 2;
    }

    function onLocationChange(event, next) {
        if (appStateService.hasUnsavedData() && !redirecting) {
            event.preventDefault();
            confirmationService.confirm('Si vous quittez cette page sans sauvegarder, vos changements seront perdus. Voulez-vous vraiment quitter cette page?')
                .then(onForgetUnsavedDataConfirm.bind(that, next));
        } else {
            onLocationChangeComplete();
        }
    }

    function onForgetUnsavedDataConfirm(next) {
        redirecting = true;
        appStateService.hasUnsavedData(false);
        $window.location.href = next;
        onLocationChangeComplete();
        $timeout(function() {
            redirecting = false;
        });
    }

    function onLocationChangeComplete() {
        modalService.hideModals();
        historyService.onLocationChange();
        updateShowBack();
        onAppStateChange();
    }

    function onModalHide() {
        $scope.modal = false;
    }

    function onAppStateChange() {
        that.logged = appStateService.isLogged();
        that.loading = appStateService.isLoading();
        that.frozen = appStateService.isFrozen();
        that.confirmating = appStateService.isConfirmating();

        if (that.logged === false && $location.url() !== '/login') {
            that.logout();
        }

        if (that.confirmating) {
            initConfirmation();
        }

        that.showView = $location.url() === '/login' || that.logged;

        if (that.showView) {
            that.user = userService.get();
        }
    }

    // CONFIRMATION

    $scope.confirm = function(res) {
        confirmationService.answer(res);
    };

    function initConfirmation() {
        $scope.confirmSentence = confirmationService.getSentence();
    }
});
