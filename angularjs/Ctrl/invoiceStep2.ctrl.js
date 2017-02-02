
angular.module('VatApp')
        .controller('InvoiceStep2Ctrl', function ($scope, $routeParams, InvoiceSvc, ItemsSvc, $location, $window) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            } else {
                if ($scope.firms === undefined) {
                    $scope.firms = [];
                }
                if ($scope.dataSet === undefined) {
                    $scope.dataSet = [];
                }
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
                        })
                        .error(function (err) {
                            console.log("Błąd: " + err);
                        });

                $scope.deleteItem = function (itemId) {
                    ItemsSvc.deleteItem(itemId)
                            .success(function (response) {
                                ItemsSvc.fetch()
                                        .success(function (items) {
                                            $scope.dataSet.AddedProd = items;
                                        })
                                        .error(function (err) {
                                            console.log("Błąd: " + err);
                                        });
                            })
                            .error(function (err) {
                                console.log("Błąd: " + err);
                            });
                };

                $scope.addItem = function () {
                    if (checkErrorInput) {
                        $scope.dataSet.prod.priceFullN = $scope.dataSet.prod.count * $scope.dataSet.prod.priceOneN;
                        var tax = getTax($scope.dataSet.prod.taxRate);
                        if (tax !== false) {
                            tax = $scope.dataSet.prod.priceOneN * tax;
                            $scope.dataSet.prod.taxFullRate = tax;
                            $scope.dataSet.prod.priceFullN = $scope.dataSet.prod.priceOneN * $scope.dataSet.prod.count;
                            $scope.dataSet.prod.endPrice = ($scope.dataSet.prod.priceOneN + tax) * $scope.dataSet.prod.count;
//                            console.log($scope.dataSet.prod);
                            ItemsSvc.create({
                                body: $scope.dataSet.prod
                            }).success(function (item) {
                                $scope.dataSet.AddedProd.unshift(item);
                                $scope.dataSet.prod = null;
                            });
                        } else {
                            $scope.dataSet.prod.errorMsg = "Podana stawka podatku VAT niepoprawna!";
                        }
                    }
                };
                var getTax = function (tax) {
                    if (tax !== undefined) {
                        if (tax === 0 || tax === "0") {
                            return 0;
                        } else {
                            return tax / 100;
                        }
                    } else {
                        return false;
                    }

                };
                var checkErrorInput = function () {
                    if ($scope.dataSet.prod && $scope.dataSet.prod.name && $scope.dataSet.prod.mj && $scope.dataSet.prod.count && $scope.dataSet.prod.priceOneN && $scope.dataSet.prod.taxRate) {
                        if (angular.isNumber($scope.dataSet.prod.count) && angular.isNumber($scope.dataSet.prod.priceOneN) && angular.isNumber($scope.dataSet.prod.taxRate)) {
                            if ($scope.dataSet.prod.errorMsg) {
                                $scope.dataSet.prod.errorMsg = false;
                            }
                            return true;
                        } else {
                            $scope.dataSet.prod.errorMsg = "Pola od 3 do 6 muszą być numeryczne!";
                            return false;
                        }
                    } else {
                        $scope.dataSet.prod.errorMsg = "Uzupełnij wszystkie dane!";
                        return false;
                    }
                };

            }
        });