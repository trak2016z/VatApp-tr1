

angular.module('VatApp')
        .controller('FilesCtrl', function ($scope, FilesSvc, $location, $window) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            }
        });