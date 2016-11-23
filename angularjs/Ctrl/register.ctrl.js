angular.module('VatApp')
        .controller('RegisterCtrl', function ($scope, UserSvc, $location) {
            $scope.createUser = function (username, password, password2) {
                if (password !== password2) {
                    $scope.msgErrPass = true;
                } else {
                    $scope.msgErrPass = null;
                    UserSvc.createUser(username, password, password2)
                            .then(function (response) {
                                $scope.$emit('login', response.data);
                                $location.path('/');
                                //console.log(response.data);                                
                            });
                } 

            };
        });