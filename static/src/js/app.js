var app = angular.module("userStatuses", []).config(function($interpolateProvider, $httpProvider) {
    $interpolateProvider.startSymbol("{$").endSymbol("$}");
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
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
                $scope.currentUser = response.data;
                $scope.getUsers();

                var socket = new WebSocket("ws://" + window.location.host + "/users/");

                socket.onmessage = function(event) {
                    var message = JSON.parse(event.data);
                    console.log(message)
                    var userIndex = $scope.users.map(function(user) {return user.id}).indexOf(message.user.id);
                    if (userIndex === -1) {
                        $scope.users.push(message.user)
                    } else {
                        $scope.users[userIndex] = message.user;
                    }
                    $scope.$apply();
                };
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