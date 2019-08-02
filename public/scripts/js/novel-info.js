app.controller('indexController', function ($scope, $controller, $location, $http) {
    $controller('baseController', { $scope: $scope });

    $scope.findHot = function () {
        let id = $location.search()['id'];

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/Novel/info.ac'
        }).then(function successCallback(response) {
            $scope.novelInfo = response.data;

            $scope.novelInfo.update_time = $scope.format($scope.novelInfo.update_time, 1);
        });
    };
});