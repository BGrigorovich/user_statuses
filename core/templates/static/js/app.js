var app = angular.module("userStatuses", []).config(function($interpolateProvider, $httpProvider) {
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

app.controller("userStatusesController", function($scope, $http) {
    $scope.username = null;
    $scope.currentUser = {
        id: null,
        username: null,
        status: {
            id: null,
            status: null,
            color: null
        }
    };
    $scope.statuses = [];
    $scope.users = [];
    $scope.usernameFilter = '';
    $scope.statusFilter = null;

    $scope.login = function () {
        $http.post("/login/", {username: $scope.username})
            .then(function (response) {
                $scope.currentUser = {
                    id: response.data.id,
                    username: response.data.username,
                    status: {
                        id: response.data.status_id,
                        status: response.data.status,
                        color: response.data.statusColor
                    }
                };
                $scope.getUsers();
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

    $scope.updateUserStatus = function () {
        $http.post("/change-status/", {userId: $scope.currentUser.id, statusId: $scope.currentUser.status.id})
    };

    $scope.getUsers = function () {
        $http.get("/users/")
            .then(function (response) {
                $scope.users = JSON.parse(response.data).map(function(user) {
                    return {
                        id: user.pk,
                        username: user.fields.username,
                        status: $scope.statuses.filter(function(status) {
                            return status.id == user.fields.status
                        })[0]
                    }
                })
            });

    }
});