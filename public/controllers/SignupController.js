_myApp
.factory('SignupFactory', ['$resource', function($resource){
    return $resource('/signup/:id', null, {
        'save' : {method : 'POST'}
    });
}])
.controller('SignupCtrl', ['$scope', '$routeParams', '$location', 'SignupFactory', 'md5', function ($scope, $routeParams,  $location, SignupFactory, md5) {
    $scope.user = {};

    $scope.save = function(){
        if(!$scope.user.name || $scope.user.name == ''){
            alert('O nome de ser informado!');
            return;
        }        

        if(!$scope.user.email || $scope.user.email == ''){
            alert('O email deve ser informado');
            return;
        }

        if(!$scope.user.pwd || $scope.user.pwd == ''){
            alert('A senha deve ser informada!');
            return;
        }

        $scope.isProcessing = true;
        var user = SignupFactory.save({
            name : $scope.user.name,            
            email : $scope.user.email,
            pwd: md5.createHash($scope.user.pwd || '')
        }, function(){
            if(user.error){
                alert('Desculpe, não foi possivel criar o cadastro!');
            }else{
                alert('Usuário criado com sucesso :)');
                $location.url('/login');
            }

            $scope.isProcessing = false;
        });
    }
}]);