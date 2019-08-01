let app = angular.module('indexApp', []);

app.controller('indexController', function ($scope, $http) {

    $scope.category = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/Category/category.ac'
        }).then(function successCallback(response) {
            $scope.categoryList = response.data;
        });
    };

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

            console.log(response.data);

            $scope.newAddList = response.data.map(item => {
                item.category_name = item.category_name.substr(0, 2);

                item.create_time = item.create_time.split('T')[0];

                return item;
            });

            console.log($scope.newAddList);
        });
    };

});