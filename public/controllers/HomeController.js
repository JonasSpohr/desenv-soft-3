_myApp
    .factory('HomeFactory', ['$resource', function ($resource) {
        return $resource('/series/:id', null, {
            'all': { method: 'GET', url: '/series/all' }
        });
    }])
    .controller('HomeCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'HomeFactory', '$route',
        function ($scope, $routeParams, $location, $localStorage, HomeFactory, $route) {
            $scope.series = [];
            $scope.isProcessing = true;

            angular.element(document).ready(function () {

                var Series = HomeFactory.all({},
                    function () {
                        if (Series.error) {
                            alert('Unable to get series from the server :(');
                        } else {
                            $scope.series = Series.result;
                        }
                    });
            });

            $scope.vote = function () {
                if (!$scope.model.placeSelected || $scope.model.placeSelected == '') {
                    alert('Please select a place to vote!');
                    return;
                }

                if (confirm('Do yuo confirm your vote?')) {
                    $scope.isProcessing = true;
                    var Vote = VoteFactory.vote({
                        placeId: $scope.model.placeSelected,
                        userId: $localStorage.user.id
                    },
                        function () {
                            if (Vote.error) {
                                alert('Unable to vote :(.');
                            } else {
                                alert('Your vote has been saved.');
                                $scope.canVote = false;
                                $scope.isProcessing = false;
                            }
                        });
                }
            }
        }]);