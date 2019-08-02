app.controller('indexController', ["$scope", "$controller", "$http", function ($scope, $controller, $http) {
    $controller('baseController', { $scope: $scope });

    $scope.findHot = function () {
        $http({
            url: `${$scope.baseUrl}Novel/findHot.ac`
        }).then(function successCallback(response) {
            $scope.hotList = response.data;
        });
    };

    $scope.categoryHot = function () {
        $http({
            url: `${$scope.baseUrl}Novel/categoryHot.ac`
        }).then(function successCallback(response) {
            $scope.categoryHotList1 = response.data[0];

            $scope.categoryHotList2 = response.data[1];
        });
    };

    $scope.findNewAdd = function () {
        $http({
            url: `${$scope.baseUrl}Novel/newAddList.ac`
        }).then(function successCallback(response) {
            $scope.newAddList = response.data;

            $scope.newAddList = response.data.map(item => {
                item.category_name = item.category_name.substr(0, 2);
                item.create_time = $scope.format(item.create_time);
                return item;
            });
        });
    };

}]);