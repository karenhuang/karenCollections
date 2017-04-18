var index = angular.module('index', []);
var newslist = angular.module('newslist', []);
var news = angular.module('news', []);
var chef = angular.module('chef', []);
var breezemarket = angular.module('breezemarket', []);
var restaurant = angular.module('restaurant', []);
var fodder = angular.module('fodder', []);


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