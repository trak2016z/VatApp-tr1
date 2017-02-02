angular.module('VatApp')
        .service('ItemsSvc', function ($http) {
            this.fetch = function () {
                return $http.get('/api/items/all/');
            };
            this.create = function (item) {
                return $http.post('/api/items', item);
            };
            this.deleteItem = function (itemId) {
                return $http.post('/api/items/delete/', {
                    itemId: itemId
                });
            };
        });