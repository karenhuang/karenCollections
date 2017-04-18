var index = angular.module('index', []);
var list = angular.module('list', []);
var write = angular.module('write', []);
var expert = angular.module('expert', []);
var activity = angular.module('activity', []);
var win = angular.module('win', []);
var list2 = angular.module('list2', []);
var article = angular.module('article', []);

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

function act2HeaderCtrl($scope) {
    $scope.headers =
        [ { name: 'header.html', url: 'partials/act2header.html'}];
    $scope.header = $scope.headers[0];
}

