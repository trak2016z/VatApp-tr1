/*
 * Author: Thulu Software
 *           
 */

angular.module('VatApp')
        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true
            });
            $routeProvider
                    .when('/', {controller: 'PostsCtrl', templateUrl: 'pages/posty.html'})
                    .when('/register', {controller: 'RegisterCtrl', templateUrl: 'pages/register.html'})
                    .when('/login', {controller: 'LoginCtrl', templateUrl: 'pages/login.html'})
                    .when('/invoice/step4/:iId', {controller: 'InvoiceStep4Ctrl', templateUrl: 'pages/invoice_step4.html'})
                    .when('/invoice/step3/:dId/:bId', {controller: 'InvoiceStep3Ctrl', templateUrl: 'pages/invoice_step3.html'})            
                    .when('/invoice/:dId/:bId', {controller: 'InvoiceStep2Ctrl', templateUrl: 'pages/invoice_step2.html'})
                    .when('/invoice', {controller: 'InvoiceCtrl', templateUrl: 'pages/invoice_start.html'})
                    .when('/users', {controller: 'UsersCtrl', templateUrl: 'pages/users.html'})
                    .when('/addCompany', {controller: 'CompCtrl', templateUrl: 'pages/addCompany.html'})
                    ;
        });
