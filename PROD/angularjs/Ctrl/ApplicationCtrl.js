/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('VatApp')
        .controller('ApplicationCtrl', function ($scope, UserSvc, $window) {
            if ($window.localStorage.getItem('Token_jwt')) {
                UserSvc.getLogUser($window.localStorage.getItem('Token_jwt'))
                        .then(function (response) {
                            $scope.currentUser = response.data;
                        });
            }
            $scope.$on('login', function (_, username) {
                $scope.currentUser = username;
            });
            $scope.logOut = function () {
                UserSvc.logOut();
                $scope.currentUser = null;
            };
        });