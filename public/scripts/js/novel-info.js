app.controller('indexController', ["$scope", "$controller", "$location", "$http", function ($scope, $controller, $location, $http) {
    $controller('baseController', { $scope: $scope });

    $scope.info = function () {
        const params = $location.absUrl().split('?')[1];

        $http({
            url: `http://127.0.0.1:3000/api/Novel/info.ac?${params}`
        }).then(function successCallback(response) {
            $scope.novelInfo = response.data;

            $scope.novelInfo.update_time = $scope.format($scope.novelInfo.update_time, 1);
        });
    };
}]);