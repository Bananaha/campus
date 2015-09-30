(function (global, angular) {
    'use strict';

    angular.module('campus.app').directive('userList', function (
            $timeout,
            $window,
            $http,
            config,
            utilisateursService
        ) {
            return {
                restrict: 'E',
                templateUrl: 'utilisateurs-list.html',
                scope: {
                    selectedUsers: '=users',
                    frozen: '=frozen'
                },
                link: function ($scope, element) {

                    var changeTimeout,
                        blurTimeout,
                        blurDelay = 100,
                        changeDelay = 300;

                    $scope.users = [];

                    $scope.showSearchList = false;

                    $scope.selectedUsers = $scope.selectedUsers || [];

                    $scope.displayedUsers = [];

                    if ($scope.selectedUsers.length) {
                        getInitialUsers();
                    } else {
                        $scope.ready = true;
                    }

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
                            $scope.selectedUsers.push(user.id);
                            $scope.displayedUsers.push(user);
                            $scope.showSearchList = false;
                        }
                        reinitSearch();
                    };

                    $scope.removeUser = function(id) {
                        var i = 0;
                        for (i = 0; i < $scope.displayedUsers.length; i++) {
                            if ($scope.displayedUsers[i].id === id) {
                                $scope.displayedUsers.splice(i, 1);
                                break;
                            }
                        }
                        for (i = 0; i < $scope.selectedUsers.length; i++) {
                            if ($scope.selectedUsers[i] === id) {
                                $scope.selectedUsers.splice(i, 1);
                                break;
                            }
                        }
                    };

                    function reinitSearch() {
                        $scope.search = null;
                        $scope.users = [];
                    }

                    function getInitialUsers() {
                        var idOnly = $scope.selectedUsers.every(function(user) {
                                return !angular.isObject(user);
                            });
                        if (idOnly) {
                            getUsers($scope.selectedUsers);
                        } else {
                            $scope.ready = true;
                        }
                    }

                    function getUsers(ids) {
                        utilisateursService
                            .getUsers(ids)
                            .then(onGetUsers);
                    }

                    function onGetUsers(res) {
                        $scope.displayedUsers = res.data;
                        $scope.ready = true;
                    }

                    function search() {
                        loading(true);
                        $http({
                                method: 'GET',
                                url: config.urls.utilisateursSearch,
                                params: { search: $scope.search }
                            })
                            .then(onSearchRequestSuccess, onSearchRequestError);
                    }

                    function onSearchRequestSuccess(res) {
                        if (res.data && res.data.length) {
                            $scope.showSearchList = true;
                            $scope.users = res.data.splice(0, 20);
                        }
                        loading(false);
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
