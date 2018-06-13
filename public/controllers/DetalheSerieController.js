_myApp
    .factory('DetalheSerieFactory', ['$resource', function ($resource) {
        return $resource('/series/:id', null, {
            'detail': { method: 'GET', url: '/series/detail/:id' },
            'comments': { method: 'GET', url: '/series/allcomments/:id' },
            'media': { method: 'GET', url: '/series/media/:id' },
            'comment': { method: 'POST', url: '/series/writecomment/' }
        });
    }])
    .controller('DetalheSerieCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'DetalheSerieFactory', '$route',
        function ($scope, $routeParams, $location, $localStorage, DetalheSerieFactory, $route) {
            $scope.serie = {};
            $scope.comentario = {};
            $scope.comentarios = [];
            $scope.writingComment = false;
            $scope.isProcessing = true;
            $scope.hasComments = false;
            $scope.hasCommented = false;

            $scope.loadMedia = () => {
                var Media = DetalheSerieFactory.media({ id: $routeParams.id },
                    function () {
                        if (Media.error) {
                            alert('Unable to get comments of the serie from the server :(');
                        } else {
                            $scope.serie.media = Media.result.toFixed(1);
                        }
                    });
            }

            $scope.loadComments = () => {
                var Comentarios = DetalheSerieFactory.comments({ id: $routeParams.id },
                    function () {
                        if (Comentarios.error) {
                            alert('Unable to get comments of the serie from the server :(');
                        } else {
                            $scope.comentarios = Comentarios.result;
                            $scope.hasComments = Comentarios.result.length > 0;
                            $scope.hasCommented = Comentarios.result.filter((x) => x.usuario._id == $localStorage.user.id).length > 0;
                            $scope.loadMedia();                            
                        }
                    });
            }

            angular.element(document).ready(function () {
                var Series = DetalheSerieFactory.detail({ id: $routeParams.id },
                    function () {
                        if (Series.error) {
                            alert('Unable to get series detail from the server :(');
                        } else {
                            $scope.serie = Series.result;

                            $scope.loadComments();
                        }
                    });                
            });

            $scope.showComment = () => {
                $scope.writingComment = true;
            }            

            $scope.saveComment = () => {
                if (!$scope.comentario.descricao || $scope.comentario.descricao == '') {
                    alert('Favor informar o comentário.');
                    return;
                }
                if (!$scope.comentario.nota || $scope.comentario.nota == '') {
                    alert('Favor informar a nota.');
                    return;
                }

                var comentario = DetalheSerieFactory.comment({
                    serie: $routeParams.id,
                    usuario: $localStorage.user.id,
                    descricao: $scope.comentario.descricao,
                    nota: $scope.comentario.nota,
                    dataAvaliacao: new Date()
                },
                    function () {
                        if (comentario.error) {
                            alert('Unable save your comment :(');
                        } else {
                            alert('Comentário enviado com sucesso :)');
                            $scope.hasCommented = true;
                            $scope.writingComment = false;
                            $scope.loadComments();
                        }
                    });
            }

            $scope.cancelComment = () => {
                $scope.writingComment = false;
            }
        }]);