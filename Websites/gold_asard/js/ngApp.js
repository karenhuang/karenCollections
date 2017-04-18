var index = angular.module('index', []);
var anhui5a = angular.module('anhui5a', []);
var winner = angular.module('winner', []);
var rule = angular.module('rule', []);


function headerCtrl($scope) {
    $scope.headers =
        [ { name: 'header.html', url: 'partials/header.html'}];
    $scope.header = $scope.headers[0];
}

function footerCtrl($scope) {
    $scope.footers =
        [ { name: 'footer.html', url: 'partials/footer.html'}];
    $scope.footer = $scope.footers[0];
}