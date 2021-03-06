_myApp
.factory('UserFactory', ['$resource', function($resource){
    return $resource('/login/:id', null, {
        'auth': { method:'POST', url : '/login/auth' }
    });
}])
.controller('LoginCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'UserFactory', 'md5','$localStorage',
    function ($scope, $rootScope, $routeParams,  $location, UserFactory, md5, $localStorage) {
    $scope.data = {};

    $scope.login = function () {
        if(!$scope.data.email || $scope.data.email == ''){
            alert('O email deve ser informado!');
            return;
        }

        if(!$scope.data.password || $scope.data.password == ''){
            alert('A senha deve ser informada!');
            return;
        }

        $scope.isProcessing = true;
        var user = UserFactory.auth({ 
            email : $scope.data.email,
            pwd : md5.createHash($scope.data.password || '')
        }, function(){
            if(user.error){
                alert('Email ou senha inválidos!');
            }else{
                
                $localStorage.user = {
                    name : user.result.name,
                    email : user.result.email,                    
                    id: user.result._id
                };
                $location.url('/home');
                                
            }
            $scope.isProcessing = false;
        });
    }
}]);