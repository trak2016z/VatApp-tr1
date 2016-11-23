/* 
 */


angular.module('VatApp')
        .service('UserSvc', function ($http, $window) {
            var svc = this;
            svc.getUser = function () {
                return $http.get('/api/users');
            };
            svc.getAllUsers = function(){
                return $http.get('/api/users/all');
            };
            svc.setAuthHeaders = function (token) {
                // dołączanie nagłówka do żądań
                $http.defaults.headers.common['X-Auth'] = token;
            };
            svc.getLogUser = function (local_token) {
                svc.setAuthHeaders(local_token);
                return svc.getUser();
            };
            svc.login = function (username, password) {
                return $http.post('/api/sessions', {
                    name: username, pass: password
                }).then(function (val) {
                    svc.setAuthHeaders($window.localStorage['Token_jwt'] = val.data);
                    return svc.getUser();
                });
            };
            svc.createUser = function (username, password) {
                return $http.post('/api/users', {
                    name: username, pass: password
                }).then(function (res, err, next) {
                    if (err) {
                        return next(err);
                    } else {
                        return svc.login(username, password);
                    }
                });
            };
            svc.deleteUser = function (name){
                return $http.post('/api/users/delete', {
                    name: name
                }).then(function(res){
                    return res.data;
                });
            };
            svc.logOut = function () {
                $window.localStorage.removeItem('Token_jwt');
            };

        });