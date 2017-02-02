angular.module('VatApp')
        .service('InvoiceSvc', function ($http, $window) {
            var svc = this;
            svc.setAuthHeaders = function (token) {
                // dołączanie nagłówka do żądań
                $http.defaults.headers.common['X-Auth'] = token;
            };
            svc.getAllFirm = function () {
                return $http.get('/api/firm/all/');
            };
            svc.getOneFirm = function (id) {
                return $http.get('/api/firm/GetOne/' + id);
            };
            svc.initStep2 = function (dId, bId) {
                return $http.get('/api/firm/StepTwo/' + dId + '/' + bId);
            };
            svc.generateInvoice = function (dataSet) {
//                console.log(dataSet);
                return $http.post('/api/invoices/', {
                    invoice_number:dataSet.invoice_number,
                    issue_date:dataSet.issue_date,
                    sell_date:dataSet.sell_date,
                    company_sell:dataSet.company_sell,
                    company_buy:dataSet.company_buy,
                    invoice_items:dataSet.invoice_items,
                    pay_by:dataSet.pay_by,
                    days_to_pay:dataSet.days_to_pay,
                    pay_date:dataSet.pay_date,
                    all_to_pay:dataSet.all_to_pay,
                    pay_in_words:dataSet.pay_in_words,
                    paid:dataSet.paid,
                    left_to_pay:dataSet.left_to_pay                    
                });
            };
            svc.getInvoice = function (iId) {
                return $http.get('/api/invoices/GetOne/' + iId);
            };
        });