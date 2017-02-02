angular.module('VatApp')
        .service('CompSvc', function ($http, $window) {
            var svc = this;
            svc.setAuthHeaders = function (token) {
                // dołączanie nagłówka do żądań
                $http.defaults.headers.common['X-Auth'] = token;
            };
            svc.createCompany = function (dataSet) {
                return $http.post('/api/firm/', dataSet);
            };
            svc.getAllCompany = function () {
                return $http.get('/api/firm/all');
            };
            svc.getOneFirm = function (id) {
                return $http.get('/api/firm/GetOne/'+ id);
            };
            this.deleteFirm = function(firmId) {
                return $http.post('/api/firm/delete/', firmId);
            };
        });

              