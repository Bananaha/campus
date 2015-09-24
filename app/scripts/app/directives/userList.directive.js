(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('userList', function (
            $timeout,
            $window,
            $http,
            config
        ) {
            return {
                restrict: 'E',
                templateUrl: 'user-list.html',
                scope: {
                    selectedUsers: '=users'
                },
                link: function ($scope, element) {

                    var changeTimeout,
                        blurTimeout,
                        blurDelay = 100,
                        changeDelay = 500;

                    $scope.users = [];

                    $scope.showSearchList = false;

                    $scope.selectedUsers = $scope.selectedUsers || [];

                    $scope.onChange = function() {
                        $scope.users = [];
                        $timeout.cancel(changeTimeout);
                        changeTimeout = $timeout(search, changeDelay);
                    };

                    $scope.onBlur = function() {
                        $timeout.cancel(blurTimeout);
                        blurTimeout = $timeout(function() {
                            $scope.showSearchList = false;
                        }, blurDelay);
                    };

                    $scope.onFocus = function() {
                        if ($scope.users.length) {
                            $timeout.cancel(blurTimeout);
                            $scope.showSearchList = true;
                        }
                    };

                    $scope.selectUser = function(id) {
                        var user = $scope.users.filter(function(_user) {
                            return _user.id === id;
                        })[0];

                        if (!$scope.selectedUsers.some(function(_user) {
                            return _user.id === user.id;
                        })) {
                            $scope.selectedUsers.push(user);
                            $scope.showSearchList = false;
                        }
                        reinitSearch();
                    };

                    $scope.removeUser = function(id) {
                        var i = 0;
                        for (i = 0; i < $scope.selectedUsers.length; i++) {
                            if ($scope.selectedUsers[i].id === id) {
                                $scope.selectedUsers.splice(i, 1);
                                break;
                            }
                        }
                    };

                    function reinitSearch() {
                        $scope.search = null;
                        $scope.users = [];
                    }

                    function search() {
                        loading(true);
                        $http({
                                method: 'GET',
                                url: config.urls.userList,
                                params: { search: $scope.search }
                            })
                            .then(onSearchRequestSuccess, onSearchRequestError);
                    }

                    function onSearchRequestSuccess(res) {
                        $timeout(function() {
                            if (res.data && res.data.length) {
                                $scope.showSearchList = true;
                                $scope.users = res.data.splice(0, 20);
                            }
                            loading(false);
                        }, 2000);
                    }

                    function onSearchRequestError() {
                        loading(false);
                        $window.alert('error lors de la recherche des utilisateurs');
                    }

                    function loading(state) {
                        element.toggleClass('loading', state);
                    }
                }
            };
        }
    );
}(window, window.angular));