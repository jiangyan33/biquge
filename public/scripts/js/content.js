app.controller('indexController', ["$scope", "$controller", "$location", "$http", function ($scope, $controller, $location, $http) {
    $controller('baseController', { $scope: $scope });

    $scope.content = function () {
        const params = $location.absUrl().split('?')[1];

        $http({
            url: `http://127.0.0.1:3000/api/Novel/content.ac?${params}`,
        }).then(function successCallback(response) {
            response.data[1].content = '&nbsp;&nbsp;&nbsp;&nbsp;' + response.data[1].content.replace(/\n/g, '<br /><br /> &nbsp;&nbsp;&nbsp;&nbsp;');
            $scope.novelInfo = response.data[0];
            $scope.contentInfo = response.data[1];
        });
    };
}]);