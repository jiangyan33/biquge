let app = angular.module('indexApp', []);

app.controller('baseController', function ($scope, $http) {

    $scope.category = function () {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/Category/category.ac'
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
});