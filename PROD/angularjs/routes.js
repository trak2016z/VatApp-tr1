/*
 * Author: Thulu Software
 *           
 */

angular.module('VatApp')
        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $routeProvider
                    .when('/', {controller: 'PostsCtrl', templateUrl: 'pages/posty.html'})
                    .when('/register', {controller: 'RegisterCtrl', templateUrl: 'pages/register.html'})
                    .when('/login', {controller: 'LoginCtrl', templateUrl: 'pages/login.html'})
                    .when('/files', {controller: 'FilesCtrl', templateUrl: 'pages/files.html'})
                    .when('/users', {controller: 'UsersCtrl', templateUrl: 'pages/users.html'})
                    ;
        });
