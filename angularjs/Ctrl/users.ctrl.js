angular.module('VatApp')
        .controller('UsersCtrl', function ($scope, UserSvc, $window, $location) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            } else {
                UserSvc.getAllUsers()
                        .success(function (users) {
                            $scope.users = users;
                        })
                        .error(function (err) {

                        });
                $scope.deleteUser = function (name) {

                    if ($scope.currentUser.name === name) {
                        UserSvc.deleteUser(name).then(function (res) {
                            if (res.msg) {
                                console.log(res.data);
                                $scope.msgErrDelUser = res.data;
                            } else {
                                UserSvc.logOut();
                                $scope.currentUser = null;
                                console.log($scope.currentUser);
                                location.reload();
                            }
                        });
                    } else {
                        UserSvc.deleteUser(name).then(function (res) {
                            console.log(res);
                            $location.path('/users/');
                        });

                    }

                };
            }
        });