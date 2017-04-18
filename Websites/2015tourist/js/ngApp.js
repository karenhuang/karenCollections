var index = angular.module('index', []);
var report = angular.module('report', []);
var recommend = angular.module('recommend', []);
var activity = angular.module('activity', []);
var traveltips = angular.module('traveltips', []);
var expert = angular.module('expert', []);

function headerCtrl($scope) {
    $scope.headers =
        [ { name: 'header.html', url: 'partials/header.html'}];
    $scope.header = $scope.headers[0];
}
function indexheaderCtrl($scope) {
    $scope.headers =
        [ { name: 'header.html', url: 'partials/indexHeader.html'}];
    $scope.header = $scope.headers[0];
}

function footerCtrl($scope) {
    $scope.footers =
        [ { name: 'footer.html', url: 'partials/footer.html'}];
    $scope.footer = $scope.footers[0];
}
