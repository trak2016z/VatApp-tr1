angular.module('VatApp')
        .controller('InvoiceStep3Ctrl', function ($scope, $routeParams, $filter, $location, $window, InvoiceSvc, ItemsSvc) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            } else {
                if ($scope.firms === undefined) {
                    $scope.firms = [];
                }
                if ($scope.dataSet === undefined) {
                    $scope.dataSet = [];
                    $scope.dataSet.dateOfIssue = new Date();
                    $scope.dataSet.dateOfSell = new Date();
                    $scope.dataSet.payTerm = new Date();
                }
//                console.log($routeParams.dId + ' ' + $routeParams.bId);
                InvoiceSvc.initStep2($routeParams.dId, $routeParams.bId)
                        .success(function (response) {
                            $scope.firms.currentDealer = response.dealer;
                            $scope.firms.currentBuyer = response.buyer;
                        })
                        .error(function (err) {
                            console.log("Błąd: " + err);
                        });

                ItemsSvc.fetch()
                        .success(function (items) {
                            $scope.dataSet.AddedProd = items;
                            getFullCalc($scope.dataSet.AddedProd);
                        })
                        .error(function (err) {
                            console.log("Błąd: " + err);
                        });
                var getFullCalc = function (data) {
                    $scope.dataSet.EndCalc = [];
                    var groups = {
                        group_name: String,
                        group_item: []
                    };
                    var groupsArray = [];
                    var pom = [];
                    pom.taxRate = "";
                    pom.netto = 0;
                    pom.vat = 0;
                    pom.brutto = 0;

                    pom.nettoFull = 0;
                    pom.vatFull = 0;
                    pom.bruttoFull = 0;

                    angular.forEach(data, function (value, key) {
                        pom.taxRate = value.taxRate;
                        pom.netto = pom.netto + Number(value.priceFullN);
                        pom.vat = pom.vat + Number(value.taxFullRate);
                        pom.brutto = pom.brutto + Number(value.endPrice);

                        pom.nettoFull = Number(pom.netto);
                        pom.vatFull = Number(pom.vat);
                        pom.bruttoFull = Number(pom.brutto);

                    });
                    $scope.dataSet.EndCalc.unshift(pom);
                };
                $scope.generateInvoice = function () {
                    var data = [];
                    data = prepareData();
//                    console.log(data);
                    InvoiceSvc.generateInvoice(data)
                            .success(function (invoice) {
//                                console.log(invoice);
                                $location.path('/invoice/step4/' + invoice._id);
                            }).error(function (err) {
                        console.log("Błąd: " + err);
                    });
                };
                var prepareData = function () {
                    var dataSet = [];
                    dataSet.invoice_number = $scope.dataSet.invoiceNum;
                    dataSet.issue_date = $scope.dataSet.dateOfIssue;
                    dataSet.sell_date = $scope.dataSet.dateOfSell;
                    dataSet.company_sell = $scope.firms.currentDealer._id;
                    dataSet.company_buy = $scope.firms.currentBuyer._id;
                    dataSet.invoice_items = $scope.dataSet.AddedProd;

                    if ($scope.dataSet.payForm === '1') {
                        dataSet.pay_by = "Przelew";
                    } else if ($scope.dataSet.payForm === '2') {
                        dataSet.pay_by = "Gotówka";
                    } else if ($scope.dataSet.payForm === '3') {
                        dataSet.pay_by = "Karta płatnicza";
                    }

                    dataSet.days_to_pay = $scope.dataSet.dayToPay;
                    dataSet.pay_date = $scope.dataSet.payTerm;
                    dataSet.all_to_pay = $filter('number')($scope.dataSet.EndCalc[0].bruttoFull, 2);
                    dataSet.pay_in_words = "unsuported";
                    dataSet.paid = $filter('number')($scope.dataSet.payed, 2);
                    dataSet.left_to_pay = $filter('number')($scope.dataSet.toPay, 2);
//                    console.log(dataSet);
                    return dataSet;
                };
            }
        });