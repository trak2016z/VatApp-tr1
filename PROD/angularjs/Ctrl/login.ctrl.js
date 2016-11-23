/* 

 */
angular.module('VatApp')
        .controller('LoginCtrl', function ($scope, UserSvc, $location, $window) {
            if ($window.localStorage.getItem('Token_jwt')) {
                $scope.msgWar = true;
            }
            $scope.login = function (username, password) {
                UserSvc.login(username, password)
                        .then(function (response) {
                            $scope.msgErrLog = null;
                            $scope.$emit('login', response.data);
                            $location.path('/');
                        });
                $scope.msgErrLog = true;
            };
        });