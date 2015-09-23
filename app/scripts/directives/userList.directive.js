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
                scope: {},
                link: function ($scope, element) {

                    var changeTimeout,
                        blurTimeout;

                    $scope.selectedUsers = []; 

                    $scope.users = [];

                    $scope.showSearchList = false;

                    $scope.onChange = function() {
                        $scope.users = [];
                        $timeout.cancel(changeTimeout);
                        changeTimeout = $timeout(search, 500);
                    };

                    $scope.onBlur = function() {
                        $timeout.cancel(blurTimeout);
                        blurTimeout = $timeout(function() {
                            $scope.showSearchList = false;
                        }, 300);
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

                    search();

                    function search() {
                        $http({
                                method: 'GET',
                                url: config.urls.userList,
                                params: { search: $scope.search }
                            })
                            .then(onSearchRequestSuccess, onSearchRequestError);
                    }

                    function onSearchRequestSuccess(res) {
                        if (res.data && res.data.length) {
                            $scope.showSearchList = true;
                            $scope.users = res.data.splice(0,20);
                        }

                        $scope.selectedUsers = res.data;
                        $scope.showSearchList = false;
                    }

                    function onSearchRequestError() {
                        $window.alert('error lors de la recherche des utilisateurs');
                    }
                }
            };
        }
    );
}(window, window.angular));
