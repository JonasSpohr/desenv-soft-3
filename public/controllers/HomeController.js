_myApp
    .factory('HomeFactory', ['$resource', function ($resource) {
        return $resource('/series/:id', null, {
            'all': { method: 'GET', url: '/series/all' },
            'filter': { method: 'GET', url: '/series/filter/:titulo' }
        });
    }])
    .controller('HomeCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'HomeFactory', '$route',
        function ($scope, $routeParams, $location, $localStorage, HomeFactory, $route) {
            $scope.series = [];
            $scope.filter = {};
            $scope.isProcessing = true;

            angular.element(document).ready(function () {

                $scope.isProcessing = true;
                var Series = HomeFactory.all({},
                    function () {
                        if (Series.error) {
                            alert('Unable to get series from the server :(');
                        } else {
                            $scope.series = Series.result;
                        }
                        $scope.isProcessing = false;
                    });
            });

            $scope.filter = function () {
                if (!$scope.filter.titulo || $scope.filter.titulo == '') {
                    alert('Por favor informe o titulo da série!');
                    return;
                }

                $scope.isProcessing = true;
                var Series = HomeFactory.filter({
                    titulo : $scope.filter.titulo
                    },
                    function () {
                        if (Series.error) {
                            alert('Unable to get series from the server :(');
                        } else {
                            $scope.series = Series.result;
                        }

                        $scope.isProcessing = false;
                    });
            }

            $scope.clearFilter = function () {
                
                $scope.isProcessing = true;
                $scope.filter.titulo = '';
                
                var Series = HomeFactory.all({},
                    function () {
                        if (Series.error) {
                            alert('Unable to get series from the server :(');
                        } else {
                            $scope.series = Series.result;
                        }
                        $scope.isProcessing = false;
                    });
            }
        }]);