app.controller('indexController', function ($scope, $controller, $http) {
    $controller('baseController', { $scope: $scope });

    $scope.findHot = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/Novel/findHot.ac'
        }).then(function successCallback(response) {
            $scope.hotList = response.data;
        });
    };

    $scope.categoryHot = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/Novel/categoryHot.ac'
        }).then(function successCallback(response) {
            $scope.categoryHotList1 = response.data[0];

            $scope.categoryHotList2 = response.data[1];
        });
    };

    $scope.findNewAdd = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/Novel/newAddList.ac'
        }).then(function successCallback(response) {
            $scope.newAddList = response.data;

            $scope.newAddList = response.data.map(item => {
                item.category_name = item.category_name.substr(0, 2);
                item.create_time = $scope.format(item.create_time);
                return item;
            });
        });
    };

});