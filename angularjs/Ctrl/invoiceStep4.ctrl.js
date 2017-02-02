angular.module('VatApp')
        .controller('InvoiceStep4Ctrl', function ($scope, $routeParams, $filter, InvoiceSvc, ItemsSvc, $location, $window) {
            if (!$window.localStorage.getItem('Token_jwt')) {
                $location.path('/login');
            } else {
                if ($scope.firms === undefined) {
                    $scope.firms = [];
                }
                if ($scope.dataSet === undefined) {
                    $scope.dataSet = [];
                }
//                console.log($routeParams.iId);
                InvoiceSvc.getInvoice($routeParams.iId)
                        .success(function (response) {
                            $scope.dataSet.invoice = response;
//                            console.log($scope.dataSet.invoice);

                            $scope.dataSet.AddedProd = response.invoice_items;
                            getFullCalc($scope.dataSet.AddedProd);

                            InvoiceSvc.initStep2(response.company_sell, response.company_buy)
                                    .success(function (response) {
                                        $scope.firms.currentDealer = response.dealer;
                                        $scope.firms.currentBuyer = response.buyer;
                                        $scope.dataSet.invoice.comments = "";
                                        $scope.dataSet.invoice.papperType = "ORYGINAŁ";
                                        initScopeDD();
                                    })
                                    .error(function (err) {
                                        console.log("Błąd: " + err);
                                    });

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
//                    console.log($scope.dataSet.EndCalc);
                };

                $scope.generatePDF = function () {
                    $scope.dd.content[0].columns[1].text[4].text = "ORYGINAŁ";
                    pdfMake.createPdf($scope.dd).open();
                };
                $scope.generatePDFCopy = function () {
                    $scope.dd.content[0].columns[1].text[4].text = "KOPIA";
                    pdfMake.createPdf($scope.dd).open();
                };

                var fillScopeDD = function () {
                    angular.forEach($scope.dataSet.AddedProd, function (value, key) {
//                       console.log("key:"+key+" value:"+value.name); 
                        $scope.dd.content[6].table.body.push([key + 1, value.name, value.mj, value.count, value.priceOneN,
                            $filter('number')(value.priceFullN, 2),
                            value.taxRate,
                            $filter('number')(value.taxFullRate, 2),
                            $filter('number')(value.endPrice, 2)
                        ]);
                    });
                    angular.forEach($scope.dataSet.EndCalc, function (value, key) {                       
                        $scope.dd.content[7].columns[1].table.body.push(["Stawka " + value.taxRate + "%",
                            $filter('number')(value.netto, 2),
                            $filter('number')(value.vat, 2),
                            $filter('number')(value.brutto, 2)
                        ]);
                    });
                    $scope.dd.content[7].columns[1].table.body.push(['Razem',
                        $filter('number')($scope.dataSet.EndCalc[0].nettoFull, 2),
                        $filter('number')($scope.dataSet.EndCalc[0].vatFull, 2),
                        $filter('number')($scope.dataSet.EndCalc[0].bruttoFull, 2)
                    ]);
                };
                var initScopeDD = function () {
                    $scope.dd = {
                        footer: {
                            columns: [
                                {text: 'VatApp version: 1.5.0', style: 'add_v'},
                                {text: 'Thulusoftware.com', style: 'add_v'},
                                //{text: 'Strona: ' + nr_strOd + ' z ' + nr_strDo, style: 'foot'}
                                {text: 'Strona: ' + 1 + ' z ' + 1, style: 'foot'}
                            ]
                        },
                        content: [
                            {
                                columns: [
                                    {
                                        text: [
                                            '\n \n',
                                            {text: 'Data wystawienia: ' + moment($scope.dataSet.invoice.issue_date).format("DD/MM/YYYY"), style: 'data'},
                                            '\n \n',
                                            {text: 'Data sprzedaży: ' + moment($scope.dataSet.invoice.sell_date).format("DD/MM/YYYY"), style: 'data'}
                                        ]
                                    },
                                    {
                                        text: [
                                            {text: 'FAKTURA VAT', style: 'head_fakt'},
                                            '\n \n',
                                            {text: 'NR: ' + $scope.dataSet.invoice.invoice_number, style: 'nr_f'},
                                            '\n \n',
                                            {text: $scope.dataSet.invoice.papperType, style: 'nr_f', bold: true}
                                        ]
                                    },
                                    {
//                                        image: 'sampleImage.jpg',
//                                        width: 150,
//                                        height: 100,
//                                        alignment: 'right'
                                    }
                                ]
                            },
                            {
                                text: "_______________________________________________________________________________________\n", style: 'nr_f'
                            },
                            {
                                columns: [
                                    {
                                        text: [
                                            '\n',
                                            {text: "SPRZEDAWCA:\n\n", style: 'head_nazw'},
                                            {text: $scope.firms.currentDealer.company_name},
                                            {text: "\n\nNIP: ", style: 'dane_f_h'},
                                            {text: $scope.firms.currentDealer.company_nip, style: 'dane_f'},
                                            {text: "\nTelefon: ", style: 'dane_f_h'},
                                            {text: $scope.firms.currentDealer.company_tel_num, style: 'dane_f'},
                                            {text: "\nAdres: ", style: 'dane_f_h'},
                                            {text: $scope.firms.currentDealer.company_adress, style: 'dane_f'}
                                        ]
                                    },
                                    {
                                        text: [
                                            '\n',
                                            {text: "NABYWCA:\n\n", style: 'head_nazw'},
                                            {text: $scope.firms.currentBuyer.company_name},
                                            {text: "\n\nNIP: ", style: 'dane_f_h'},
                                            {text: $scope.firms.currentBuyer.company_nip, style: 'dane_f'},
                                            {text: "\nTelefon: ", style: 'dane_f_h'},
                                            {text: $scope.firms.currentBuyer.company_tel_num, style: 'dane_f'},
                                            {text: "\nAdres: ", style: 'dane_f_h'},
                                            {text: $scope.firms.currentBuyer.company_adress, style: 'dane_f'}
                                        ]
                                    }
                                ]
                            },
                            {
                                text: "_______________________________________________________________________________________\n\n", style: 'nr_f'
                            },
                            {
                                columns: [
                                    {
                                        text: [
                                            {text: 'Forma płatności: ', style: 'term_h'},
                                            {text: $scope.dataSet.invoice.pay_by, style: 'term'}
                                        ]
                                    },
                                    {
                                        text: [
                                            {text: 'Ilość dni do zapłaty: ', style: 'term_h'},
                                            {text: $scope.dataSet.invoice.days_to_pay, style: 'term'}
                                        ]
                                    },
                                    {
                                        text: [
                                            {text: 'Termin płatności: ', style: 'term_h'},
                                            {text: moment($scope.dataSet.invoice.pay_date).format("DD/MM/YYYY"), style: 'term'}
                                        ]
                                    }
                                ]
                            },
                            {text: ['\n']},
                            {
                                style: 'tableExample',
                                table: {
                                    headerRows: 1,
                                    // keepWithHeaderRows: 1,
                                    // dontBreakRows: true,
                                    body: [
                                        [
                                            {text: 'Lp.', style: 'tableHeader'},
                                            {text: 'Nazwa towaru lub usługi', style: 'tableHeader'},
                                            {text: 'J.M.', style: 'tableHeader'},
                                            {text: 'Ilość / Zakres', style: 'tableHeader'},
                                            {text: 'Cena jednostkowa netto', style: 'tableHeader'},
                                            {text: 'Cena całkowita netto', style: 'tableHeader'},
                                            {text: 'Stawka podatku VAT', style: 'tableHeader'},
                                            {text: 'Kwota podatku VAT', style: 'tableHeader'},
                                            {text: 'Cena całkowita brutto', style: 'tableHeader'}
                                        ]

                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                    },
                                    vLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                    },
                                    hLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                    },
                                    vLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                    }
                                    // paddingLeft: function(i, node) { return 4; },
                                    // paddingRight: function(i, node) { return 4; },
                                    // paddingTop: function(i, node) { return 2; },
                                    // paddingBottom: function(i, node) { return 2; }
                                }
                            },
                            {
                                columns: [
                                    {
                                        text: [
                                            {text: 'Razem do zapłaty: ', style: 'term_h'},
                                            {text: $scope.dataSet.invoice.all_to_pay + ' PLN', style: 'term'},
//                                            {text: '\n\nSłownie: ', style: 'term_h'},
//                                            {text: 'tysiąc siedemset dwadzieścia dwa ' + '10' + '/' + '100' + ' PLN', style: 'term'},
                                            {text: '\n\nZapłacono: ', style: 'term_h'},
                                            {text: $scope.dataSet.invoice.paid + ' PLN', style: 'term'},
                                            {text: '\n\nPozostało do zapłaty: ', style: 'term_h'},
                                            {text: $scope.dataSet.invoice.left_to_pay + ' PLN', style: 'term'}
                                        ]
                                    },
                                    {
                                        style: 'tableResult',
                                        table: {
                                            body: [
                                                [
                                                    {text: 'PLN', style: 'tableHeader'},
                                                    {text: 'Wartość netto', style: 'tableHeader'},
                                                    {text: 'Wartość VAT', style: 'tableHeader'},
                                                    {text: 'Wartość brutto', style: 'tableHeader'}
                                                ]//,
//                                                [
//                                                    'stawka 23%',
//                                                    '4543',
//                                                    '23',
//                                                    '32443'
//                                                ],
//                                                [
//                                                    'stawka 8%',
//                                                    '45.33',
//                                                    '10.47',
//                                                    '56'
//                                                ],
//                                                [
//                                                    'Razem',
//                                                    '342423',
//                                                    '32534',
//                                                    '54654656'
//                                                ]
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                text: "_______________________________________________________________________________________\n\n", style: 'nr_f'
                            },
                            {
                                text: "Uwagi: \n" + $scope.dataSet.invoice.comments, style: 'term_h'
                            },
                            {
                                text: "\n\n" //wypełniacz??
                            },
                            {
                                columns: [
                                    {
                                        text: [
                                            {text: "\n\n............................................\n\n", style: 'nr_f'},
                                            {text: 'Podpis osoby upoważnionej do odbioru faktury', style: 'podpis_o'}
                                        ]
                                    },
                                    {},
                                    {
                                        text: [
                                            {text: "\n\n............................................\n\n", style: 'nr_f'},
                                            {text: 'Podpis osoby upoważnionej do wystawienia faktury', style: 'podpis_o'}
                                        ]
                                    }
                                ]
                            }
                        ],
                        styles: {
                            nr_f: {
                                fontSize: 10,
                                alignment: 'center'
                            },
                            head_fakt: {
                                fontSize: 20,
                                alignment: 'center',
                                bold: true
                            },
                            head_nazw: {
                                fontSize: 7,
                                bold: true
                            },
                            data: {
                                fontSize: 10
                            },
                            term_h: {
                                fontSize: 7
                            },
                            term: {
                                fontSize: 8,
                                bold: true
                            },
                            dane_f: {
                                fontSize: 10
                            },
                            dane_f_h: {
                                fontSize: 10,
                                bold: true
                            },
                            header: {
                                fontSize: 18,
                                bold: true
                            },
                            tableHeader: {
                                bold: true,
                                alignment: 'center',
                                fontSize: 7,
                                color: 'black'
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15],
                                fontSize: 7,
                                alignment: 'center'
                            },
                            tableResult: {
                                margin: [0, 5, 0, 15],
                                fontSize: 7,
                                alignment: 'center'
                            },
                            foot: {
                                alignment: 'right',
                                margin: [0, 0, 30, 0],
                                fontSize: 10
                            },
                            bigger: {
                                fontSize: 15,
                                italics: true
                            },
                            add_v: {
                                fontSize: 8,
                                alignment: 'center'
                            },
                            podpis_o: {
                                fontSize: 5,
                                alignment: 'center'
                            }
                        },
                        defaultStyle: {
                            columnGap: 20
                        }
                    };
                    fillScopeDD();
//                    console.log($scope.dd);
                };
            }
        });