_myApp
    .factory('DetalheSerieFactory', ['$resource', function ($resource) {
        return $resource('/series/:id', null, {
            'detail': { method: 'GET', url: '/series/detail/:id' }
        });
    }])
    .controller('DetalheSerieCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'DetalheSerieFactory', '$route',
        function ($scope, $routeParams, $location, $localStorage, DetalheSerieFactory, $route) {
            $scope.serie = {
            };
            console.log($routeParams)
            $scope.isProcessing = true;

            angular.element(document).ready(function () {

                var Series = DetalheSerieFactory.detail( { id : $routeParams.id },
                    function () {
                        if (Series.error) {
                            alert('Unable to get series detail from the server :(');
                        } else {
                            $scope.serie = Series.result;
                        }
                    });
            });
        }]);