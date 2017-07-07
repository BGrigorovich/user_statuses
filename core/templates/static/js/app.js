var app = angular.module("userStatuses", []).config(function($interpolateProvider, $httpProvider){
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

app.controller("userStatusesController", function($scope, $http) {
    $scope.username = null;
    $scope.currentUser = {
        id: null,
        username: null,
        statusId: null,
        status: null,
        statusColor: null
    };
    $scope.statuses = [];

    $scope.login = function () {
        console.log($scope.username);
        $http.post("/login/", {username: $scope.username})
            .then(function (response) {
                $scope.currentUser = {
                    id: response.id,
                    username: response.username,
                    statusId: response.status_id,
                    status: response.status,
                    statusColor: response.statusColor
                }
            });
    };

    $scope.getStatuses = function () {
        $http.get("/statuses/")
            .then(function (response) {
                $scope.statuses = JSON.parse(response.data).map(function(status) {
                    return {
                        id: status.pk,
                        status: status.fields.status,
                        color: status.fields.color
                    }
                })
            });
    };

    $scope.getStatuses();
});