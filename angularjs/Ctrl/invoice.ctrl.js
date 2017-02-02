angular.module('VatApp')
        .controller('InvoiceCtrl', function ($scope, InvoiceSvc, $location, $window) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            } else {
                var currentDealerID;
                var currentBuyerID;
                InvoiceSvc.getAllFirm()
                        .success(function (firm) {
                            if ($scope.firms) {
                                $scope.firms = $scope.firms.concat(firm);
                            } else {
                                $scope.firms = firm;
                            }
                        })
                        .error(function (err) {
                            console.log("Błąd: " + err);
                        });
                $scope.getCurrentDealer = function (id) {
                    if (id !== null && id !== undefined) {
                        if (currentDealerID !== id) {
                            InvoiceSvc.getOneFirm(id)
                                    .success(function (currentCompany) {
                                        if ($scope.firms.currentDealerID === id) {
                                            currentDealerID = id;
                                            $scope.firms.currentDealer = currentCompany;
                                        }
                                        ;
                                    })
                                    .error(function (err) {
                                        console.log("Błąd: " + err);
                                    });
                        }
                    }
                };
                $scope.getCurrentBuyer = function (id) {
                    if (id !== null && id !== undefined) {
                        if (currentBuyerID !== id) {
                            InvoiceSvc.getOneFirm(id)
                                    .success(function (currentCompany) {
                                        if ($scope.firms.currentBuyerID === id) {
                                            currentBuyerID = id;
                                            $scope.firms.currentBuyer = currentCompany;
                                        }
                                        ;
                                    })
                                    .error(function (err) {
                                        console.log("Błąd: " + err);
                                    });
                        }
                    }
                };
                $scope.invoiceFinishStep1 = function (dealerID, buyerID) {
                    $location.path('/invoice/2/' + dealerID + '/' + buyerID);
                };

            }

        });