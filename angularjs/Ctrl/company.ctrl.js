angular.module('VatApp')
        .controller('CompCtrl', function ($scope, CompSvc, $location, $window) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            } else {
                var currenteSeeFirmID;
                CompSvc.getAllCompany()
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

                $scope.addFirm = function () {
                    if ($scope.currentUser) {
                        if ($scope.dataSetFirm.company_name) {
                            $scope.dataSetFirm.company_adress = $scope.dataSetFirm.company_adr1 + " " + $scope.dataSetFirm.company_adr2;
                            CompSvc.createCompany({
                                body: $scope.dataSetFirm
                            }).success(function (firm) {
                                $scope.firms.unshift(firm);
                                $scope.dataSetFirm = null;
                                // location.reload();
                            }).error(function (err) {
                                console.log("Błąd: " + err);
                            });
                        }
                    }
                };
                $scope.getCurrentSeeFirm = function (id) {
                    if (id !== null && id !== undefined) {
                        if (currenteSeeFirmID !== id) {                            
                            CompSvc.getOneFirm(id)
                                    .success(function (currentCompany) {
                                        if ($scope.firms.currenteSeeFirmID === id) {
                                            currenteSeeFirmID = id;
                                            $scope.firms.currenteSeeFirm = currentCompany;
                                        }
                                        ;
                                    })
                                    .error(function (err) {
                                        console.log("Błąd: " + err);
                                    });
                        }
                    }
                };
            }
        });
