let app = angular.module('indexApp', ['ngSanitize']);

app.controller('baseController', ["$scope", "$http", function ($scope, $http) {

    $scope.baseUrl = 'http://127.0.0.1:3000/api/';
    $scope.category = function () {
        $http({
            url: `${$scope.baseUrl}Category/category.ac`
        }).then(function successCallback(response) {
            $scope.categoryList = response.data;
        });
    };

    $scope.format = function (time, pattern) {
        const part = time.split('T')[0];
        if (!pattern) return part;

        let date = new Date(time);

        return `${part} ${date.getHours() + 8}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    $scope.formatUrl = function (url) {
        let params = url.split('?')[1].split('&');
        let result = {};

        for (let item of params) {
            let temp = item.split('=');
            result[temp[0]] = temp[1];
        }

        return result;
    };
}]);