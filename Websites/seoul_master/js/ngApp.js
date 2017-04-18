var index = angular.module('index', []);
var shopping = angular.module('shopping', []);
var kpop = angular.module('kpop', []);
var wedding = angular.module('wedding', []);
var airtickets = angular.module('airtickets', []);

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