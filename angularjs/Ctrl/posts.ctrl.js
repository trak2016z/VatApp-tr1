/* 
 */

angular.module('VatApp')
        .controller('PostsCtrl', function ($scope, PostsSvc) {
            PostsSvc.fetch()
                    .success(function (posts) {
                        $scope.posts = posts;
                    })
                    .error(function (err) {

                    });

            $scope.addPost = function () {
                if ($scope.currentUser) {
                    if ($scope.postTresc) {

                        PostsSvc.create({
                            tresc: $scope.postTresc
                        }).success(function (post) {
                            $scope.posts.unshift(post);
                            $scope.postTresc = null;
                        });
                    }
                }
            };
        });
