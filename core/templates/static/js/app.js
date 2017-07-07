var app = angular.module("userStatuses", []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
});

app.controller("userStatusesController", function($scope) {
    $scope.loggedIn = false;
    $scope.username = null;
    $scope.user = {
        id: null,
        username: null,
        status: null,
        statusColor: null
    };

    $scope.login = function () {
        $http.get("/login/")
            .then(function (response) {
                $scope.myWelcome = response.data;
            });
    }
});